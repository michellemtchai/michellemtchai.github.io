require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getEnv = (list) => {
    let env = {};
    list.forEach((item) => {
        env['process.env.' + item] = JSON.stringify(process.env[item]);
    });
    return env;
};

module.exports = {
    mode: 'development',
    entry: ['core-js/es/promise', 'core-js/es/string', './src/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'assets/bundle.js',
        publicPath: '',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin(getEnv(['PUBLIC_URL', 'NODE_ENV'])),
        new MiniCssExtractPlugin({
            filename: 'assets/bundle.css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'public/index.html'),
        }),
    ],
    devServer: {
        host: '0.0.0.0',
        publicPath: process.env.PUBLIC_URL,
        contentBase: 'public',
        contentBase: path.join(__dirname, 'public'),
        watchContentBase: true,
        compress: true,
        port: process.env.PORT,
        watchOptions: {
            poll: true,
            ignored: [
                path.resolve(__dirname, 'data'),
                path.resolve(__dirname, 'node_modules'),
            ],
        },
        historyApiFallback: true,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 5,
                    mangle: true,
                },
                sourceMap: true,
            }),
            new CssMinimizerPlugin(),
        ],
    },
};
