-- AlterTable
ALTER TABLE `ativo` MODIFY `dataVencimento` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `operacao` MODIFY `dataEntrada` VARCHAR(191) NOT NULL,
    MODIFY `dataSaida` VARCHAR(191) NULL;
