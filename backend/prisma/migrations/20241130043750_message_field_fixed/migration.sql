/*
  Warnings:

  - Added the required column `reciverId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "reciverId" INTEGER NOT NULL,
ADD COLUMN     "sentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sentId_fkey" FOREIGN KEY ("sentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_reciverId_fkey" FOREIGN KEY ("reciverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
