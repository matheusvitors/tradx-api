-- CreateTable
CREATE TABLE `Ativo` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `acronimo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Ativo_id_key`(`id`),
    UNIQUE INDEX `Ativo_acronimo_key`(`acronimo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
