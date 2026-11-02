const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2024-12' -> 'Dec 2024'; null -> 'Present' */
export function fmtMonth(ym) {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Duration between two 'YYYY-MM' values (end null = now) -> '1 yr 11 mos' */
export function duration(start, end) {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  let months = (ey - sy) * 12 + (em - sm) + 1;
  const years = Math.floor(months / 12);
  months %= 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}

export function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
