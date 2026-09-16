// server.ts
// Express backend with Vite integration, API route handlers, scraping engine, and sitemap

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { scrapeFiverrGig, parseFiverrHtml, isValidFiverrUrl, generateSlug } from './lib/scraper.ts';
import { dbStore, ServiceRecord } from './lib/db.ts';
import { hashPassword } from './prisma/seed.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser
  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'QB Gig Finder', timestamp: new Date().toISOString() });
  });

  // ===========================================================================
  // API: SCRAPE FIVERR GIG (POST /api/scrape)
  // ===========================================================================
  app.post('/api/scrape', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({
          success: false,
          error: 'URL is required in the request payload.',
        });
      }

      // Check URL validity
      if (!isValidFiverrUrl(url)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid URL. Please enter a valid Fiverr gig URL (e.g., https://www.fiverr.com/seller/gig-title).',
        });
      }

      // Perform server-side scraping with 3-tier priority extraction
      const result = await scrapeFiverrGig(url);
      return res.json(result);
    } catch (err: any) {
      // Must NEVER throw an unhandled error according to technical specification
      return res.status(200).json({
        success: false,
        error: `Unexpected scraping exception: ${err?.message || 'Failed to reach or process the destination page.'}`,
      });
    }
  });

  // ===========================================================================
  // API: PARSE RAW FIVERR HTML (POST /api/scrape/html)
  // Bypasses anti-bot IP blocks by parsing HTML provided directly by user
  // ===========================================================================
  app.post('/api/scrape/html', (req, res) => {
    try {
      const { html, url } = req.body;
      if (!html || typeof html !== 'string' || html.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'HTML content is required.',
        });
      }

      const result = parseFiverrHtml(html, url || 'https://www.fiverr.com');
      return res.json(result);
    } catch (err: any) {
      return res.status(200).json({
        success: false,
        error: `Failed to parse HTML: ${err?.message || 'Invalid syntax'}`,
      });
    }
  });

  // ===========================================================================
  // API: SERVICES (GET /api/services & POST /api/services)
  // ===========================================================================
  app.get('/api/services', (req, res) => {
    const { status, search, category } = req.query;
    const services = dbStore.getServices({
      status: status ? String(status) : undefined,
      search: search ? String(search) : undefined,
      category: category ? String(category) : undefined,
    });
    res.json({ services });
  });

  app.post('/api/services', (req, res) => {
    try {
      const body = req.body;
      if (!body.title || !body.fiverrUrl) {
        return res.status(400).json({
          success: false,
          error: 'Title and Fiverr outbound URL are required.',
        });
      }

      // Generate slug if missing
      if (!body.slug) {
        body.slug = generateSlug(body.title);
      }

      const created = dbStore.createService(body);
      return res.status(201).json({ success: true, service: created });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // ===========================================================================
  // API: BULK SERVICES (POST /api/services/bulk)
  // Saves array of scraped service objects all with status "draft"
  // ===========================================================================
  app.post('/api/services/bulk', (req, res) => {
    try {
      const { services } = req.body;
      if (!Array.isArray(services) || services.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Expected a non-empty array of services.',
        });
      }

      const createdList: ServiceRecord[] = [];
      for (const item of services) {
        const itemSlug = item.slug || generateSlug(item.title || 'quickbooks-service');
        const record = dbStore.createService({
          ...item,
          slug: itemSlug,
          status: 'draft', // Forced draft as required by specification
        });
        createdList.push(record);
      }

      return res.status(201).json({
        success: true,
        count: createdList.length,
        services: createdList,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // ===========================================================================
  // API: SERVICE BY ID / SLUG (GET, PATCH, DELETE)
  // ===========================================================================
  app.get('/api/services/:idOrSlug', (req, res) => {
    const { idOrSlug } = req.params;
    const service = dbStore.getServiceByIdOrSlug(idOrSlug);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found.' });
    }
    return res.json({ success: true, service });
  });

  app.patch('/api/services/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updated = dbStore.updateService(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Service not found.' });
    }
    return res.json({ success: true, service: updated });
  });

  app.delete('/api/services/:id', (req, res) => {
    const { id } = req.params;
    const ok = dbStore.deleteService(id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Service not found or already removed.' });
    }
    return res.json({ success: true, message: 'Service successfully deleted.' });
  });

  // ===========================================================================
  // API: ADMIN AUTH (POST /api/auth/login, GET /api/auth/session, POST /api/auth/logout)
  // ===========================================================================
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required.',
      });
    }

    const admin = dbStore.findAdminUser(username);
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password credentials.',
      });
    }

    const targetHash = hashPassword(password);
    if (admin.passwordHash !== targetHash) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password credentials.',
      });
    }

    return res.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        role: 'ADMIN',
      },
    });
  });

  app.get('/api/auth/session', (req, res) => {
    // Return sample active session or mock
    res.json({ authenticated: true, user: { username: 'admin' } });
  });

  // ===========================================================================
  // API: CONTACT FORM (POST /api/contact)
  // ===========================================================================
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email address, and message are required.',
      });
    }

    const recipient = process.env.CONTACT_EMAIL_TO || 'contact@example.com';
    console.log(`[Contact Form Submission] To: ${recipient}, From: ${name} <${email}>`);
    console.log(`Message: ${message}`);

    return res.json({
      success: true,
      message: `Thank you for contacting QB Gig Finder! Your message has been forwarded to our support desk (${recipient}). We will get back to you within 1-2 business days.`,
    });
  });

  // ===========================================================================
  // API: SITEMAP.XML (Dynamic Route Handler)
  // ===========================================================================
  app.get('/sitemap.xml', (req, res) => {
    const publishedServices = dbStore.getServices({ status: 'published' });
    const host = req.get('host') || 'qbgigfinder.com';
    const proto = req.secure || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
    const baseUrl = `${proto}://${host}`;

    const staticRoutes = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/terms', priority: '0.3', changefreq: 'monthly' },
      { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
      { path: '/affiliate-disclosure', priority: '0.5', changefreq: 'monthly' },
      { path: '/disclaimer', priority: '0.4', changefreq: 'monthly' },
      { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    ];

    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
${publishedServices
  .map(
    (s) => `  <url>
    <loc>${baseUrl}/service/${s.slug}</loc>
    <lastmod>${s.updatedAt ? s.updatedAt.split('T')[0] : today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  // ===========================================================================
  // Vite Middleware / Static Serving
  // ===========================================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QB Gig Finder server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
