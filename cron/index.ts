import "dotenv/config";

import cron from "node-cron";

// every 24 hours
cron.schedule("0 0 * * *", () => {
	const headers = new Headers();
	headers.append("x-cron-token", process.env.CRON_TOKEN!);

	fetch(`${process.env.APP_URL}/reset-usage`, {
		method: "POST",
		headers,
	})
		.then((res) => res.json())
		.then(console.log)
		.catch(console.error);
});
