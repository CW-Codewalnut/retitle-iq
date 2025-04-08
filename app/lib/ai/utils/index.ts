import type { StepResult } from "ai";
import { writeFileSync } from "fs";
import path from "path";

type StepRes = StepResult<never>;

export function writeProviderRawRequestToFile(request: StepRes["request"]) {
	if (import.meta.env.DEV) {
		try {
			writeFileSync(
				path.join(import.meta.dirname, "./.tmp/request.json"),
				request.body ?? "",
			);
		} catch (error) {
			console.log("Error writing provider raw request/response to file", error);
		}
	}
}
