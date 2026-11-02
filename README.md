# ninganzaremy.com

Personal site of Remy Ninganza — Software Engineer building agentic AI systems and high-reliability distributed services.

**Stack:** React 18 · Vite 6 · React Router · Framer Motion · plain CSS with design tokens. No UI framework, no template.

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # static output in build/
yarn preview    # serve the production build
```

Deploys to Netlify from GitHub Actions on every push to `main` (`.github/workflows/netlify-deploy.yml`). The contact form uses EmailJS; copy `.env.example` to `.env` and fill the `VITE_EMAILJS_*` keys, or the form degrades to a `mailto:` link.

Content lives in `src/data/` (profile, experience, projects, stack, posts). Sections are in `src/components/`, pages in `src/pages/`.
