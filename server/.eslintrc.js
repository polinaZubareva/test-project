module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb/hooks',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    plugins: ['import', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
};