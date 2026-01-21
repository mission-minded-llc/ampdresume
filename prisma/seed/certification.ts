/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { prisma } from "@/lib/prisma";
import { getTestUserIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";

export async function seedCertifications() {
  logTitle("Seeding Demo Certifications");

  const testUserIds = await getTestUserIds();

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      dateAwarded: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      credentialUrl: "https://www.credly.com/org/aws-community/badge/aws-cloud-club-captain",
      credentialId: "AWS-SA-12345",
    },
    {
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud Platform",
      dateAwarded: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
      credentialUrl: "https://www.credly.com/org/o-reilly-media/badge/devops-on-gcp",
      credentialId: "GCP-PCA-67890",
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      dateAwarded: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      credentialUrl: null,
      credentialId: "CKA-2023-ABC",
    },
  ];

  for (const userId of testUserIds) {
    console.log(`Deleting existing certifications for user ${userId}`);
    await prisma.certification.deleteMany({
      where: {
        userId,
      },
    });

    for (const certification of certifications) {
      const createdCertification = await prisma.certification.create({
        data: {
          userId,
          ...certification,
        },
      });
      console.log(
        `Created certification ${certification.name} for user ${userId} with id: ${createdCertification.id}`,
      );
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedCertifications().catch((e) => {
    throw e;
  });
}
