export interface ContaDTO {
    id: string;
	nome: string;
	tipo: string;
	saldoInicial: number;
	saldo?: number;
	usuarioId: string;
}
