# rustins.github.io

Personal academic homepage for **Rustin Soraki** — PhD student, Paul G. Allen School of
Computer Science & Engineering, University of Washington.

A single hand-crafted static page (HTML + CSS + a little vanilla JS). No build step.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and content |
| `styles.css` | "Parchment & Avocado" design system |
| `main.js` | Mobile nav, scroll-spy, on-scroll reveals |
| `assets/favicon.svg` | Monogram favicon |
| `assets/rustin-soraki.jpg` | **You add this** — portrait photo |
| `assets/Rustin_Soraki_CV.pdf` | **You add this** — CV download |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Add your photo and CV

Drop two files into `assets/` with these exact names:

- **`assets/rustin-soraki.jpg`** — a portrait (roughly 3:4 / portrait orientation looks best,
  e.g. 600×720+). Until it's added, the page shows a tasteful "RS" monogram tile instead of a
  broken image. `.png` works too — just rename the reference in `index.html`.
- **`assets/Rustin_Soraki_CV.pdf`** — your CV. The "Curriculum Vitae" buttons link here.

## Preview locally

```bash
cd RustinS.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

This is a **user site**, so the repo must be named exactly `RustinS.github.io`.

1. Create the repo `RustinS.github.io` on GitHub (under the `RustinS` account).
2. Push this folder's contents to `main` (remote uses **SSH**).
3. GitHub → repo **Settings → Pages** → Source: **Deploy from a branch**, Branch: `main` / `root`.
4. The site goes live at **https://rustins.github.io**.

## Custom domain (later)

1. Add a file named `CNAME` at the repo root containing just your domain, e.g.
   `rustinsoraki.com`.
2. At your DNS provider, point the domain at GitHub Pages
   (`A` records to GitHub's IPs, or a `CNAME` record to `rustins.github.io`).
3. GitHub → Settings → Pages → enter the custom domain and enable **Enforce HTTPS**.
4. Update the `<link rel="canonical">` and Open Graph `og:url` in `index.html` to the new domain.
