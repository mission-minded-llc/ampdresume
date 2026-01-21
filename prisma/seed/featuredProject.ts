/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { prisma } from "@/lib/prisma";
import { sanitizeHtmlServer } from "@/lib/secureHtmlParser";
import { getTestUserIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";

export async function seedFeaturedProjects() {
  logTitle("Seeding Demo Featured Projects");

  const testUserIds = await getTestUserIds();

  const featuredProjects = [
    {
      name: "E-Commerce Platform",
      description:
        "<p>A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing, and order management.</p>",
      links: [
        { label: "GitHub", url: "https://www.github.com/" },
        { label: "Live Demo", url: "https://www.example.com" },
      ],
    },
    {
      name: "Task Management API",
      description:
        "<p>RESTful API for task management built with Express.js and MongoDB. Includes features for creating, updating, and organizing tasks with user authentication and authorization.</p>",
      links: [{ label: "GitHub", url: "https://www.github.com/" }],
    },
    {
      name: "Portfolio Website",
      description:
        "<p>A responsive portfolio website showcasing my projects and skills. Built with Next.js, TypeScript, and Tailwind CSS. Features include dark mode, smooth animations, and SEO optimization.</p>",
      links: [
        { label: "GitHub", url: "https://www.github.com/" },
        { label: "Website", url: "https://www.example.com" },
      ],
    },
  ];

  for (const userId of testUserIds) {
    console.log(`Deleting existing featured projects for user ${userId}`);
    await prisma.featuredProject.deleteMany({
      where: {
        userId,
      },
    });

    for (const featuredProject of featuredProjects) {
      const createdProject = await prisma.featuredProject.create({
        data: {
          userId,
          name: featuredProject.name,
          description: sanitizeHtmlServer(featuredProject.description),
          links: featuredProject.links as unknown as object,
        },
      });
      console.log(
        `Created featured project ${featuredProject.name} for user ${userId} with id: ${createdProject.id}`,
      );
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedFeaturedProjects().catch((e) => {
    throw e;
  });
}
