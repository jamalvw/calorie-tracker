import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    // lint JS/TS files
    {
        files: ['**/*.{js,jsx,ts,tsx,mjs}'],
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
            semi: ['error', 'never'],
            indent: ['error', 4],
            quotes: ['error', 'single']
        },
    },
]

export default eslintConfig
