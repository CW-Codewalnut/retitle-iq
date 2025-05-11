import { Cron } from "croner";

// every 24 hours
new Cron("0 0 * * *", () => {
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
