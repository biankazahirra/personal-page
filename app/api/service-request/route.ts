import { NextResponse } from "next/server";

type RequestBody = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  priority?: unknown;
  message?: unknown;
};

const priorities = new Set(["low", "normal", "machine is smoking"]);

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Section 7's service desk. The route only claims a ticket when a real
 * delivery endpoint accepted the message. With no endpoint configured it says
 * so instead of pretending the request was sent.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RequestBody | null;

  if (!body) {
    return NextResponse.json(
      { ok: false, code: "BAD_REQUEST", message: "The form could not be read." },
      { status: 400 },
    );
  }

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const subject = text(body.subject, 200);
  const priority = text(body.priority, 40) || "normal";
  const message = text(body.message, 5000);

  if (!name || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      {
        ok: false,
        code: "BAD_REQUEST",
        message: "A name, a valid email, a subject and a message are required.",
      },
      { status: 400 },
    );
  }

  const endpoint = process.env.SERVICE_REQUEST_ENDPOINT;

  if (!endpoint) {
    return NextResponse.json(
      {
        ok: false,
        code: "CHANNEL_NOT_CONNECTED",
        message:
          "No delivery channel is connected yet. Nothing was sent. Use the plain email address instead.",
      },
      { status: 503 },
    );
  }

  const ticket = `SR-${new Date()
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, "")}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        subject,
        priority: priorities.has(priority) ? priority : "normal",
        message,
        ticket,
      }),
    });

    if (!response.ok) throw new Error(`endpoint responded ${response.status}`);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message:
          "The delivery channel did not accept the request. Nothing was sent; try the plain email address.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, ticket });
}
