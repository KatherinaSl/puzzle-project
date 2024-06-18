/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
    cache: false,

    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname, 'src', 'favicon.ico'),
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/img'), // путь к папке, где лежат картинки
                    to: path.resolve(__dirname, 'dist/img'), // куда будут копированы
                },
            ],
        }),
        new EslintPlugin({ extensions: ['ts'] }),
    ],
    devServer: {
        open: true,
        host: 'localhost',
        hot: false,
        liveReload: true,
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(css|scss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
            {
                test: /\.(png|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        alias: {
            img: path.join(__dirname, 'src', 'assets', 'img'),
        },
        extensions: ['.ts', '.js'],
    },
    optimization: {
        runtimeChunk: 'single',
    },
};
