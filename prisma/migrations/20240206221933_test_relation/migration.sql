/*
  Warnings:

  - Added the required column `usuarioId` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaId` to the `Operacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `conta` ADD COLUMN `usuarioId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `operacao` ADD COLUMN `contaId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
