const path = require('path');
const dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.join(__dirname, 'scripts/app.ts'),
    output: {
        filename: 'app.js',
        path: __dirname
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
        new dotenv()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};