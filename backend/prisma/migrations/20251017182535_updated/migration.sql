-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('GOOGLE', 'PASSWORD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authType" "AuthType" NOT NULL DEFAULT 'PASSWORD',
ALTER COLUMN "firebaseuid" DROP NOT NULL;
