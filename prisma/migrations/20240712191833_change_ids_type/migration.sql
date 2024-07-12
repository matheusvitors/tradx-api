/*
  Warnings:

  - The primary key for the `ativo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ativo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `conta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `conta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `usuarioId` on the `conta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `ativoId` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `contaId` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[publicId]` on the table `Ativo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `Conta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicId` to the `Ativo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `conta` DROP FOREIGN KEY `Conta_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `operacao` DROP FOREIGN KEY `Operacao_ativoId_fkey`;

-- DropForeignKey
ALTER TABLE `operacao` DROP FOREIGN KEY `Operacao_contaId_fkey`;

-- DropIndex
DROP INDEX `Ativo_id_key` ON `ativo`;

-- DropIndex
DROP INDEX `Conta_id_key` ON `conta`;

-- DropIndex
DROP INDEX `Usuario_id_key` ON `usuario`;

-- AlterTable
ALTER TABLE `ativo` DROP PRIMARY KEY,
    ADD COLUMN `publicId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `conta` DROP PRIMARY KEY,
    ADD COLUMN `publicId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `usuarioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `operacao` MODIFY `ativoId` INTEGER NOT NULL,
    MODIFY `contaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    ADD COLUMN `publicId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Ativo_publicId_key` ON `Ativo`(`publicId`);

-- CreateIndex
CREATE UNIQUE INDEX `Conta_publicId_key` ON `Conta`(`publicId`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_publicId_key` ON `Usuario`(`publicId`);

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_ativoId_fkey` FOREIGN KEY (`ativoId`) REFERENCES `Ativo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
