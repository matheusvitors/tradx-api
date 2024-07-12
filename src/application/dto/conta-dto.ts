export interface ContaDTO {
    id?: number;
    publicId: string;
	nome: string;
	tipo: string;
	saldoInicial: number;
	saldo?: number;
	usuarioId: string;
}
