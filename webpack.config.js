require('dotenv').config()
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        'whatwg-fetch',
        'core-js/es/promise',
        'core-js/es/string',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build/assets'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],
    devServer: {
        host: '0.0.0.0',
        publicPath: '/assets/',
        contentBase: 'public',
        contentBase: path.join(__dirname, 'public'),
        watchContentBase: true,
        compress: true,
        port: process.env.PORT,
        watchOptions: {
            poll: true,
            ignored: [
                path.resolve(__dirname, 'data'),
                path.resolve(__dirname, 'node_modules')
            ]
        },
        historyApiFallback: true
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 5,
                    mangle: true
                },
                sourceMap: true
            }),
            new CssMinimizerPlugin(),
        ]
    }
};