/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 100,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  endOfLine: 'auto',
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html'],
      options: {
        singleQuote: false,
      },
    },
  ],
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  tailwindAttributes: ['className', 'containerClassName', 'borderClassName', 'tw', 'css', 'style'],
  tailwindFunctions: ['tw', 'css', 'style'],
  tailwindPreserveDuplicates: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
