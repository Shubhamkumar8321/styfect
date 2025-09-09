import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      // आप चाहो तो यहाँ custom rules डाल सकते हो
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
