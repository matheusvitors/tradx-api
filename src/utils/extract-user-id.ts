import { jwt } from "@/infra/adapters/jwt"

export const extractUserId = (token: string | undefined): string => {
	if(token) {
		return jwt.verify(token).id;
	} else {
		throw new Error("Token inválido!");
	}
}
