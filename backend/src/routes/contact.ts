import { Router, Request, Response } from 'express';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const router = Router();

const schema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254).trim(),
  message: z.string().min(10).max(5000).trim(),
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: 'Invalid input', details: result.error.flatten() });
    return;
  }

  const { name, email, message } = result.data;

  // Skip email delivery if SMTP is not configured (useful in dev)
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[contact] SMTP not configured — logging enquiry:', { name, email, message });
    res.json({ success: true });
    return;
  }

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

    res.json({ success: true });
  } catch (err) {
    console.error('[contact] Email send failed:', err);
    res.status(500).json({ error: 'Failed to deliver message. Please try again.' });
  }
});

export default router;
