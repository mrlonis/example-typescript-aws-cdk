// @ts-check
const { defineConfig, globalIgnores } = require('eslint/config');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintConfigPrettier = require('eslint-config-prettier');
const path = require('node:path');

module.exports = defineConfig([
  globalIgnores([
    '.codacy/',
    '.github/instructions/',
    'package-lock.json',
    // Generated agent instruction files (source of truth: AGENTS.md)
    '.claude/CLAUDE.md',
    '.gemini/GEMINI.md',
    '.github/copilot-instructions.md',
    '.junie/guidelines.md',
    '.windsurf/rules/guidelines.md',
    '.cursor/rules/cursor.mdc',
  ]),
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: path.join(__dirname, 'tsconfig.json'),
        },
      },
    },
    languageOptions: { parserOptions: { projectService: true } },
    rules: {
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'error',
      'import/no-deprecated': 'error',
      'import/no-extraneous-dependencies': ['error'],
      'import/no-self-import': 'error',
      'import/no-unresolved': 'error',
      'import/no-useless-path-segments': ['error', { noUselessIndex: true, commonjs: true }],
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: false },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
]);
