/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ativo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ativo` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `conta` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `conta` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `operacao` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `operacao` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ativo` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `conta` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `operacao` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
