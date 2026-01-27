/*
  Warnings:

  - You are about to drop the column `position` on the `Job` table. All the data in the column will be lost.
  - Added the required column `employmentType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('BOOKMARK', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN');

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_userId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "position",
ADD COLUMN     "ceo" TEXT,
ADD COLUMN     "companyIntro" TEXT,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "employees" INTEGER,
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "jobUrl" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "other" JSONB,
ADD COLUMN     "salary" TEXT,
ADD COLUMN     "workLocation" TEXT,
ADD COLUMN     "year" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "JobStatus" NOT NULL;

-- CreateIndex
CREATE INDEX "Job_userId_idx" ON "Job"("userId");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
