import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Lucas Bernalte",
  EMAIL: "hola@lucasbernalte.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 1,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Desarrollador Frontend, JavaScript, React.",
  IMAGE: "/thumbnails/home.png",
};

export const BLOG: Metadata = {
  TITLE: "Lucas Bernalte's Blog",
  DESCRIPTION: "My collection of writings.",
  IMAGE: "/thumbnails/home.png",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "twitter",
    HREF: "https://twitter.com/lucasbernalte",
  },
  {
    NAME: "github",
    HREF: "https://github.com/lucbpz",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/lucasbernalte",
  },
];
