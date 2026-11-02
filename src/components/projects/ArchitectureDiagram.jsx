import { useId, useMemo, useState } from 'react';
import './ArchitectureDiagram.css';

/**
 * ArchitectureDiagram — pure inline SVG flow graph.
 * props: { nodes: [{ id, label, sub, col }], edges: [[from, to]], core?: id }
 * Nodes are laid out in columns (node.col) with rows evenly distributed and
 * vertically centred. Hover / focus a node to trace its edges.
 * Below 880px a compact stacked variant (one stage per column) is shown instead,
 * because the five-column graph would render its labels under 9px there.
 */

const VB_W = 940;
const VB_H = 380;
const NODE_W = 160;
const NODE_H = 56;
const PAD_X = 8;
const ROW_GAP = 112;
const MAX_SUB_CHARS = 22;

/** Split a long sub-label into at most two lines that fit inside the node. */
function wrapSub(sub) {
  if (!sub) return [];
  if (sub.length <= MAX_SUB_CHARS) return [sub];
  const joiner = sub.includes(' · ') ? ' · ' : ' ';
  const parts = sub.split(joiner);
  const lines = [];
  let cur = '';
  for (const part of parts) {
    const next = cur ? `${cur}${joiner}${part}` : part;
    if (cur && next.length > MAX_SUB_CHARS) {
      lines.push(cur);
      cur = part;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
}

function groupByColumn(nodes) {
  const map = new Map();
  for (const n of nodes) {
    if (!map.has(n.col)) map.set(n.col, []);
    map.get(n.col).push(n);
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0]);
}

function layout(nodes) {
  const cols = groupByColumn(nodes);
  const colCount = cols.length ? cols[cols.length - 1][0] + 1 : 1;
  const step = colCount > 1 ? (VB_W - PAD_X * 2 - NODE_W) / (colCount - 1) : 0;
  const pos = {};
  for (const [col, list] of cols) {
    const n = list.length;
    list.forEach((node, i) => {
      const cy = VB_H / 2 + (i - (n - 1) / 2) * ROW_GAP;
      const x = PAD_X + col * step;
      pos[node.id] = { x, y: cy - NODE_H / 2, cx: x + NODE_W / 2, cy, col };
    });
  }
  return pos;
}

/** Smooth cubic from the right-middle of `a` to the left-middle of `b`. */
function edgePath(a, b) {
  const sx = a.x + NODE_W;
  const sy = a.cy;
  const tx = b.x - 1.5;
  const ty = b.cy;
  const dx = tx - sx;
  if (b.col - a.col > 1) {
    // Long edge: reach the target row early, then run flat so it slips behind
    // the intermediate column instead of slicing through it.
    return `M${sx} ${sy} C${sx + dx * 0.18} ${ty}, ${tx - dx * 0.45} ${ty}, ${tx} ${ty}`;
  }
  const mx = sx + dx / 2;
  return `M${sx} ${sy} C${mx} ${sy}, ${mx} ${ty}, ${tx} ${ty}`;
}

export default function ArchitectureDiagram({ nodes = [], edges = [], core = 'agent' }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [active, setActive] = useState(null);

  const pos = useMemo(() => layout(nodes), [nodes]);
  const columns = useMemo(() => groupByColumn(nodes), [nodes]);
  const neighbours = useMemo(() => {
    const map = {};
    for (const [a, b] of edges) {
      (map[a] ||= new Set()).add(b);
      (map[b] ||= new Set()).add(a);
    }
    return map;
  }, [edges]);

  const nodeState = (id) => {
    if (!active) return '';
    if (id === active) return 'is-active';
    if (neighbours[active]?.has(id)) return 'is-linked';
    return 'is-dim';
  };
  const edgeState = ([a, b]) => {
    if (!active) return '';
    return a === active || b === active ? 'is-active' : 'is-dim';
  };

  const arrowId = `${uid}-arrow`;
  const arrowActiveId = `${uid}-arrow-active`;
  const glowId = `${uid}-glow`;
  const describe = `Architecture diagram: ${nodes.length} services across ${columns.length} stages, ${edges.length} connections. Hover or focus a node to trace its edges.`;

  return (
    <figure className="arch" onMouseLeave={() => setActive(null)}>
      <svg
        className={`arch__svg ${active ? 'arch__svg--tracing' : ''}`.trim()}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        width="100%"
        role="group"
        aria-label={describe}
      >
        <defs>
          <marker id={arrowId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
            <path className="arch__arrow" d="M0 0 L8 4 L0 8 Z" />
          </marker>
          <marker id={arrowActiveId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
            <path className="arch__arrow arch__arrow--active" d="M0 0 L8 4 L0 8 Z" />
          </marker>
          <filter id={glowId} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feFlood className="arch__glow-color" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="arch__edges" aria-hidden="true">
          {edges.map((edge) => {
            const [a, b] = edge;
            if (!pos[a] || !pos[b]) return null;
            const d = edgePath(pos[a], pos[b]);
            const state = edgeState(edge);
            return (
              <g key={`${a}-${b}`} className={`arch__edge ${state}`.trim()}>
                <path
                  className="arch__edge-base"
                  d={d}
                  markerEnd={`url(#${state === 'is-active' ? arrowActiveId : arrowId})`}
                />
                <path className="arch__edge-flow" d={d} />
              </g>
            );
          })}
        </g>

        <g className="arch__nodes">
          {nodes.map((node) => {
            const p = pos[node.id];
            if (!p) return null;
            const subLines = wrapSub(node.sub);
            const two = subLines.length > 1;
            const labelY = p.cy + (two ? -9 : -4);
            const subY = p.cy + (two ? 7 : 13);
            const isCore = node.id === core;
            const title = node.sub ? `${node.label} — ${node.sub}` : node.label;
            return (
              <g
                key={node.id}
                className={`arch__node ${isCore ? 'arch__node--core' : ''} ${nodeState(node.id)}`.trim()}
                transform={`translate(${p.x} ${p.y})`}
                tabIndex={0}
                role="img"
                aria-label={title}
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
              >
                <title>{title}</title>
                <rect
                  className="arch__node-rect"
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  ry="10"
                  filter={isCore ? `url(#${glowId})` : undefined}
                />
                {isCore && <rect className="arch__node-ring" x="-3" y="-3" width={NODE_W + 6} height={NODE_H + 6} rx="13" ry="13" />}
                <text className="arch__label" x={NODE_W / 2} y={labelY - p.y} textAnchor="middle">
                  {node.label}
                </text>
                {subLines.map((line, i) => (
                  <text key={line} className="arch__sub" x={NODE_W / 2} y={subY - p.y + i * 12} textAnchor="middle">
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Compact stacked variant for narrow viewports (toggled in CSS). */}
      <ol className="arch__stack" aria-label={describe}>
        {columns.map(([col, list], i) => (
          <li key={col} className="arch-stage">
            <span className="arch-stage__idx mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div className="arch-stage__nodes">
              {list.map((node) => (
                <div key={node.id} className={`arch-stage__node ${node.id === core ? 'arch-stage__node--core' : ''}`.trim()}>
                  <span className="arch-stage__label">{node.label}</span>
                  {node.sub && <span className="arch-stage__sub mono">{node.sub}</span>}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="arch__caption mono">
        <span className="arch__caption-key" aria-hidden="true" />
        request path
        <span className="arch__caption-sep" aria-hidden="true">·</span>
        <span className="arch__caption-hint">hover or focus a node to trace its edges</span>
      </figcaption>
    </figure>
  );
}
