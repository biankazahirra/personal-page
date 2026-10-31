import { ImageResponse } from "next/og";

import { projects } from "@/content/projects";
import { OgCard, ogContentType, ogSize } from "@/lib/og-card";

type Params = { params: Promise<{ slug: string }> };

export const alt = "A project record printed as a page from a service manual.";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`section 6 · part ${project?.partNo ?? "BZ-06"}`}
        title={project?.title ?? "Projects"}
        subtitle={project?.summary ?? "An illustrated parts list of things I made."}
        meta={(project?.stack ?? ["illustrated parts list"]).join(" · ")}
      />
    ),
    size,
  );
}
