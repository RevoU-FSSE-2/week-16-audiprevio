-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "createdById" DROP NOT NULL,
ALTER COLUMN "createdById" DROP DEFAULT;