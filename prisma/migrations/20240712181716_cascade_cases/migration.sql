-- DropForeignKey
ALTER TABLE `conta` DROP FOREIGN KEY `Conta_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `operacao` DROP FOREIGN KEY `Operacao_ativoId_fkey`;

-- DropForeignKey
ALTER TABLE `operacao` DROP FOREIGN KEY `Operacao_contaId_fkey`;

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_ativoId_fkey` FOREIGN KEY (`ativoId`) REFERENCES `Ativo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
