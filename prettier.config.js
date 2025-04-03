module.exports = {
  arrowParens: "avoid", // Omit parentheses for single-parameter arrow functions
  bracketSameLine: false, // Keep closing brackets on a new line for JSX
  bracketSpacing: true, // Ensure spaces between brackets
  htmlWhitespaceSensitivity: "css", // Respect CSS for whitespace in HTML
  insertPragma: false,
  jsxSingleQuote: false, // Use double quotes in JSX
  plugins: ["prettier-plugin-tailwindcss"], // Enable Tailwind CSS formatting
  printWidth: 80, // Wrap lines at 80 characters for better readability
  proseWrap: "always",
  quoteProps: "as-needed", // Add quotes only when required
  requirePragma: false,
  semi: true, // Always use semicolons
  singleQuote: false, // Prefer double quotes
  tabWidth: 2, // Use 2 spaces per tab
  trailingComma: "all", // Use trailing commas where possible
  useTabs: false, // Use spaces instead of tabs
};
