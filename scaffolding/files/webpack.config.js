const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');

const pathToPhaser = path.join(__dirname, '/vendor/phaser/');
const phaser = path.join(pathToPhaser, 'phaser.min.js');
const routeApp = './game';

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
                }
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, `./${routeApp}`),
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
                template: `${routeApp}/index.html`
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