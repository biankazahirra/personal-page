import type { MetadataRoute } from "next";

import { journal } from "@/content/journal";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biankazahirra.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/curiosity", "/life", "/films", "/projects", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...notes
      .filter((note) => note.body)
      .map((note) => ({
        url: `${baseUrl}/curiosity/${note.slug}`,
        lastModified: note.date ? new Date(note.date) : new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ...journal
      .filter((entry) => entry.body)
      .map((entry) => ({
        url: `${baseUrl}/life/${entry.slug}`,
        lastModified: new Date(entry.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
