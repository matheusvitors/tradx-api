/*
  Warnings:

  - You are about to alter the column `margem` on the `operacao` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `operacao` MODIFY `margem` DECIMAL(65, 30) NULL;
