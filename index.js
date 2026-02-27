/**
 * IntercomSwap — Entry Point
 * Trac Address: trac1p7yqla5zmzlj2ssjvpfa4xpcx7xrwt3qzl4c8n4qhqwv3k2zu6ls5z9d6h
 */

'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const TRAC_ADDRESS = 'trac1p7yqla5zmzlj2ssjvpfa4xpcx7xrwt3qzl4c8n4qhqwv3k2zu6ls5z9d6h';

// ── MIME types ────────────────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
};

// ── Mock swap rates (replace with live API calls in production) ───────────────
const RATES = {
  'BTC/TRAC':  2847.3,
  'BTC/ETH':   19.84,
  'ETH/TRAC':  143.5,
  'USDT/TRAC': 23.61,
};

// ── Router ────────────────────────────────────────────────────────────────────
function router(req, res) {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);

  // ── API: GET /api/info
  if (req.method === 'GET' && url.pathname === '/api/info') {
    return json(res, {
      name:        'IntercomSwap',
      version:     '1.0.0',
      tracAddress: TRAC_ADDRESS,
      features:    ['swap', 'messaging', 'portfolio'],
    });
  }

  // ── API: GET /api/rates
  if (req.method === 'GET' && url.pathname === '/api/rates') {
    return json(res, { rates: RATES, updatedAt: new Date().toISOString() });
  }

  // ── API: POST /api/swap
  if (req.method === 'POST' && url.pathname === '/api/swap') {
    return parseBody(req, (body) => {
      const { from, to, amount } = body;
      const pair = `${from}/${to}`;
      const rate = RATES[pair];
      if (!rate) return json(res, { error: `Unsupported pair: ${pair}` }, 400);
      const received = (parseFloat(amount) * rate * 0.997).toFixed(8);
      return json(res, {
        success: true,
        from, to,
        sent:     amount,
        received,
        fee:      (parseFloat(amount) * 0.003).toFixed(8),
        txId:     `trac_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
        tracAddress: TRAC_ADDRESS,
      });
    });
  }

  // ── API: POST /api/message
  if (req.method === 'POST' && url.pathname === '/api/message') {
    return parseBody(req, (body) => {
      const { to, text } = body;
      if (!to || !text) return json(res, { error: 'Missing `to` or `text`' }, 400);
      return json(res, {
        success: true,
        from:    TRAC_ADDRESS,
        to,
        text,
        timestamp: new Date().toISOString(),
        msgId:   `msg_${Date.now()}`,
      });
    });
  }

  // ── Static file serving ───────────────────────────────────────────────────
  let filePath = url.pathname === '/' ? '/intercomswap-app.html' : url.pathname;
  filePath = path.join(__dirname, filePath);
  const ext  = path.extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function json(res, payload, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload, null, 2));
}

function parseBody(req, cb) {
  let raw = '';
  req.on('data', chunk => { raw += chunk; });
  req.on('end', () => {
    try { cb(JSON.parse(raw)); }
    catch { cb({}); }
  });
}

// ── Start server ──────────────────────────────────────────────────────────────
const server = http.createServer(router);

server.listen(PORT, HOST, () => {
  console.log(`\n  IntercomSwap running at http://${HOST}:${PORT}`);
  console.log(`  Trac Address : ${TRAC_ADDRESS}`);
  console.log(`  API endpoints:`);
  console.log(`    GET  /api/info`);
  console.log(`    GET  /api/rates`);
  console.log(`    POST /api/swap`);
  console.log(`    POST /api/message\n`);
});

module.exports = { server, RATES, TRAC_ADDRESS };
