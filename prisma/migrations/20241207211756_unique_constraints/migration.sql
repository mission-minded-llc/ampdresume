/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[skillForUserId,projectId]` on the table `SkillForProject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,skillId]` on the table `SkillForUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SkillForProject_skillForUserId_projectId_key" ON "SkillForProject"("skillForUserId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillForUser_userId_skillId_key" ON "SkillForUser"("userId", "skillId");
