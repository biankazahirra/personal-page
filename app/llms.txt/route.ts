import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biankazahirra.vercel.app";

export function GET() {
  const text = `# ${site.fullName} — service manual

> ${site.tagline} A personal site printed as a vintage service manual: notes, films, songs on repeat, small systems, and an ukulele still being learned.

Canonical: ${baseUrl}
Language: English. An Indonesian edition is in translation; no Indonesian copy has been invented yet.
Contact: ${site.email}

## Sections

- ${baseUrl}/ — identification, contents, exploded view, assembly board
- ${baseUrl}/about — specifications, revision history, tool rack
- ${baseUrl}/curiosity — maintenance logbook of notes and faults
- ${baseUrl}/life — inspection photos, film strip, loop counter, tuner
- ${baseUrl}/films — indicator panel of film notes
- ${baseUrl}/projects — illustrated parts list
- ${baseUrl}/contact — service request in plain text and a triplicate form

## Project records

${projects
  .map(
    (project) =>
      `- ${baseUrl}/projects/${project.slug} — ${project.title}: ${project.summary}`,
  )
  .join("\n")}

## Notes on content

This site does not invent biographical facts, metrics, screenshots, or quotes. Missing material is marked in the manual as pending instead of filled in. The hidden field-kit parts are decorative; they are not required to read or navigate the site.
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
