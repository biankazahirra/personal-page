import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center px-6 py-32 md:px-12">
      <p className="eyebrow text-ink-muted">404 — nothing here</p>
      <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.5rem,8vw,6rem)]">
        This page went quiet.
      </h1>
      <p className="mt-6 max-w-[42ch] text-ink-muted">
        Either it moved, or it never existed. Both happen. The rest of the site is
        still where you left it.
      </p>
      <Link
        href="/"
        className="eyebrow mt-10 inline-block w-fit border-b border-accent pb-1 hover:text-accent"
      >
        back to the beginning
      </Link>
    </section>
  );
}
