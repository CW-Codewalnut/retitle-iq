import { RetitleInsights } from "./insights";
import { ProcessingRetitleRequest } from "./processing";

export function RetitleLoading() {
	return (
		<>
			<ProcessingRetitleRequest />
			<RetitleInsights />
		</>
	);
}
