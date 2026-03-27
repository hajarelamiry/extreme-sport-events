import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function e(val: unknown) {
  return escapeHtml(String(val || "").trim());
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 12px;font-weight:600;color:#555;width:160px;border-bottom:1px solid #f0f0f0;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#111;">${value}</td>
    </tr>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recaptchaToken } = body;

    // reCAPTCHA v3
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA manquant" }, { status: 400 });
    }
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const verifyData = await verifyRes.json();
    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ error: "reCAPTCHA invalide" }, { status: 400 });
    }

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = e(body.email);
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const name         = e(body.name);
    const phone        = e(body.phone);
    const activitiesRaw: string[] = Array.isArray(body.activities) ? body.activities : [];
    const activity = activitiesRaw.map(a => e(a)).join(", ");
    const date         = e(body.date);
    const participants = e(body.participants);
    const message      = e(body.message);

    if (!name || !phone || !activity || !date || !participants) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
        <h2 style="margin:0 0 20px;font-size:18px;color:#111;">🪂 Nouvelle demande de réservation</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Nom", name)}
          ${row("Email", `<a href="mailto:${email}">${email}</a>`)}
          ${row("Téléphone", phone)}
          ${row("Activité", activity)}
          ${row("Date souhaitée", date)}
          ${row("Participants", participants)}
          ${row("Message", message || "—")}
          ${row("Soumis le", new Date().toLocaleString("fr-FR"))}
        </table>
      </div>
    `;

    const { error: sendError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.RECIPIENT_EMAIL!,
      replyTo: email,
      subject: `Réservation — ${activity} — ${name}`,
      html,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}