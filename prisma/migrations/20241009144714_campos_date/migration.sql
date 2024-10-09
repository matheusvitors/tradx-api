/*
  Warnings:

  - You are about to alter the column `dataVencimento` on the `ativo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `dataEntrada` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `dataSaida` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `ativo` MODIFY `dataVencimento` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `operacao` MODIFY `dataEntrada` DATETIME(3) NOT NULL,
    MODIFY `dataSaida` DATETIME(3) NULL;
