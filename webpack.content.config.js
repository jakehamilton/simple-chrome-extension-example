// @ts-check
const path = require('path');

module.exports = {
    target: 'web',
    devtool: 'inline-source-map',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/content.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'content.js',
        globalObject: 'typeof self !== "undefined" ? self : this',
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
            '.json',
        ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.browser.json',
                        },
                    },
                ],
            },
        ],
    },
};
