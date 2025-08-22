import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tanstackQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      tanstackQuery.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      "@tanstack/query": tanstackQuery,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      // "print-width": "off",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // React 관련 (맨 위)
            ["^react", "^react-dom"],

            // Node.js builtin modules
            ["^node:"],

            // 외부 라이브러리 (node_modules의 패키지들)
            ["^@?\\w"], // @로 시작하는 scoped 패키지도 포함

            // 절대경로 imports (@/, ~/ 등)
            ["^@/", "^~/"],

            // 상위 디렉토리 상대경로 (../)
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

            // 같은 디렉토리 상대경로 (./) - 가장 아래
            ["^\\./"],

            // CSS/Style imports (맨 아래)
            ["\\.(css|scss|sass|less)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },
]);
