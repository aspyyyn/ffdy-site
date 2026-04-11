# Deploying FFDY Site to foundationfordisabledyouths.org (Cloudflare Pages)

## Option A — Cloudflare Pages (Recommended, Free)

1. Push this `ffdy-site/` folder to a GitHub repository.
2. In Cloudflare Dashboard → **Pages** → **Create a project** → Connect to Git.
3. Select your repo. Set:
   - **Framework preset:** None
   - **Build command:** (leave blank)
   - **Build output directory:** `/` (root)
4. Click **Save and Deploy**.
5. In Cloudflare **Pages → Custom domains**, add `foundationfordisabledyouths.org`.
   - Cloudflare will automatically handle SSL and DNS (since you bought the domain there).

## Option B — Cloudflare Workers Sites

Use `wrangler` CLI to upload the static site directly.

## Adding Photos

Photos are organized by year in the gallery. To add real photos:
1. Create a `photos/` folder inside `ffdy-site/`
2. Add subfolders: `photos/2024/`, `photos/2023/`, etc.
3. In `photos.html` and `zh/photos.html`, replace the placeholder `<div class="gallery-item">` blocks with:
   ```html
   <div class="gallery-item">
     <img src="photos/2024/your-photo.jpg" alt="FFDY 2024 event" loading="lazy" />
   </div>
   ```

## Logo & Images

Currently using images hosted on ffdy.org. For independence, download and save locally:
- Logo: https://ffdy.org/uploads/1/4/9/5/149537551/published/logo.png
- Hero: https://ffdy.org/uploads/1/4/9/5/149537551/published/pexels-leeloothefirst-4910567_1.jpg

Save to `images/logo.png` and `images/hero.jpg`, then update the `src` attributes in all HTML files.
