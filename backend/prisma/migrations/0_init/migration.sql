-- CreateTable
CREATE TABLE `Commentary` (
    `userId` INTEGER NOT NULL,
    `gameId` INTEGER NOT NULL,
    `value` VARCHAR(500) NULL,

    INDEX `gameId`(`gameId`),
    PRIMARY KEY (`userId`, `gameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `userId` INTEGER NOT NULL,
    `gameId` INTEGER NOT NULL,
    `reviewTypeId` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,

    INDEX `gameId`(`gameId`),
    INDEX `reviewTypeId`(`reviewTypeId`),
    PRIMARY KEY (`userId`, `gameId`, `reviewTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `userId` INTEGER NOT NULL,
    `gameId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `value` BOOLEAN NULL DEFAULT true,

    INDEX `gameId`(`gameId`),
    INDEX `tagId`(`tagId`),
    PRIMARY KEY (`userId`, `gameId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Commentary` ADD CONSTRAINT `commentary_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Commentary` ADD CONSTRAINT `commentary_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `review_ibfk_3` FOREIGN KEY (`reviewTypeId`) REFERENCES `ReviewType`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `tag_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `tag_ibfk_3` FOREIGN KEY (`tagId`) REFERENCES `TagType`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

