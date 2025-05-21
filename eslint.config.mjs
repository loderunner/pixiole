import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // Extends ESLint configuration with Next.js and TypeScript rules
  ...compat.extends('next', 'next/core-web-vitals', 'next/typescript'),
  // Configures TypeScript parser options and allows default project settings
  // for specific config files
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs', 'postcss.config.mjs'],
        },
      },
    },
  },
  // Configures import order rules to enforce consistent import grouping and
  // alphabetical sorting
  {
    rules: {
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          named: true,

          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
  },
  // Configures TypeScript and general code style rules with strict error
  // checking
  {
    rules: {
      curly: 'error',
      eqeqeq: 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowAny: false,
          allowNullableBoolean: false,
          allowNullableEnum: false,
          allowNullableNumber: false,
          allowNullableObject: false,
          allowNullableString: false,
          allowNumber: false,
          allowString: false,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'no-console': 'error',
    },
  },
  // Disables explicit any type checking for test files
  {
    files: ['**/*.test.{ts,js,tsx,jsx}'],

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Applies Prettier configuration to ensure consistent code formatting
  prettierConfig,
];

export default config;
