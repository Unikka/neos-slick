const debug = process.env.NODE_ENV !== 'production';
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const webpackConfig = {
    context: __dirname,
    devtool: 'inline-sourcemap',
    entry: {
        main: ['./Resources/Private/Stylesheets/style.scss'],
        theme: ['./Resources/Private/Stylesheets/theme.scss']
    },
    output: {
        path: __dirname + '/Resources/Public',
        filename: '[name].css'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './Fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './Images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: './[name].css' })],
    optimization: {
        minimizer: []
    },
    performance: {
        hints: debug ? 'warning' : false
    }
};

if (!debug) {
    webpackConfig.devtool = false;
    webpackConfig.optimization.minimizer.push(
        new TerserPlugin({
            terserOptions: {
                sourceMap: true,
                warnings: false,
                parse: {},
                compress: {},
                mangle: true,
                keep_fnames: true
            }
        })
    );
}

module.exports = webpackConfig;
