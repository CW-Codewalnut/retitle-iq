/**
 * @type {import('prettier').Config}
 */
export default {
	semi: true,
	tabWidth: 2,
	useTabs: true,
	endOfLine: "lf",
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindFunctions: ["cn", "cva"],
};
