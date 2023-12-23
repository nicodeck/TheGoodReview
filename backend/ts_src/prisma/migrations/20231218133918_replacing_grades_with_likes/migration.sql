/*
  Warnings:

  - You are about to drop the `Grade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_gameId_fkey";

-- DropTable
DROP TABLE "Grade";

-- CreateTable
CREATE TABLE "Like" (
    "authorId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "like" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("authorId","gameId")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
