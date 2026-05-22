import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function adminNotificationHtml(email: string): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
  <tr><td style="background:linear-gradient(135deg,#1F7A3A,#3aaa60);padding:28px 32px;">
    <span style="font-size:18px;font-weight:700;color:#fff;">Agvanta</span>
    <span style="float:right;font-size:11px;color:rgba(255,255,255,0.6);line-height:22px;">Newsletter</span>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="margin:0 0 16px;font-size:14px;color:#555;line-height:1.6;">A new user has subscribed to the newsletter:</p>
    <p style="margin:0;font-size:16px;color:#1a1a1a;font-weight:600;">${email}</p>
  </td></tr>
  <tr><td style="padding:20px 32px;border-top:1px solid #f0f0f0;">
    <p style="margin:0;font-size:11px;color:#aaa;">&copy; ${year} Agvanta &mdash; agvanta.in</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function welcomeEmailHtml(): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
  <tr><td style="background:linear-gradient(135deg,#1F7A3A,#3aaa60);padding:28px 32px;">
    <span style="font-size:18px;font-weight:700;color:#fff;">Agvanta</span>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="margin:0 0 16px;font-size:16px;color:#1a1a1a;font-weight:600;">Welcome to Agvanta!</p>
    <p style="margin:0 0 16px;font-size:14px;color:#555;line-height:1.7;">
      Thank you for subscribing. You'll receive agricultural insights, product updates, and expert tips directly in your inbox.
    </p>
    <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
      Visit us at <a href="https://agvanta.in" style="color:#1F7A3A;font-weight:600;text-decoration:none;">agvanta.in</a>
    </p>
  </td></tr>
  <tr><td style="padding:20px 32px;border-top:1px solid #f0f0f0;">
    <p style="margin:0;font-size:11px;color:#aaa;">&copy; ${year} Agvanta &mdash; Empowering Agriculture</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    }

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword) {
      console.error("[Newsletter] Missing SMTP_EMAIL or SMTP_PASSWORD in .env");
      return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    await transporter.verify();

    const from = `"Agvanta" <${smtpEmail}>`;

    await transporter.sendMail({
      from,
      to: smtpEmail,
      subject: `New Newsletter Subscriber: ${email}`,
      html: adminNotificationHtml(email),
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: `Welcome to Agvanta!`,
      html: welcomeEmailHtml(),
      text: `Welcome to Agvanta!\n\nThank you for subscribing. You'll receive agricultural insights, product updates, and expert tips directly in your inbox.\n\nVisit us at agvanta.in`,
    });

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ message: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
