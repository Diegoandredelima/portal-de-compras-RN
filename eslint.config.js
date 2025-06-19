// eslint.config.js
export default [
  {
    ignores: ["**/*.test.js", "**/*.spec.js"], // Example: ignore test files
    rules: {
      "semi": ["error", "always"], // Ensure semicolons are always used
      "prefer-const": "error", // Prefer const over let where possible
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warn on unused variables, allow args starting with _
      "indent": ["warn", 2], // Warn for 2-space indentation
      "quotes": ["warn", "single"], // Warn for single quotes
      "comma-dangle": ["warn", "always-multiline"], // Warn for trailing commas in multi-line objects/arrays
      "no-trailing-spaces": "warn", // Warn on trailing spaces
      // Add more rules as desired for basic linting
    },
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        URLSearchParams: "readonly",
        // Add other browser globals your scripts might use
      },
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module", // Support ES modules
    }
  }
];
