const config = {
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 120,
    overrides: [
        {
            files: '*.{ts,tsx}',
            options: {
                tabWidth: 4,
            },
        },
    ],
};

module.exports = config;