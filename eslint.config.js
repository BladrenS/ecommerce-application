import js from '@eslint/js';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import jest from 'eslint-plugin-jest';
import importPlugin from 'eslint-plugin-import';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ['dist', 'node_modules', 'test/__mocks__/fileMock.js', 'global.d.ts'],
  },
  {
    linterOptions: {
      noInlineConfig: true,
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        Audio: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        history: 'readonly',
        location: 'readonly',
        setTimeout: 'readonly',
        requestAnimationFrame: 'readonly',
        globalThis: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        fetch: 'readonly',
        ...jest.environments.globals.globals,
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      unicorn,
      prettier,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      jest,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: { constructors: 'off' },
        },
      ],
      '@typescript-eslint/member-ordering': 'error',

      'class-methods-use-this': 'error',

      'unicorn/no-array-callback-reference': 'warn',
      'unicorn/no-array-for-each': 'warn',
      'unicorn/no-array-reduce': 'warn',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'warn',
      'unicorn/numeric-separators-style': 'warn',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],

      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'warn',
      'import/no-default-export': 'error',
    },
  },
];
