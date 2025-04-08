export async function getDataURLFromFile(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = () => {
			reject(new Error("Error reading file"));
		};

		reader.readAsDataURL(file);
	});
}
