CREATE TABLE `ativo` (
	`id` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`acronimo` varchar(255) NOT NULL,
	`tipo` varchar(255) NOT NULL,
	`multiplicador` int NOT NULL DEFAULT 1,
	`divider` int NOT NULL DEFAULT 0,
	`dataVencimento` date,
	CONSTRAINT `ativo_id` PRIMARY KEY(`id`),
	CONSTRAINT `ativo_id_unique` UNIQUE(`id`),
	CONSTRAINT `ativo_acronimo_unique` UNIQUE(`acronimo`)
);
--> statement-breakpoint
CREATE TABLE `conta` (
	`id` varchar(255) NOT NULL,
	`usuarioId` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`tipo` varchar(255) NOT NULL,
	`saldo` int NOT NULL DEFAULT 0,
	`saldoInicial` int NOT NULL DEFAULT 0,
	CONSTRAINT `conta_id` PRIMARY KEY(`id`),
	CONSTRAINT `conta_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `operacao` (
	`id` varchar(255) NOT NULL,
	`ativoId` varchar(255) NOT NULL,
	`contaId` varchar(255) NOT NULL,
	`regraEntradaId` varchar(255) NOT NULL,
	`quantidade` int NOT NULL DEFAULT 1,
	`tipo` varchar(100) NOT NULL,
	`precoEntrada` int NOT NULL,
	`stopLoss` int,
	`alvo` int,
	`precoSaida` int,
	`dataEntrada` datetime NOT NULL,
	`dataSaida` datetime,
	`operacaoPerdida` boolean NOT NULL DEFAULT false,
	`operacaoErrada` boolean NOT NULL DEFAULT false,
	`comentarios` text,
	CONSTRAINT `operacao_id` PRIMARY KEY(`id`),
	CONSTRAINT `operacao_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `regra_entrada` (
	`id` varchar(255) NOT NULL,
	`tradingPlanId` varchar(255) NOT NULL,
	`nome` text NOT NULL,
	CONSTRAINT `regra_entrada_id` PRIMARY KEY(`id`),
	CONSTRAINT `regra_entrada_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `trading_plan` (
	`id` varchar(255) NOT NULL,
	`usuarioId` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`link` text,
	CONSTRAINT `trading_plan_id` PRIMARY KEY(`id`),
	CONSTRAINT `trading_plan_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `usuario` (
	`id` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `usuario_id` PRIMARY KEY(`id`),
	CONSTRAINT `usuario_id_unique` UNIQUE(`id`),
	CONSTRAINT `usuario_username_unique` UNIQUE(`username`),
	CONSTRAINT `usuario_email_unique` UNIQUE(`email`)
);
