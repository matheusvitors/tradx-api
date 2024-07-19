/*
  Warnings:

  - The primary key for the `ativo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publicId` on the `ativo` table. All the data in the column will be lost.
  - The primary key for the `conta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publicId` on the `conta` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publicId` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Ativo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Conta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `conta` DROP FOREIGN KEY `Conta_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `operacao` DROP FOREIGN KEY `Operacao_ativoId_fkey`;

-- DropForeignKey
ALTER TABLE `operacao` DROP FOREIGN KEY `Operacao_contaId_fkey`;

-- DropIndex
DROP INDEX `Ativo_publicId_key` ON `ativo`;

-- DropIndex
DROP INDEX `Conta_publicId_key` ON `conta`;

-- DropIndex
DROP INDEX `Usuario_publicId_key` ON `usuario`;

-- AlterTable
ALTER TABLE `ativo` DROP PRIMARY KEY,
    DROP COLUMN `publicId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `conta` DROP PRIMARY KEY,
    DROP COLUMN `publicId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `usuarioId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `operacao` MODIFY `ativoId` VARCHAR(191) NOT NULL,
    MODIFY `contaId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `publicId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Ativo_id_key` ON `Ativo`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Conta_id_key` ON `Conta`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_id_key` ON `Usuario`(`id`);

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_ativoId_fkey` FOREIGN KEY (`ativoId`) REFERENCES `Ativo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
