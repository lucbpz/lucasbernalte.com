import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Load Vercel configuration
let vercelConfig = {};
try {
  const configPath = path.join(__dirname, 'vercel.json');
  if (fs.existsSync(configPath)) {
    vercelConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
} catch (error) {
  console.log('No vercel.json found or error reading it, using defaults');
}

const port = process.env.PORT || 3000;

// Middleware for handling redirects
if (vercelConfig.redirects) {
  vercelConfig.redirects.forEach(redirect => {
    app.get(redirect.source, (req, res) => {
      res.redirect(302, redirect.destination);
    });
  });
}

// API endpoint for now-playing (mock implementation)
app.get('/api/now-playing', (req, res) => {
  // Set cache headers as defined in vercel.json
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30');
  
  // Mock response - replace with actual implementation
  res.json({
    isPlaying: false,
    title: 'Not Playing',
    artist: 'N/A',
    album: 'N/A',
    albumImageUrl: null,
    songUrl: null
  });
});

// API endpoint for getting blog posts
app.get('/api/getBlogPosts', (req, res) => {
  res.json({ posts: [] });
});

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    // Apply headers from vercel.json if they exist
    if (vercelConfig.headers) {
      vercelConfig.headers.forEach(headerConfig => {
        if (filePath.match(headerConfig.source)) {
          headerConfig.headers.forEach(header => {
            res.set(header.key, header.value);
          });
        }
      });
    }
  }
}));

// Handle client-side routing (SPA fallback)
app.get('*', (req, res) => {
  // Check if the request is for a static file
  const ext = path.extname(req.path);
  if (ext) {
    // If it's a static file request and we reach here, it's 404
    res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'));
  } else {
    // For routes without extensions, serve the index.html or 404
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    const notFoundPath = path.join(__dirname, 'dist', '404.html');
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else if (fs.existsSync(notFoundPath)) {
      res.status(404).sendFile(notFoundPath);
    } else {
      res.status(404).send('Not Found');
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
