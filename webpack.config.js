const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 当前 webpack 入口
let fileName = process.argv[process.argv.length - 1];

module.exports = {
    // devServer 配置
    devServer : {
        open : true,  // 自动打开页面
        port : 9002,  // 启动端口
        openPage : 'index.html', // 打开指定的页面
    },

    entry: './index.js',

    output: {
        filename: 'com.plugIn.js',
        path: path.resolve(__dirname, 'dist'),
        library : 'plugIn',
        libraryTarget: "umd",
    },

    module: {
        rules: [
            // 处理css编译
            {
                test: /\.css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" }
                ]
            },
            // 处理 less 文件编译
            {
                test: /\.less$/,
                use:  [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "less-loader" },
                    // 处理 global.less 文件 编译
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(__dirname,'src/global.less')
                        }
                    }
                ]
            },
            // 处理 js jsx 文件编译
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                },
                exclude: /(node_modules|bower_components)/, // 千万别忘记添加exclude选项,不然运行可能会报错
            }
        ],
    },

    plugins: [
        // copy 静态资源文件
        new CopyWebpackPlugin({
            patterns : [{
                from: path.resolve(__dirname, 'public'),
                to  : path.resolve(__dirname, 'dist')
            }],
            options : {}
        }),
        // 设置全局 变量
        new webpack.DefinePlugin({
            pageEnv : JSON.stringify(fileName.split('--')[1])
        }),
        // css 压缩 去重
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                    normalizeUnicode: false
                }]
            },
            canPrint: true
        }),
        // 设置 css 暴露文件
        new MiniCssExtractPlugin({
            filename: "com.plugIn.css"
        }),
        // 添加标识 署名
        new webpack.BannerPlugin(`
            TODO Author : 李小小\n
            TODO e-mail : lixiaosong59@163.com\n
            TODO Date : ${new Date().toLocaleDateString().split('/').join('-')}\n
            TODO Purpose : DOM插件
        `)
    ],
};
