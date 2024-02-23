import { JwtError } from "@/application/errors";
import { JWT_EXPIRE, SECRET } from "@/infra/config/environment";
import Jwt, { JwtPayload } from "jsonwebtoken";

interface JwtEncodeParams {
	payload: any;
	expiration?: string;
}

export const jwt = {
	encode: ({ payload, expiration }: JwtEncodeParams): string => {
		if (SECRET) {
			try {
				return Jwt.sign(
					{ payload },
					SECRET,
					{ expiresIn: expiration || JWT_EXPIRE });
			} catch (error: any) {
				throw new JwtError(error.message);
			}
		} else {
			throw new JwtError('A secret must be specified.');
		}
	},

	verify: (jwt: string): JwtPayload => {
		if (SECRET) {
			const data = Jwt.verify(jwt, SECRET);
			if(typeof data === 'string') {
				return JSON.parse(data);
			}
			return data;
		} else {
			throw new JwtError('A secret must be specified.');
		}

	}
}


