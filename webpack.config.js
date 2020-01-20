const path = require('path');
const dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'scripts/app.ts'),
    output: {
        filename: './bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new dotenv(),
        new CopyPlugin([
            { from: 'index.html', to: './' },
            { from: 'styles', to: 'styles' },
            { from: 'assets', to: 'assets' },
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};