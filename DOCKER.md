# Docker Setup for lucasbernalte.com

This guide explains how to build, run, and deploy the Docker container for your personal website.

## 📦 What's Included

- **Dockerfile**: Multi-stage build for optimized production image
- **docker-compose.yml**: Easy local development and deployment
- **server.js**: Express.js server that mimics Vercel's behavior
- **build-and-push.sh**: Automated script for building and pushing to Docker Hub

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run the container
npm run docker:dev

# Or run in detached mode (background)
npm run docker:prod
```

### Option 2: Manual Docker Commands

```bash
# Build the image
docker build -t lucasbernalte981/lucasbernalte-web:latest .

# Run the container
docker run -p 3000:3000 lucasbernalte981/lucasbernalte-web:latest
```

### Option 3: Pull from Docker Hub

```bash
# Pull the pre-built image
docker pull lucasbernalte981/lucasbernalte-web:latest

# Run it
docker run -p 3000:3000 lucasbernalte981/lucasbernalte-web:latest
```

## 🛠️ Building and Pushing to Docker Hub

### Using the build script:

```bash
# Build and push to Docker Hub
npm run docker:build

# Or run the script directly
chmod +x build-and-push.sh
./build-and-push.sh

# Build with a specific version tag
./build-and-push.sh v1.0.0
```

### Manual build and push:

```bash
# Build the image
docker build -t lucasbernalte981/lucasbernalte-web:latest .

# Push to Docker Hub (requires docker login)
docker push lucasbernalte981/lucasbernalte-web:latest
```

## 🔧 How It Works

### Build Process

1. **Stage 1 (Builder)**: 
   - Uses Node.js 20 Alpine
   - Installs pnpm and dependencies
   - Builds the Astro.js static site
   - Outputs to `/app/dist`

2. **Stage 2 (Production)**:
   - Uses Node.js 20 Alpine
   - Installs only production dependencies
   - Copies built files and server configuration
   - Runs Express.js server

### Server Features

The Express.js server (`server.js`) provides:

- **Static file serving** from the `/dist` directory
- **API routes** like `/api/now-playing` and `/api/getBlogPosts`
- **Redirects** as configured in `vercel.json`
- **Headers** as configured in `vercel.json`
- **SPA fallback** for client-side routing

### Vercel Compatibility

The server reads your `vercel.json` configuration and applies:
- Redirects (e.g., `/live` → Twitch)
- Headers (e.g., cache control for API endpoints)
- Clean URLs and trailing slash handling

## 🌐 Deployment Options

### 1. Docker Hub + Cloud Provider

```bash
# Push to Docker Hub
./build-and-push.sh

# Deploy to your cloud provider using:
# docker pull lucasbernalte981/lucasbernalte-web:latest
```

### 2. Docker Compose on VPS

```yaml
version: '3.8'
services:
  web:
    image: lucasbernalte981/lucasbernalte-web:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

### 3. Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: lucasbernalte-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: lucasbernalte-web
  template:
    metadata:
      labels:
        app: lucasbernalte-web
    spec:
      containers:
      - name: web
        image: lucasbernalte981/lucasbernalte-web:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
```

## 🔍 Troubleshooting

### Build Issues

```bash
# Check Docker is running
docker info

# View build logs
docker build --no-cache -t lucasbernalte981/lucasbernalte-web:latest .

# Check if image exists
docker images | grep lucasbernalte-web
```

### Runtime Issues

```bash
# Check container logs
docker logs <container_id>

# Run container interactively
docker run -it lucasbernalte981/lucasbernalte-web:latest sh

# Test API endpoints
curl http://localhost:3000/api/now-playing
curl http://localhost:3000/api/getBlogPosts
```

### Push Issues

```bash
# Login to Docker Hub
docker login

# Check authentication
docker info | grep Username

# Manual push
docker push lucasbernalte981/lucasbernalte-web:latest
```

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `production` | Node environment |

## 🎯 Performance Tips

1. **Use multi-stage builds** (already implemented)
2. **Optimize .dockerignore** (already included)
3. **Use Alpine images** for smaller size
4. **Enable caching** for faster builds

## 📋 API Endpoints

- `GET /api/now-playing` - Currently playing music
- `GET /api/getBlogPosts` - Blog posts data
- `GET /*` - Static files and SPA routing

## 🔗 Links

- Docker Hub: https://hub.docker.com/r/lucasbernalte981/lucasbernalte-web
- GitHub: https://github.com/lucbpz/lucasbernalte.com
- Website: https://lucasbernalte.com
