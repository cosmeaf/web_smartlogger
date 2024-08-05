// .eslintrc.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,jsx}"],
      languageOptions: {
        globals: globals.browser,
      },
      plugins: {
        react: pluginReact,
      },
      extends: [
        pluginJs.configs.recommended,
        pluginReact.configs.flat.recommended,
      ],
    },
  ],
};
