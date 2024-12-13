import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Node.js 환경 설정 추가
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 12, // ES2021 문법 사용
      sourceType: 'module',
      globals: {
        ...globals.browser,  // 브라우저 전역 변수
        node: true,  // Node.js 환경에서 사용되는 전역 변수 활성화
      },
    },
    rules: {
      'no-undef': 'off', // 'no-undef' 규칙을 비활성화 (Node.js 전역 객체 인식)
    },
  },
]
