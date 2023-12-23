/*
  Warnings:

  - Changed the type of `like` on the `Like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "like",
ADD COLUMN     "like" BOOLEAN NOT NULL;
