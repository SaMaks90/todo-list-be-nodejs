import js from "@eslint/js";
import { configs } from "typescript-eslint";

export default [
  {
    ignores: ["dist", "node_modules"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  js.configs.recommended,
  ...configs.recommended,
];
