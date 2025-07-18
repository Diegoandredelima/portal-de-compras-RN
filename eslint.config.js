// eslint.config.js
export default [
  {
    ignores: [
      "**/*.test.js", 
      "**/*.spec.js", 
      "node_modules/**",
      "public/css/**",
      "public/fonts/**",
      "public/images/**"
    ],
    rules: {
      "semi": ["error", "always"], // Ensure semicolons are always used
      "prefer-const": "error", // Prefer const over let where possible
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warn on unused variables
      "indent": ["warn", 2], // Warn for 2-space indentation
      "quotes": ["warn", "single"], // Warn for single quotes
      "comma-dangle": ["warn", "always-multiline"], // Trailing commas in multi-line
      "no-trailing-spaces": "warn", // Warn on trailing spaces
      "no-console": "warn", // Warn on console.log usage
      "eqeqeq": "error", // Require === and !==
      "curly": "error", // Require curly braces for all control statements
      "no-var": "error", // Disallow var, use let/const
      "arrow-spacing": "warn", // Require space before/after arrow functions
      "object-curly-spacing": ["warn", "always"], // Require spaces inside braces
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
