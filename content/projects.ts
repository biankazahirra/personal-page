import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "hallistic",
    title: "Hallistic",
    partNo: "BZ-06-01",
    year: "2024",
    summary:
      "A building-booking information website, built as an academic project with a small team.",
    role: "Interface design and front-end build",
    stack: ["HTML", "JavaScript", "Tailwind CSS", "PHP", "MySQL", "Figma"],
    status: "shipped",
    body: [
      "Hallistic is an information website for booking buildings. It started as an academic project: design the interface, then make it real.",
      "The visual work happened in Figma first, then moved into HTML, Tailwind CSS and JavaScript, with PHP and MySQL behind it.",
      "What stayed with me is how much of the work is deciding what a form should ask, not how it should look.",
    ],
    procedure: {
      problem:
        "A building-booking site had to exist, and the interface had to be drawn before it could be built.",
      build:
        "Figma first, then HTML, Tailwind CSS and JavaScript, with PHP and MySQL behind it.",
      lesson:
        "How much of the work is deciding what a form should ask, not how it should look.",
    },
    schematic: [
      {
        label: "Figma",
        role: "Interfaces drawn before anything was built.",
        step: "The interface is drawn before anything is built.",
      },
      {
        label: "HTML, Tailwind CSS, JavaScript",
        role: "The front end I built from those drawings.",
        step: "Those drawings become pages the browser can use.",
      },
      {
        label: "PHP",
        role: "Handles the booking requests.",
        step: "A request reaches the server and PHP handles it.",
      },
      {
        label: "MySQL",
        role: "Holds the records.",
        step: "The booking is stored as a record.",
      },
    ],
  },
  {
    slug: "proplan",
    title: "PROPLAN",
    partNo: "BZ-06-02",
    year: "2024",
    summary:
      "A project-planning information system in Java and MySQL. I led the team that built it.",
    role: "Team lead, backend",
    stack: ["Java", "MySQL"],
    status: "shipped",
    body: [
      "PROPLAN keeps project plans in one place instead of scattered across documents.",
      "I led the team and worked on the system itself: Java for the application, MySQL for the data.",
      "The hardest part was not the code. It was agreeing, early, on what a plan actually is.",
    ],
    procedure: {
      problem: "Project plans were scattered across documents instead of kept in one place.",
      build:
        "A Java application with MySQL for the data. I led the team and worked on the system itself.",
      lesson:
        "The hardest part was not the code. It was agreeing, early, on what a plan actually is.",
    },
    schematic: [
      {
        label: "Java application",
        role: "Where plans are written, read and changed.",
        step: "A plan is written, read or changed in the Java application.",
      },
      {
        label: "MySQL",
        role: "One store for plans that used to be scattered.",
        step: "The plan is saved in one store instead of scattered documents.",
      },
    ],
  },
  {
    slug: "purchase-requisition-forms",
    title: "Digital purchase requisition forms",
    partNo: "BZ-06-03",
    year: "2025",
    summary:
      "Microsoft Access forms that replaced a slower paper habit for purchase requisitions at work.",
    role: "Built and maintain it",
    stack: ["Microsoft Access"],
    status: "shipped",
    cover: {
      src: "/images/projects/purchase-requisition-form.png",
      alt: "The Access form: recipient, sender, subject and date fields, a budget detail table on the right, and print buttons.",
      width: 1295,
      height: 627,
    },
    body: [
      "Purchase requisitions used to move through documents that had to be rewritten every time.",
      "I built digital forms in Microsoft Access so the same information is entered once and reused.",
      "It is not glamorous work. It does return time every month, and that is the point.",
    ],
    procedure: {
      problem:
        "Purchase requisitions moved through documents that had to be rewritten every time.",
      build:
        "Digital forms in Microsoft Access, so the same information is entered once and reused.",
      lesson:
        "It is not glamorous work, but it returns time every month, and that is the point.",
    },
    schematic: [
      {
        label: "Access form",
        role: "The request is entered once, on screen.",
        step: "The request is entered once, on screen.",
      },
      {
        label: "Shared record",
        role: "The same information is reused instead of rewritten.",
        step: "The record is reused, so nothing is rewritten.",
      },
    ],
  },
  {
    slug: "lhstp-workflow",
    title: "LHSTP form workflow",
    partNo: "BZ-06-04",
    year: "2026",
    summary:
      "A digital workflow for LHSTP forms, still being built in Microsoft Access.",
    role: "Sole builder",
    stack: ["Microsoft Access"],
    status: "in-progress",
    body: [
      "The LHSTP paperwork is the next thing to move off paper.",
      "This one is unfinished: the forms work, the workflow around them is still being shaped.",
    ],
    procedure: {
      problem: "The LHSTP paperwork was still moving on paper.",
      build: "Digital forms in Microsoft Access. The forms work and are in use.",
      lesson:
        "The workflow around the forms is still being shaped, so this one stays unfinished in public.",
    },
    schematic: [
      {
        label: "Forms",
        role: "Built, and in use.",
        step: "The forms are built and in use.",
      },
      {
        label: "Workflow",
        role: "Still being shaped around the forms.",
        step: "The workflow around the forms is still being shaped.",
      },
    ],
  },
  {
    slug: "this-site",
    title: "This site",
    partNo: "BZ-06-05",
    year: "2026",
    summary:
      "A personal page treated as an editorial object rather than a portfolio template.",
    role: "Design and build",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "in-progress",
    body: [
      "This page is a place to keep things that do not belong in a CV: notes, films, songs, half-finished experiments.",
      "The structure is deliberately boring. Content lives in plain TypeScript files, so adding a note never means touching a layout.",
    ],
    procedure: {
      problem:
        "Notes, films, songs and half-finished experiments had nowhere to live that was not a CV.",
      build:
        "Next.js and TypeScript, with content in plain TypeScript files so adding a note never means touching a layout.",
      lesson:
        "The structure is deliberately boring. Being able to add something on a Tuesday matters more than looking clever.",
    },
    schematic: [
      {
        label: "Content files",
        role: "Plain TypeScript, one file per kind of thing.",
        step: "A content file is edited: a note, a project, a journal entry.",
      },
      {
        label: "Next.js",
        role: "Turns those files into pages.",
        step: "Next.js reads the files and renders the pages.",
      },
      {
        label: "Static pages",
        role: "What you are reading.",
        step: "The page you are reading is the result.",
      },
    ],
  },
];
