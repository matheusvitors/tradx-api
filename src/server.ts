import express from "express";
import helmet from "helmet";
import 'dotenv/config';
import { routes } from "@/routes";

const app = express();

app.use(helmet());
app.use(routes);

const PORT = 8000;

if(process.env.NODE_ENV !== "tests") {
	app.listen(PORT || 8000, function (){
		console.log("Tradx running on port %d", PORT || 8000);
	});
}

export { app };
