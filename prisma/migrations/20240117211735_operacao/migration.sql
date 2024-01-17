/*
  Warnings:

  - Added the required column `tipo` to the `Ativo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ativo` ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Operacao` (
    `id` VARCHAR(191) NOT NULL,
    `ativoId` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `precoEntrada` INTEGER NOT NULL,
    `stopLoss` INTEGER NOT NULL,
    `alvo` INTEGER NOT NULL,
    `precoSaida` INTEGER NOT NULL,
    `dataEntrada` DATETIME(3) NOT NULL,
    `dataSaida` DATETIME(3) NOT NULL,
    `margem` INTEGER NOT NULL,
    `operacaoPerdida` BOOLEAN NOT NULL,
    `operacaoErrada` BOOLEAN NOT NULL,
    `motivo` VARCHAR(191) NULL,
    `comentarios` VARCHAR(191) NULL,

    UNIQUE INDEX `Operacao_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_ativoId_fkey` FOREIGN KEY (`ativoId`) REFERENCES `Ativo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
