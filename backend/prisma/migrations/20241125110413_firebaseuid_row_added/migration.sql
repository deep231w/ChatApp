-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firebaseuid" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
