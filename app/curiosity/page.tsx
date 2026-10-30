import type { Metadata } from "next";

import { NotesBoard } from "@/components/notes-board";
import { PageHeader } from "@/components/page-header";
import { notes } from "@/content/notes";

export const metadata: Metadata = {
  title: "Curiosity",
  description:
    "Notes from testing AI agents, writing small scripts, and learning things in public.",
};

export default function CuriosityPage() {
  return (
    <>
      <PageHeader
        code="C03"
        name="curiosity"
        title="Notes from the open tabs."
        lede="Things I tried, what broke, and what I would do differently. Written while it is still fresh, not after it has become a nice story."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12">
        <NotesBoard notes={notes} />
      </section>
    </>
  );
}
