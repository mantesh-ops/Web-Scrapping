# Experts Directory Website

This repository contains a static experts directory website (`index.html`, `styles.css`, `script.js`) ready for GitHub Pages hosting.

## Live URL after setup

After you push this repository to GitHub and enable Pages, your URL will be:

- `https://<your-github-username>.github.io/<your-repo-name>/`

## One-time setup (GitHub)

1. Push this repo to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` or `work` branch to trigger deployment.
5. Open **Actions** tab and wait for **Deploy static site to GitHub Pages** to finish.
6. GitHub will show the exact live URL in the deployment summary.

## Local preview

```bash
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/index.html`.
