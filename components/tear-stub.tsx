"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The perforation under the email address. Tearing it copies the address and
 * plays the stub animation; the copy is the point, the tear is the receipt.
 */
export function TearStub({ email }: { email: string }) {
  const [torn, setTorn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function tear() {
    let ok = false;

    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      // Clipboard API is missing on insecure origins and old Safari.
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      ok = document.execCommand("copy");
      field.remove();
    }

    setTorn(true);
    setCopied(ok);
    setMessage(
      ok ? "Address copied to the clipboard." : "Copy failed. Long press the address instead.",
    );

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setTorn(false);
      setMessage("");
    }, 3200);
  }

  return (
    <div className="footer-stub" data-torn={torn ? "" : undefined}>
      <p className="footer-stub-k">Direct line · keep this stub</p>

      <a
        className="footer-stub-mail mt-1 inline-block border-b border-accent pb-0.5 text-lg hover:text-accent"
        href={`mailto:${email}`}
      >
        {email}
      </a>

      <div className="footer-stub-tear">
        <button
          type="button"
          className="footer-tear-btn"
          onClick={tear}
          aria-label="Tear off the address and copy it"
        >
          <span className="footer-tear-dash" aria-hidden="true" />
          <span className="footer-tear-label" aria-hidden="true">
            tear here
          </span>
        </button>

        <span className="footer-stub-stamp" aria-hidden="true">
          {copied ? "copied" : "copy failed"}
        </span>
      </div>

      <p className="sr-only" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
