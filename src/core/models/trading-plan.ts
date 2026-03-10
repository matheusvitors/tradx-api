import { Usuario } from "@/core/models/usuario";

export interface TradingPlan {
	id: string;
	usuario: Usuario;
	usuarioId?: string;
	nome: string;
	link?: string;
}
