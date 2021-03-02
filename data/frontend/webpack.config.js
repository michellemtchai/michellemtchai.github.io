require('dotenv').config({path: '/.env'});
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getEnv = (list)=>{
    let env = {};
    list.forEach(item=>{
        env['process.env.'+item]= JSON.stringify(process.env[item]);
    })
    return env;
}

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.join(__dirname, 'build/assets'),
        filename: '[name].[contenthash:8].js',
        publicPath: '',
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
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(getEnv([
            'DATA_BACKEND_ENV',
            'DATA_BACKEND_PORT'
        ])),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'public/index.html'),
        }),
    ],
    devServer: {
        host: process.env.DATA_BACKEND_HOST,
        publicPath: '/',
        contentBase: path.join(__dirname, 'public'),
        watchContentBase: true,
        compress: true,
        port: process.env.DATA_FRONTEND_PORT,
        watchOptions: {
            poll: true
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
        ],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        let name = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `npm.${name.replace('@', '')}`;
                    },
                },
            },
        },
        moduleIds: 'deterministic',
    },
};