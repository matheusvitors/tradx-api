/*
  Warnings:

  - You are about to alter the column `precoEntrada` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `stopLoss` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `alvo` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `precoSaida` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `operacao` MODIFY `precoEntrada` DECIMAL(65, 30) NULL,
    MODIFY `stopLoss` DECIMAL(65, 30) NULL,
    MODIFY `alvo` DECIMAL(65, 30) NULL,
    MODIFY `precoSaida` DECIMAL(65, 30) NULL;
