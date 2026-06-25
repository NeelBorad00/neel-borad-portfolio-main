import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
import contactRouter from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;

// ── Security ──────────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    methods: ['POST', 'GET'],
  }),
);

app.use(express.json({ limit: '16kb' }));

// ── Rate limiting for contact endpoint ────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a moment and try again.' },
});

// ── Routes ────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

app.use('/api/contact', contactLimiter, contactRouter);

// ── Error middleware ──────────────────────────────────────────
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('[server] Unhandled error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  },
);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
