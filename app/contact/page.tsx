import type { Metadata } from "next";

import { ServiceForm } from "@/components/service-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Service Request",
  description: "How to reach Bianka: plain text, no ticket queue.",
};

export default function ContactPage() {
  const configured = Boolean(process.env.SERVICE_REQUEST_ENDPOINT);

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-12 md:px-12 md:pt-16">
      <p className="eyebrow text-ink-muted">Section 7.0 · Page 7-1</p>
      <h1 className="display mt-3 text-[clamp(2.5rem,8vw,6rem)]">Service Request</h1>
      <p className="mt-5 max-w-[54ch] text-lg">
        No ticket queue, no account, no automated reply. If something here needs
        a reply, plain text is enough.
      </p>

      <section aria-labelledby="direct-line" className="mt-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="border border-ink/45">
              <div className="flex items-baseline justify-between border-b border-ink/35 px-4 py-2.5">
                <h2 id="direct-line" className="label text-xs">
                  Direct line
                </h2>
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
                        [ pending — add site.email in content/site.ts ]
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

          <div className="md:col-span-4 md:col-start-9">
            <div className="notice px-4 py-3">
              <p className="label text-[10px] text-ink-muted">Note</p>
              <p className="mt-1 text-sm">
                No message is stored on this site. The form below only files a
                request when a delivery channel is connected; otherwise use the
                email at left.
              </p>
            </div>
            <p className="eyebrow mt-4 text-ink-muted">
              channel: {configured ? "connected" : "not connected"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="service-form-title">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 id="service-form-title" className="display text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Carbon-copy request
            </h2>
            <p className="mt-2 max-w-[52ch] text-ink-muted">
              Three sheets, one request. Fill in the top copy; the yellow and pink
              stay behind it.
            </p>
          </div>
          <p className="eyebrow text-ink-muted">Fig. 7-1</p>
        </div>

        <ServiceForm email={site.email} configured={configured} />
      </section>
    </div>
  );
}
