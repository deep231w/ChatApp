-- DropIndex
DROP INDEX "User_firebaseuid_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firebaseuid" DROP NOT NULL;
