import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, company, service, message, budget, type } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos requeridos incompletos" }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type ?? "contacto",
          name, email, company, service, message, budget,
          receivedAt: new Date().toISOString(),
          source: "company-os-landing",
        }),
      });
    } catch (err) {
      console.error("n8n webhook error:", err);
    }
  } else {
    console.log("📬 Nuevo contacto:", { name, email, company, service, message, budget, type });
  }

  return NextResponse.json({ ok: true });
}
