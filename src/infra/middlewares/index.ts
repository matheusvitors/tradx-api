import { security } from "@/infra/middlewares/security";
import cors from "cors";
import { json, urlencoded } from "express";

export const middlewares = [
	json(),
	urlencoded({extended: false}),
	cors(),
	security,
]
