-- AlterTable
ALTER TABLE `ativo` ADD COLUMN `multiplicador` DECIMAL(7, 2) NOT NULL DEFAULT 1.00;

-- AlterTable
ALTER TABLE `conta` MODIFY `saldo` DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    MODIFY `saldoInicial` DECIMAL(15, 2) NOT NULL DEFAULT 0.00;
