import jsPlugin from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tsPlugin from "typescript-eslint";

export default tsPlugin.config({
	ignores: ["**/build/**", "**/.react-router/**"],

	files: ["**/*.{ts,tsx}"],

	linterOptions: {
		reportUnusedDisableDirectives: true,
	},

	extends: [
		jsPlugin.configs.recommended,
		tsPlugin.configs.recommendedTypeChecked,
		tsPlugin.configs.stylisticTypeChecked,
		importPlugin.flatConfigs.recommended,
		importPlugin.flatConfigs.typescript,
		reactPlugin.configs.flat.recommended,
		jsxA11yPlugin.flatConfigs.recommended,
		reactCompiler.configs.recommended,
	],

	settings: {
		react: {
			version: "detect",
		},

		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".mts", ".cts", ".tsx", ".d.ts"],
		},

		"import/resolver": {
			"eslint-import-resolver-node": {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},

			"eslint-import-resolver-typescript": {
				alwaysTryTypes: true,
			},

			typescript: {},
		},
	},

	languageOptions: {
		parser: tsParser,
		parserOptions: {
			project: true,
			sourceType: "module",
			projectService: true,
		},
	},

	plugins: {
		"simple-import-sort": simpleImportSortPlugin,
		"react-hooks": reactHooksPlugin,
	},

	rules: {
		...reactHooksPlugin.configs.recommended.rules,

		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",

		"sort-imports": "off",
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",

		"import/first": "error",
		"import/no-duplicates": "error",
		"import/newline-after-import": "error",
		"import/consistent-type-specifier-style": ["error", "prefer-top-level"],

		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				args: "all",
				argsIgnorePattern: "^_",
				caughtErrors: "all",
				caughtErrorsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				ignoreRestSiblings: true,
			},
		],
		"@typescript-eslint/consistent-type-definitions": ["error", "type"],
		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{
				prefer: "type-imports",
				fixStyle: "separate-type-imports",
			},
		],
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
	},
});
