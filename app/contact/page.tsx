import type { Metadata } from "next";

import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Service Request",
  description: "How to reach Bianka: plain text, no ticket queue.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-12 md:px-12 md:pt-16">
      <p className="eyebrow text-ink-muted">Section 7.0 · Page 7-1</p>
      <h1 className="display mt-3 text-[clamp(2.5rem,8vw,6rem)]">Service Request</h1>
      <p className="mt-5 max-w-[54ch] text-lg">
        No ticket queue, no priority dropdown. If something here needs a reply,
        plain text is enough.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="border border-ink/45">
            <div className="flex items-baseline justify-between border-b border-ink/35 px-4 py-2.5">
              <p className="label text-xs">Direct line</p>
              <p className="eyebrow text-ink-muted">Form 2026-A</p>
            </div>
            <dl className="divide-y divide-ink/20">
              <div className="px-4 py-3">
                <dt className="label text-[10px] text-ink-muted">Email</dt>
                <dd className="mt-1">
                  {site.email ? (
                    <a
                      href={`mailto:${site.email}`}
                      className="border-b border-accent pb-0.5 hover:text-accent"
                    >
                      {site.email}
                    </a>
                  ) : (
                    <span className="border border-dashed border-ink/45 px-2 py-1 text-sm text-ink-muted">
                      [ pending — add to content/site.ts ]
                    </span>
                  )}
                </dd>
              </div>
              {site.links.map((link) => (
                <div key={link.label} className="px-4 py-3">
                  <dt className="label text-[10px] text-ink-muted">{link.label}</dt>
                  <dd className="mt-1">
                    {link.href ? (
                      <a
                        href={link.href}
                        rel="noreferrer noopener"
                        target="_blank"
                        className="border-b border-ink/30 pb-0.5 hover:border-accent hover:text-accent"
                      >
                        {link.href.replace(/^https?:\/\//, "")}
                      </a>
                    ) : (
                      <span className="text-sm text-ink-muted">
                        [ not supplied yet ]
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="border border-dashed border-ink/45 bg-paper-2/40 px-5 py-8">
            <p className="eyebrow text-ink-muted">Fig. 7-1</p>
            <h2 className="display mt-2 text-2xl">Carbon-copy request form</h2>
            <p className="mt-3 max-w-[44ch] text-sm text-ink-muted">
              [ form pending — built in Phase 3. Until then, use the email
              address at left. ]
            </p>
          </div>
          <div className="notice mt-6 px-4 py-3">
            <p className="label text-[10px] text-ink-muted">Note</p>
            <p className="mt-1 text-sm">
              No message is stored on this site. Nothing is sent without you
              pressing send.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
