import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  identity: string;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  state: string;
  message: string;
}

function validate(data: Partial<ContactPayload>): string | null {
  const required: (keyof ContactPayload)[] = [
    "identity", "fullName", "phone", "email", "subject", "state", "message",
  ];
  for (const f of required) {
    if (!data[f] || String(data[f]).trim() === "")
      return `Field "${f}" is required.`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email!)) return "Invalid email.";
  if (data.message!.trim().length < 4) return "Message too short.";
  return null;
}

// ─── Minimalistic Email Template ──────────────────────────────────────────────

function adminEmailHtml(d: ContactPayload): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1F7A3A,#3aaa60);padding:28px 32px;">
    <span style="font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.3px;">Agvanta</span>
    <span style="float:right;font-size:11px;color:rgba(255,255,255,0.6);line-height:22px;">New Inquiry</span>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:32px;">
    <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.6;">
      New contact form submission from <strong style="color:#1a1a1a;">${d.fullName}</strong> (${d.identity})
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px;">
      ${[
        ["Name", d.fullName],
        ["Email", d.email],
        ["Phone", d.phone],
        ["Subject", d.subject],
        ["State", d.state],
      ].map(([k, v]) => `
      <tr>
        <td style="padding:10px 12px;font-size:12px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #f0f0f0;width:90px;">${k}</td>
        <td style="padding:10px 12px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0f0f0;">${v}</td>
      </tr>`).join("")}
    </table>

    <div style="background:#f8faf8;border-left:3px solid #3aaa60;border-radius:0 6px 6px 0;padding:16px 18px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
      <p style="margin:0;font-size:14px;color:#333;line-height:1.7;">${d.message.replace(/\n/g, "<br/>")}</p>
    </div>

    <table cellpadding="0" cellspacing="0">
      <tr><td style="background:#1F7A3A;border-radius:6px;">
        <a href="mailto:${d.email}?subject=Re%3A%20${encodeURIComponent(d.subject)}" style="display:inline-block;padding:10px 24px;color:#fff;font-size:13px;font-weight:600;text-decoration:none;">Reply to ${d.fullName}</a>
      </td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 32px;border-top:1px solid #f0f0f0;">
    <p style="margin:0;font-size:11px;color:#aaa;">&copy; ${year} Agvanta &mdash; agvanta.in</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

function userConfirmationHtml(d: ContactPayload): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1F7A3A,#3aaa60);padding:28px 32px;">
    <span style="font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.3px;">Agvanta</span>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:32px;">
    <p style="margin:0 0 16px;font-size:16px;color:#1a1a1a;font-weight:600;">Hi ${d.fullName},</p>

    <p style="margin:0 0 16px;font-size:14px;color:#555;line-height:1.7;">
      Thank you for contacting Agvanta. We have received your inquiry regarding
      <strong style="color:#1a1a1a;">${d.subject}</strong> and our team will respond within
      <strong style="color:#1a1a1a;">1–2 business days</strong>.
    </p>

    <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
      For anything urgent, reach us at
      <a href="mailto:info@agvanta.in" style="color:#1F7A3A;font-weight:600;text-decoration:none;">info@agvanta.in</a>
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 32px;border-top:1px solid #f0f0f0;">
    <p style="margin:0;font-size:11px;color:#aaa;">&copy; ${year} Agvanta &mdash; Empowering Agriculture</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: Partial<ContactPayload> = await req.json();
    const err = validate(body);
    if (err) return NextResponse.json({ message: err }, { status: 400 });

    const data = body as ContactPayload;
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword) {
      console.error("[Contact] Missing SMTP_EMAIL or SMTP_PASSWORD in environment");
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
      replyTo: data.email,
      subject: `[Agvanta] ${data.subject} — ${data.fullName}`,
      html: adminEmailHtml(data),
      text: `New inquiry from ${data.fullName} (${data.identity})\nEmail: ${data.email}\nPhone: ${data.phone}\nState: ${data.state}\nSubject: ${data.subject}\n\n${data.message}`,
    });

    await transporter.sendMail({
      from,
      to: data.email,
      subject: `We received your inquiry — Agvanta`,
      html: userConfirmationHtml(data),
      text: `Hi ${data.fullName},\n\nThank you for contacting Agvanta. We received your inquiry regarding "${data.subject}" and will respond within 1–2 business days.\n\nFor urgent matters: info@agvanta.in\n\nAgvanta — agvanta.in`,
    });

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ message: "Failed to send. Please try again." }, { status: 500 });
  }
}