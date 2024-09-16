import { dashboardController } from "@/application/controllers/dashboard/dashboard-controller";
import { describe, expect, it } from "vitest";

describe('Dashboard Controller', () => {
	it("should list informations", async () => {
		const response = await dashboardController();
		expect(response.status).toEqual(200);
		expect(response.body.content.contas.length).toEqual(0);
	});
});
