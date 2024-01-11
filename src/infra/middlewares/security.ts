import { NODE_ENV } from "@/infra/config/constants";
import { Request, Response, NextFunction } from "express"
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
	points: NODE_ENV === 'tests' ? 1000 : 5,
	duration: 5
})

export const security =  async (request: Request, response: Response, next: NextFunction) => {
	try {
		if(!request.ip) {
			throw new Error('Empty ip');
		}
		await limiter.consume(request.ip, 1);
		return next();
	} catch (error) {
		return response.status(429).json({
			message: 'Too many requests.',
			code: 429
		})
	}
}
