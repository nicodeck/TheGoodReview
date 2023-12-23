/*
  Warnings:

  - The primary key for the `Grade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reviewTypeId` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Grade` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "review_ibfk_1";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "review_ibfk_2";

-- AlterTable
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_pkey",
DROP COLUMN "reviewTypeId",
DROP COLUMN "userId",
DROP COLUMN "value",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "grade" INTEGER NOT NULL,
ADD CONSTRAINT "Grade_pkey" PRIMARY KEY ("authorId", "gameId");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
