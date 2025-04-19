import type { ActionFunctionArgs } from "react-router";

import { db } from "@/.server/db";

const CRON_TOKEN = process.env.CRON_TOKEN;

export async function action({ request }: ActionFunctionArgs) {
	try {
		const reqToken = request.headers.get("x-cron-token");

		if (reqToken !== CRON_TOKEN) {
			return Response.json(
				{
					status: "error",
					message: "Invalid Cron Token",
				},
				{ status: 401 },
			);
		}

		const updateManyResp = await db.usage.updateMany({
			data: { retitleGenerations: 0 },
		});

		return {
			status: "success",
			message: `${updateManyResp.count} records updated`,
		};
	} catch (e) {
		console.log("Error @ reset-usage", e);

		return Response.json(
			{
				status: "error",
				message: "An error occurred",
			},
			{ status: 500 },
		);
	}
}
