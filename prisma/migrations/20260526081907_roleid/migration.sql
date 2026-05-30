/*
  Warnings:

  - Made the column `accountType` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `roleId` INTEGER NULL,
    MODIFY `accountType` VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
