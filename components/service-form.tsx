"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

type ResponseBody = {
  ok?: boolean;
  ticket?: string;
  code?: string;
  message?: string;
};

export function ServiceForm({
  email,
  configured,
}: {
  email?: string;
  configured: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [ticket, setTicket] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<"server" | "mailto" | null>(null);

  const canSend = configured || Boolean(email);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend || status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);

    const name = String(data.get("name") ?? "");
    const replyTo = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const priority = String(data.get("priority") ?? "normal");
    const message = String(data.get("message") ?? "");

    if (!configured && email) {
      const localTicket = `SR-${new Date()
        .toISOString()
        .slice(2, 10)
        .replace(/-/g, "")}-${Math.random().toString(16).slice(2, 6).toUpperCase()}`;

      const body = [
        `Ticket: ${localTicket}`,
        `Name: ${name}`,
        `Reply to: ${replyTo}`,
        `Priority: ${priority}`,
        "",
        message,
      ].join("\n");

      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        `[${localTicket}] ${subject}`,
      )}&body=${encodeURIComponent(body)}`;

      setTicket(localTicket);
      setDelivery("mailto");
      setStatus("sent");
      return;
    }

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email: replyTo,
          subject,
          priority,
          message,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as ResponseBody;

      if (!response.ok || !result.ok) {
        setStatus("error");
        setError(result.message ?? "The request did not go through. Nothing was sent.");
        return;
      }

      setTicket(result.ticket ?? null);
      setDelivery("server");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("The request did not go through. Check the connection and try again.");
    }
  }

  return (
    <div className="carbon-stack">
      <div className="carbon-sheet" data-sheet="pink" aria-hidden="true" />
      <div className="carbon-sheet" data-sheet="yellow" aria-hidden="true" />

      <form className="carbon-form" onSubmit={submit} aria-describedby="service-channel">
        <div className="carbon-form-head">
          <p className="eyebrow">Form 7-1 · service request</p>
          <p className="eyebrow text-ink-muted">triplicate · white / yellow / pink</p>
        </div>

        <div className="carbon-fields">
          <div className="carbon-field">
            <label htmlFor="service-name">name</label>
            <input
              id="service-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={120}
              placeholder="who is asking"
            />
          </div>

          <div className="carbon-field">
            <label htmlFor="service-email">email</label>
            <input
              id="service-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="where to reply"
            />
          </div>

          <div className="carbon-field">
            <label htmlFor="service-subject">subject</label>
            <input
              id="service-subject"
              name="subject"
              type="text"
              required
              maxLength={200}
              placeholder="what this is about"
            />
          </div>

          <div className="carbon-field">
            <label htmlFor="service-priority">priority</label>
            <select id="service-priority" name="priority" defaultValue="normal">
              <option value="low">low — whenever there is time</option>
              <option value="normal">normal — a normal request</option>
              <option value="machine is smoking">machine is smoking</option>
            </select>
          </div>

          <div className="carbon-field carbon-field-wide">
            <label htmlFor="service-message">message</label>
            <textarea
              id="service-message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              placeholder="plain text is enough"
            />
          </div>
        </div>

        <div className="carbon-actions">
          <button type="submit" className="carbon-submit" disabled={!canSend || status === "sending"}>
            {status === "sending"
              ? "filing…"
              : configured
                ? "file request"
                : email
                  ? "compose request"
                  : "channel not connected"}
          </button>

          <p id="service-channel" className="eyebrow max-w-[42ch] text-ink-muted">
            {configured
              ? "Posts to the configured delivery endpoint. Nothing is stored on this site."
              : email
                ? "No server endpoint is configured, so this opens your mail app with the request. Nothing is stored on this site."
                : "No delivery endpoint or email is configured yet. Nothing can be sent from this form."}
          </p>
        </div>

        <div className="carbon-status" aria-live="polite">
          {status === "sent" ? (
            <div className="carbon-receipt">
              <div>
                <p className="eyebrow text-ink-muted">request received · ticket</p>
                <p className="display mt-1 text-2xl">{ticket}</p>
                <p className="mt-2 max-w-[46ch] text-sm text-ink-muted">
                  {delivery === "mailto"
                    ? "Your mail app should hold the request now. The ticket number is in the subject line."
                    : "Keep the ticket number. A reply goes to the email address you supplied."}
                </p>
              </div>
              <span className="stamp stamp-in" data-tone="resolved">
                approved
              </span>
            </div>
          ) : null}

          {status === "error" && error ? (
            <div className="carbon-error" role="status">
              <p className="eyebrow text-accent">not sent</p>
              <p className="mt-1 text-sm">{error}</p>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="mt-2 inline-block border-b border-accent text-sm hover:text-accent"
                >
                  write to {email}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
