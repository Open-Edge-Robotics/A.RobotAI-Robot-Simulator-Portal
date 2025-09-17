import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import pluginQuery from "@tanstack/eslint-plugin-query";
import importPlugin from "eslint-plugin-import";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "@tanstack/query": pluginQuery,
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", disallowTypeAnnotations: false },
      ],

      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/stable-query-client": "error",
      "@tanstack/query/no-rest-destructuring": "warn",

      "import/order": [
        "warn",
        {
          groups: [
            "builtin", // Node.js 내장 모듈 (예: fs, path)
            "external", // 외부 라이브러리 (예: react, axios 등 npm 패키지)
            "internal", // 프로젝트 내부 import (@/components 등)
            ["parent", "sibling", "index"], // 상대경로 import (../, ./)
          ],
          pathGroups: [
            { pattern: "react*", group: "builtin", position: "before" }, // react는 builtin으로 별도 지정
            { pattern: "@/apis/**", group: "internal", position: "before" },
            { pattern: "@/components/**", group: "internal", position: "before" },
            { pattern: "@/constants/**", group: "internal", position: "before" },
            { pattern: "@/hooks/**", group: "internal", position: "before" },
            { pattern: "@/pages/**", group: "internal", position: "before" },
            { pattern: "@/types/**", group: "internal", position: "before" },
            { pattern: "@/utils/**", group: "internal", position: "before" },
          ],
          "newlines-between": "always", // 그룹 간 줄바꿈
          pathGroupsExcludedImportTypes: ["react"], // react는 external에서 제외
          alphabetize: {
            order: "asc", // 알파벳순 정렬
            caseInsensitive: true, // 대소문자 구분 X
          },
        },
      ],
      "import/first": "warn",
      "import/newline-after-import": "warn",
      "import/no-duplicates": "warn",
    },
  },
]);
