# Preethi K — Software Test Engineer Portfolio

A premium, animated single-page portfolio built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step required.

**Live demo:** https://preethi-k.vercel.app

---

## Folder Structure

```
preethi-portfolio/
│── index.html          # Main HTML file (single page)
│── style.css            # All styles (dark glassmorphism theme, animations)
│── script.js             # All interactivity (loading screen, animations, forms)
│── assets/
│     ├── images/
│     │     └── profile.jpg       # Profile photo used in the hero section
│     ├── icons/
│     │     └── favicon.svg       # Site favicon (PK monogram)
│     ├── fonts/
│     │     ├── poppins-latin-300-normal.woff2
│     │     ├── poppins-latin-400-normal.woff2
│     │     ├── poppins-latin-500-normal.woff2
│     │     ├── poppins-latin-600-normal.woff2
│     │     ├── poppins-latin-700-normal.woff2
│     │     ├── space-grotesk-latin-400-normal.woff2
│     │     ├── space-grotesk-latin-500-normal.woff2
│     │     ├── space-grotesk-latin-600-normal.woff2
│     │     └── space-grotesk-latin-700-normal.woff2
│     └── resume.pdf              # Downloadable resume (Download Resume button)
│── README.md
│── vercel.json
```

Fonts (Poppins & Space Grotesk) are **self-hosted** in `assets/fonts/` — no external font CDN is required, so the site's typography works even offline. The one external dependency is the [Lucide icon library](https://unpkg.com/lucide) loaded via CDN for the small line icons throughout the page — an internet connection is needed for those icons to render.

---

## Installation / Running Locally

No build tools, no `npm install`, no dependencies to set up. Just:

1. Download or clone this project.
2. Open `index.html` directly in any modern browser (double-click it, or right-click → Open With → your browser).

That's it — the loading screen, animations, contact form, and resume download all work immediately.

**Optional (recommended for local development):** serve it with a simple local server instead of the `file://` protocol, so relative paths and any browser security restrictions behave exactly like production:

```bash
# Python 3
python3 -m http.server 8000

# then open http://localhost:8000 in your browser
```

---

## Sections Included

- Animated loading screen (progress bar + logo)
- Cinematic staggered hero entrance
- About
- Skills
- Experience (timeline)
- Testing Expertise
- Professional Highlights (animated counters)
- Testing Process (animated horizontal timeline)
- Projects (six project cards)
- Tools & Technologies
- Contact (working mailto-based contact form)
- Footer

---

## Deployment to Vercel

### Option A — Deploy via the Vercel Dashboard (recommended, no CLI needed)

1. Push this project to a GitHub repository (see "GitHub Deployment" below).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New → Project**.
4. Import your GitHub repository.
5. Framework Preset: choose **"Other"** (this is a static site, no build step needed).
6. Root Directory: leave as the repository root — **make sure `index.html` sits directly at the root of the repo you import** (i.e. don't nest this whole folder inside another folder in your repo; the contents of this `preethi-portfolio/` folder should BE the repo root).
7. Build Command: leave empty. Output Directory: leave empty/default.
8. Click **Deploy**.

Vercel will pick up `vercel.json` automatically (it just enables clean URLs — no build step is configured or required since this is a static site).

### Option B — Deploy via the Vercel CLI

```bash
npm install -g vercel
cd preethi-portfolio
vercel
```

Follow the prompts (accept the defaults — Framework: Other, no build command). Then run `vercel --prod` to push to production.

---

## GitHub Deployment Instructions

1. Create a new repository on GitHub (e.g. `Preethi-K`).
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Initial commit: Preethi K portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. Make sure the files (`index.html`, `style.css`, `script.js`, `assets/`, etc.) are committed at the **root** of the repository — not nested inside an extra subfolder — so Vercel can find `index.html` without any extra Root Directory configuration.
4. Connect the repo to Vercel as described above. Every future `git push` to `main` will automatically trigger a new deployment.

---

## Notes

- The **Download Resume** button links directly to `assets/resume.pdf` — replace that file with an updated resume any time; no code changes needed.
- The **contact form** opens the visitor's email client with the message pre-filled (mailto-based) since this is a static site with no backend. To collect submissions directly on your server instead, you'd need to point the form at a form backend (e.g. Formspree) or add a serverless function.
- All animations (loading screen, staggered hero reveal, scroll reveals, counters, hover effects) are implemented in plain CSS + vanilla JavaScript in `script.js` and `style.css` — no animation library required.
