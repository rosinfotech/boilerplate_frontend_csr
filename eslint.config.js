import js from "@eslint/js";
import importConfig from "@rosinfo.tech/eslint-config-import";
import javascriptConfig from "@rosinfo.tech/eslint-config-javascript";
import reactConfig from "@rosinfo.tech/eslint-config-react";
import typescriptConfig from "@rosinfo.tech/eslint-config-typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import typescriptPlugin from "typescript-eslint";

export default [
    {
        ignores: [
            "**/*.min.js",
            "**/.DS_Store",
            "**/.output/",
            "**/.vscode/",
            "**/android/",
            "**/build/",
            "**/coverage/",
            "**/dist/",
            "**/dist-mobile/",
            "**/ios/",
            "**/node_modules/",
            "**/www/",
            "src/routeTree.gen.ts",
            "src/routeTree.mobile.gen.ts",
        ],
    },

    js.configs.recommended,

    ...typescriptPlugin.configs.recommended,

    ...(Array.isArray(reactConfig) ? reactConfig : [reactConfig]),

    {
        files: ["**/*.{js,mjs,cjs,ts,tsx,mts,cts}"],

        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
                ...globals.node,
                NodeJS: "readable",
                TUnstable: "readable",
                TUnstables: "readable",
            },
        },

        plugins: {
            ...(reactConfig.plugins || {}),
            ...(javascriptConfig.plugins || {}),
            ...(importConfig.plugins || {}),
            ...(typescriptConfig.plugins || {}),
        },

        rules: {
            ...(reactConfig.disabledRules || {}),
            ...(javascriptConfig.disabledRules || {}),
            ...(importConfig.disabledRules || {}),
            ...(typescriptConfig.disabledRules || {}),

            ...(reactConfig.rules || {}),
            ...(javascriptConfig.rules || {}),
            ...(importConfig.rules || {}),
            ...(typescriptConfig.rules || {}),

            "import-x/newline-after-import": ["error", { count: 1 }],
            "import-x/no-unused-modules": "off",
        },

        settings: {
            ...(reactConfig.settings || {}),
            ...(javascriptConfig.settings || {}),
            ...(importConfig.settings || {}),
            ...(typescriptConfig.settings || {}),

            react: {
                version: "19.2",
            },
        },
    },

    eslintConfigPrettier,
];
