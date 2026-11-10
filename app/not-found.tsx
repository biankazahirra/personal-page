import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center px-6 py-32 md:px-12">
      <p className="eyebrow text-ink-muted">ERROR 404 - socket not found</p>
      <h1 tabIndex={-1} className="display mt-6 max-w-[18ch] text-[clamp(2.5rem,8vw,6rem)]">
        Page missing from manual.
      </h1>
      <p className="mt-6 max-w-[42ch] text-ink-muted">
        Probably lost in a footnote. The rest of the site is still where you left
        it.
      </p>
      <Link
        href="/"
        className="eyebrow mt-10 inline-block w-fit border-b border-accent pb-1 hover:text-accent"
      >
        back to the index
      </Link>
    </section>
  );
}
