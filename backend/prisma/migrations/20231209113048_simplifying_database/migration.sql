/*
  Warnings:

  - You are about to drop the `Commentary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Commentary" DROP CONSTRAINT "commentary_ibfk_1";

-- DropForeignKey
ALTER TABLE "Commentary" DROP CONSTRAINT "commentary_ibfk_2";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "review_ibfk_1";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "review_ibfk_2";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "review_ibfk_3";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "tag_ibfk_1";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "tag_ibfk_2";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "tag_ibfk_3";

-- DropTable
DROP TABLE "Commentary";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "ReviewType";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagType";

-- CreateTable
CREATE TABLE "Grade" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "reviewTypeId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("userId","gameId","reviewTypeId")
);

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "review_ibfk_1" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "review_ibfk_2" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
