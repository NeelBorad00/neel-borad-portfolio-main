import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const schema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254).trim(),
  message: z.string().min(10).max(5000).trim(),
});

// Simple in-memory rate limiting (resets per cold start, but still useful)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_MAX = 8;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_MAX;
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429 },
    );
  }

  // ── Validation ───────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: result.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, message } = result.data;

  // ── Skip email if SMTP not configured (dev / preview) ──────
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[contact] SMTP not configured — logging enquiry:', { name, email, message });
    return NextResponse.json({ success: true });
  }

  // ── Send email ───────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL ?? 'neelborad00@gmail.com',
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Email send failed:', err);
    return NextResponse.json(
      { error: 'Failed to deliver message. Please try again.' },
      { status: 500 },
    );
  }
}
