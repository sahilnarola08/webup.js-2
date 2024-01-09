module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "no-unused-vars": "off",
    // "@typescript-eslint/no-unused-vars": ["error"],
    /*"react-hooks/exhaustive-deps": "off",*/
    "no-console": "off",
  },
};
