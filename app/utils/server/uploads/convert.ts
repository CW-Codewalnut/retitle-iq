import { spawn } from "child_process";

async function verifyPandocInstallation() {
	return new Promise((resolve) => {
		const process = spawn("pandoc", ["--version"]);

		process.on("error", () => resolve(false));
		process.on("close", (code) => resolve(code === 0));
	});
}

type ConvertToPDFParams = {
	buffer: Buffer;
	extension: string;
};

export async function convertToPDF({ buffer, extension }: ConvertToPDFParams) {
	const isPandocInstalled = await verifyPandocInstallation();

	if (!isPandocInstalled) {
		throw new Error("Pandoc is not installed");
	}

	const commandArgs = [
		"--from",
		extension,
		"--to",
		"pdf",
		"--pdf-engine",
		"weasyprint",
		"--output",
		"-",
	];

	const process = spawn("pandoc", commandArgs);

	return new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
		let pdfBuffer = Buffer.alloc(0);
		let errorMessage = "";

		process.stdout.on("data", (data) => {
			pdfBuffer = Buffer.concat([pdfBuffer, data]);
		});

		process.stderr.on("data", (data: unknown) => {
			errorMessage += data?.toString();
		});

		process.on("error", (error) => {
			reject(new Error(`Pandoc process error: ${error.message}`));
		});

		process.on("close", (code) => {
			if (code !== 0) {
				reject(new Error(`Pandoc exited with code ${code}: ${errorMessage}`));
				return;
			}

			resolve(pdfBuffer);
		});

		process.stdin.write(buffer);
		process.stdin.end();
	});
}
