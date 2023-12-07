-- CreateTable
CREATE TABLE "Commentary" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "value" VARCHAR(500),

    CONSTRAINT "Commentary_pkey" PRIMARY KEY ("userId","gameId")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "reviewTypeId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("userId","gameId","reviewTypeId")
);

-- CreateTable
CREATE TABLE "ReviewType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "ReviewType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "value" BOOLEAN DEFAULT true,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("userId","gameId","tagId")
);

-- CreateTable
CREATE TABLE "TagType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "TagType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" CHAR(32) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "commentary_ibfk_1" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "commentary_ibfk_2" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "review_ibfk_1" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "review_ibfk_2" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "review_ibfk_3" FOREIGN KEY ("reviewTypeId") REFERENCES "ReviewType"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "tag_ibfk_1" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "tag_ibfk_2" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "tag_ibfk_3" FOREIGN KEY ("tagId") REFERENCES "TagType"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
