# GitHub Pages Deployment

This project is configured for deployment to GitHub Pages.

## Deployment Steps

1. **Install dependencies** (if not already done):

   ```bash
   npm install
   ```

2. **Deploy to GitHub Pages**:

   ```bash
   npm run deploy:gh-pages
   ```

   This command will:
   - Build the app with the correct base href (`/game-store/`)
   - Deploy the built files to the `gh-pages` branch
   - Push to GitHub

3. **Enable GitHub Pages** (first-time setup):
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select the `gh-pages` branch
   - Click **Save**
   - Your site will be published at: `https://jaruszewskig.github.io/game-store/`

## Local Testing

To test the production build locally before deploying:

```bash
npm run build:gh-pages
npx http-server dist/game-store/browser -p 8080
```

Then open `http://localhost:8080/game-store/` in your browser.

## Important Files

- `.nojekyll` - Prevents GitHub Pages from processing files with Jekyll
- `angular.json` - Configured to include `.nojekyll` in build output
- `package.json` - Contains build and deploy scripts

## Notes

- The app is built with `--base-href /game-store/` to work correctly on GitHub Pages
- Client-side routing works via the 404.html redirect trick (handled by angular-cli-ghpages)
