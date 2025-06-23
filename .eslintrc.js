module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: { presets: ["@babel/preset-react"] },
  },
  env: { es2021: true },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-var": "error",
    "prefer-const": "error",
    eqeqeq: ["error", "always"],
    curly: "error",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "comma-dangle": ["error", "never"],
  },
  overrides: [
    {
      files: ["backend/src/**/*.{js,mjs}"],
      env: { node: true },
      extends: ["plugin:node/recommended"],
      rules: {
        "no-console": "off",
        "node/no-unsupported-features/es-syntax": ["error", { ignores: ["modules"] }],
        "node/callback-return": "error",
      },
    },

    {
      files: ["frontend/src/**/*.{js,jsx,mjs}"],
      env: { browser: true },
      extends: ["plugin:react/recommended", "plugin:prettier/recommended"],
      plugins: ["react", "react-hooks"],
      settings: { react: { version: "detect" } },
      rules: {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-boolean-value": ["error", "never"],
        "react/jsx-curly-spacing": ["error", { when: "never" }],
        "react/jsx-indent-props": ["error", 2],
        "react/jsx-props-no-spreading": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-console": "warn",
      },
    },
  ],
};
