-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_id_key`(`id`),
    UNIQUE INDEX `Usuario_username_key`(`username`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conta` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `saldo` DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    `saldoInicial` DECIMAL(15, 2) NOT NULL DEFAULT 0.00,

    UNIQUE INDEX `Conta_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ativo` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `acronimo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `multiplicador` DECIMAL(7, 2) NOT NULL DEFAULT 1.00,
    `dataVencimento` DATETIME(3) NULL,

    UNIQUE INDEX `Ativo_id_key`(`id`),
    UNIQUE INDEX `Ativo_acronimo_key`(`acronimo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operacao` (
    `id` VARCHAR(191) NOT NULL,
    `ativoId` VARCHAR(191) NOT NULL,
    `contaId` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `precoEntrada` INTEGER NOT NULL,
    `stopLoss` INTEGER NOT NULL,
    `alvo` INTEGER NOT NULL,
    `precoSaida` INTEGER NULL,
    `dataEntrada` DATETIME(3) NOT NULL,
    `dataSaida` DATETIME(3) NULL,
    `margem` DECIMAL(65, 30) NULL,
    `operacaoPerdida` BOOLEAN NOT NULL,
    `operacaoErrada` BOOLEAN NOT NULL,
    `motivo` VARCHAR(191) NULL,
    `comentarios` VARCHAR(191) NULL,

    UNIQUE INDEX `Operacao_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_ativoId_fkey` FOREIGN KEY (`ativoId`) REFERENCES `Ativo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
