# Publishing & Deployment Guide

This guide covers how to publish and deploy the Football Logos API.

## Table of Contents

1. [NPM Package Publication](#npm-package-publication)
2. [Docker Deployment](#docker-deployment)
3. [Cloud Hosting Options](#cloud-hosting-options)
4. [GitHub Releases](#github-releases)

---

## NPM Package Publication

### Prerequisites

- NPM account (free at [npmjs.com](https://www.npmjs.com))
- Published on GitHub

### Steps

1. **Update package.json**
   - Replace `yourusername` with your GitHub username in repository URLs
   - Update author field with your name and email
   - Update version number (use semantic versioning)

2. **Create .npmrc (optional, for authentication)**
   ```bash
   # In your home directory: ~/.npmrc
   //registry.npmjs.org/:_authToken=YOUR_NPM_TOKEN
   ```

3. **Login to NPM**
   ```bash
   npm login
   ```

4. **Publish**
   ```bash
   npm publish
   ```

5. **Verify Publication**
   - Visit: `https://www.npmjs.com/package/football-logos-api`

### Usage After Publishing

Users can install and run your API:

```bash
npm install -g football-logos-api
football-logos-api  # runs on port 3000
```

Or use in a project:

```bash
npm install football-logos-api
```

Then in their Node.js app:

```javascript
import app from 'football-logos-api/src/app.js';
```

---

## Docker Deployment

### Build Docker Image Locally

```bash
docker build -t football-logos-api:latest .
docker run -p 3000:3000 football-logos-api:latest
```

### Publish to Docker Hub

1. **Create Docker Hub account** (free at [hub.docker.com](https://hub.docker.com))

2. **Login to Docker Hub**
   ```bash
   docker login
   ```

3. **Tag your image**
   ```bash
   docker tag football-logos-api:latest yourusername/football-logos-api:latest
   docker tag football-logos-api:latest yourusername/football-logos-api:1.0.0
   ```

4. **Push to Docker Hub**
   ```bash
   docker push yourusername/football-logos-api:latest
   docker push yourusername/football-logos-api:1.0.0
   ```

5. **Users can then run:**
   ```bash
   docker run -p 3000:3000 yourusername/football-logos-api:latest
   ```

---

## Cloud Hosting Options (Free Tier)

### Option 1: Render (Recommended - Free Tier Available)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [render.com](https://render.com)**
   - Sign up with GitHub account
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configuration:
     - **Name:** football-logos-api
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Deploy**
   - Render will automatically deploy on every push

4. **Access your API**
   - URL: `https://football-logos-api.onrender.com`

### Option 2: Fly.io (Free Credits)

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Create Fly app**
   ```bash
   fly launch
   ```
   - Choose Node.js
   - Answer configuration questions

3. **Deploy**
   ```bash
   fly deploy
   ```

4. **Access your API**
   - URL will be provided in terminal

### Option 3: Railway (Free Tier)

1. **Go to [railway.app](https://railway.app)**
   - Connect GitHub account
   - Create new project from repository
   - Configure environment variables
   - Deploy

2. **Access your API**
   - Railway provides a public URL

### Option 4: Vercel (Good for Node.js)

1. **Go to [vercel.com](https://vercel.com)**
   - Import your GitHub repository
   - Framework: Other
   - Deploy

---

## GitHub Releases

1. **Create Release**
   ```bash
   git tag -a v1.0.0 -m "Initial release"
   git push origin v1.0.0
   ```

2. **Go to GitHub** → Your Repo → Releases
   - Click "Create a release"
   - Select v1.0.0 tag
   - Title: "Football Logos API v1.0.0"
   - Description: Update history and usage

3. **Users can install from GitHub**
   ```bash
   npm install github:yourusername/football-logos-api
   ```

---

## Status Badge (for README.md)

Add this to your README to show deployment status:

```markdown
[![NPM Version](https://img.shields.io/npm/v/football-logos-api.svg)](https://www.npmjs.com/package/football-logos-api)
[![Docker Image Size](https://img.shields.io/docker/image-size/yourusername/football-logos-api)](https://hub.docker.com/r/yourusername/football-logos-api)
```

---

## Continuous Integration (CI/CD)

### GitHub Actions Workflow

Create `.github/workflows/npm-publish.yml`:

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Summary

| Method | Effort | Cost | Recommendation |
|--------|--------|------|-----------------|
| NPM Package | Low | Free | ✅ Best for libraries |
| Docker Hub | Low | Free | ✅ Best for containers |
| Render | Low | Free (limited) | ✅ Best for hosting |
| Fly.io | Low | Free (credits) | ✅ Good alternative |
| GitHub Releases | Low | Free | ✅ Version control |

**Recommended approach:** Publish to NPM + Docker Hub + Free cloud hosting (Render)
