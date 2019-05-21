const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');

const pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(pathToPhaser, 'dist/phaser.min.js');
const routeApp = './app';

module.exports = (env) => {
    let target;

    if (!env) {
        target = "web"
    } else if (env.android) {
        target = "android"
    } else if (env.ios) {
        target = "ios"
    } else if (env.electron) {
        target = "electron"
    }

    return {
        entry: {
            index: `${routeApp}/src/main.ts`
        },   
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [{
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /phaser\.js$/,
                    loader: 'expose-loader?Phaser'
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                }
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, './app'),
            port: 4300
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                phaser: phaser
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                gameName: 'Phaser3 Cli',
                template: `${routeApp}/index.html`
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CopyWebpackPlugin([{
                    from: `${routeApp}/assets`,
                    to: 'assets'
                },
                {
                    from: `${routeApp}/css`,
                    to: 'css'
                },
            ]),
            new webpack.DefinePlugin({
                BUILD_TARGET: JSON.stringify(target)
            })
        ]
    };
}