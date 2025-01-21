/*
  Warnings:

  - A unique constraint covering the columns `[firebaseuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `firebaseuid` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firebaseuid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseuid_key" ON "User"("firebaseuid");
