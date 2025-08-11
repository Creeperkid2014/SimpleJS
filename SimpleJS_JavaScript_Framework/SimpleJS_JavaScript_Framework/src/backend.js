// backend.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

class SimpleJSBackend {
  constructor({ port = 3000, apiPrefix = '/api/v1' } = {}) {
    this.port = port;
    this.apiPrefix = apiPrefix;
    this.app = express();
    this.routes = new Map();

    this._configureMiddleware();
    this._configureErrorHandling();
  }

  _configureMiddleware() {
    this.app.use(cors()); // enable CORS for all origins, configure as needed
    this.app.use(express.json()); // parse JSON body
    this.app.use(morgan('dev')); // logger middleware

    // Health check endpoint
    this.app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));
  }

  _configureErrorHandling() {
    // Catch all unknown routes
    this.app.use((req, res, next) => {
      res.status(404).json({ error: 'Not Found', path: req.originalUrl });
    });

    // Central error handler
    this.app.use((err, req, res, next) => {
      console.error('[SimpleJS Backend Error]', err);
      res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      });
    });
  }

  addRoute(method, path, handler) {
    const fullPath = this.apiPrefix + path;
    this.routes.set(fullPath, { method: method.toLowerCase(), handler });

    this.app[method.toLowerCase()](fullPath, async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (err) {
        next(err);
      }
    });
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`SimpleJS backend running at http://localhost:${this.port}${this.apiPrefix}`);
    });

    // Graceful shutdown
    process.on('SIGINT', () => this._shutdown());
    process.on('SIGTERM', () => this._shutdown());
  }

  _shutdown() {
    console.log('SimpleJS backend shutting down...');
    this.server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  }

  // Example utility for retrying async functions (similar to ajax retry)
  async retryAsync(fn, retries = 3, delay = 1000) {
    let attempts = 0;
    while (attempts < retries) {
      try {
        return await fn();
      } catch (err) {
        attempts++;
        if (attempts >= retries) throw err;
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }
}

export default SimpleJSBackend;
