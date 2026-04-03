# Quick Publishing Checklist

Follow this checklist to publish your Football Badges API to NPM, Docker Hub, and cloud hosting. **Or use jsDelivr CDN for instant free distribution over GitHub.**

## CDN Distribution via jsDelivr (0 minutes - INSTANT)

✅ **Your logos are already on a global CDN via jsDelivr.** No setup needed—just push to GitHub.

**URL Format:**
```
https://cdn.jsdelivr.net/gh/leoratzlaff/football-badges@latest/logos/[country]/[team].png
```

**Examples:**
```
https://cdn.jsdelivr.net/gh/leoratzlaff/football-badges@latest/logos/england/arsenal-fc.png
https://cdn.jsdelivr.net/gh/leoratzlaff/football-badges@latest/logos/italy/juventus-fc.png
```

**Next Steps:**
- [ ] Push code to GitHub
- [ ] Share jsDelivr URLs with users
- [ ] Optional: Tag releases with `git tag v1.0.0 && git push --tags` for versioned URLs

---

## Pre-Publishing Setup

- [X] Update `package.json`:
  - [X] Fill in your GitHub username in repository URLs
  - [X] Update author name and email
  - [X] Verify version number (start with 1.0.0)
  - [X] Review keywords

- [ ] Verify `.npmignore` excludes unnecessary files

- [ ] Create `LICENSE` file (MIT is included, review and add if needed)

- [ ] Test locally:
  ```bash
  npm install
  npm start
  # Visit http://localhost:3000
  ```

- [ ] Commit and push to GitHub
  ```bash
  git add .
  git commit -m "Prepare for publication"
  git push origin main
  ```

---

## Step 1: Publish to NPM (10 minutes)

- [ ] Create free account at [npmjs.com](https://www.npmjs.com)
- [ ] Login locally:
  ```bash
  npm login
  ```
- [ ] Publish package:
  ```bash
  npm publish
  ```
- [ ] Verify at: `https://www.npmjs.com/package/football-logos-api`

**Result:** Users can install with `npm install football-logos-api`

---

## Step 2: Publish to Docker Hub (10 minutes)

- [ ] Create free account at [hub.docker.com](https://hub.docker.com)
- [ ] Login locally:
  ```bash
  docker login
  ```
- [ ] Build image:
  ```bash
  docker build -t yourusername/football-logos-api:latest .
  ```
- [ ] Push to Docker Hub:
  ```bash
  docker push yourusername/football-logos-api:latest
  ```
- [ ] Verify at: `https://hub.docker.com/r/yourusername/football-logos-api`

**Result:** Users can run with `docker run -p 3000:3000 yourusername/football-logos-api:latest`

---

## Step 3: Deploy to Free Cloud Hosting (5-15 minutes)

Choose ONE:

### Option A: Render (Recommended)
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up with GitHub
- [ ] Connect your football-logos-api repository
- [ ] Create Web Service with these settings:
  - Name: `football-logos-api`
  - Build: `npm install`
  - Start: `npm start`
  - Plan: Free
- [ ] Deploy
- [ ] Access at: `https://football-logos-api.onrender.com`

### Option B: Railway
- [ ] Go to [railway.app](https://railway.app)
- [ ] Connect GitHub account
- [ ] Import your football-logos-api repository
- [ ] Deploy
- [ ] Access at: provided URL

### Option C: Fly.io
- [ ] Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
- [ ] Run: `fly launch`
- [ ] Run: `fly deploy`
- [ ] Access at: provided URL

---

## Step 4: Setup GitHub Actions CI/CD (5 minutes)

- [ ] `.github/workflows/publish.yml` already created
- [ ] Go to GitHub repository Settings → Secrets
- [ ] Add secrets (if automating):
  - [ ] `NPM_TOKEN` - from npmjs.com account settings
  - [ ] `DOCKER_USERNAME` - your Docker Hub username
  - [ ] `DOCKER_PASSWORD` - your Docker Hub password (or access token)
- [ ] Tag a release to trigger auto-publish:
  ```bash
  git tag -a v1.0.1 -m "Bump version"
  git push origin v1.0.1
  ```

---

## Step 5: Create GitHub Release (2 minutes)

- [ ] Go to GitHub → Your Repo → Releases
- [ ] Click "Create a new release"
- [ ] Tag: `v1.0.0`
- [ ] Title: "Football Badges API v1.0.0"
- [ ] Description: Paste your API features and usage
- [ ] Publish

**Result:** Users can install from GitHub: `npm install github:yourusername/football-logos-api`

---

## Step 6: Update Documentation (5 minutes)

Update `README.md` with links to:

- [ ] NPM: `https://www.npmjs.com/package/football-logos-api`
- [ ] Docker: `https://hub.docker.com/r/yourusername/football-logos-api`
- [ ] Live API: `https://football-logos-api.onrender.com` (or your host)

Add installation instructions:

```markdown
## Installation

### Option 1: NPM Package
\`\`\`bash
npm install football-logos-api
npm start
\`\`\`

### Option 2: Docker
\`\`\`bash
docker run -p 3000:3000 yourusername/football-logos-api:latest
\`\`\`

### Option 3: Use Live API
\`\`\`bash
curl https://football-logos-api.onrender.com/api/england/arsenal
\`\`\`
```

---

## Post-Publishing

- [ ] Test NPM installation:
  ```bash
  npm info football-logos-api
  ```

- [ ] Test Docker image:
  ```bash
  docker run -p 3000:3000 yourusername/football-logos-api:latest
  ```

- [ ] Test cloud deployment by visiting the URL

- [ ] Share with web developers! 🎉

---

## Quick Links

| Resource | Link |
|----------|------|
| NPM Package | `https://www.npmjs.com/package/football-logos-api` |
| Docker Hub | `https://hub.docker.com/r/yourusername/football-logos-api` |
| GitHub Repo | `https://github.com/yourusername/football-logos-api` |
| Live API | `https://football-logos-api.onrender.com` |

---

## Support Resources

- NPM Docs: https://docs.npmjs.com/
- Docker Docs: https://docs.docker.com/
- Render Docs: https://render.com/docs
- Fly.io Docs: https://fly.io/docs/
- GitHub Docs: https://docs.github.com/
