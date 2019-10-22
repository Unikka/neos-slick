const debug = process.env.NODE_ENV !== 'production';
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const webpackConfig = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : false,
    entry: {
        main: ['./Resources/Private/JavaScripts/index.js']
    },
    output: {
        path: __dirname + '/Resources/Public',
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-arrow-functions',
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    optimization: {
        minimizer: []
    },
    performance: {
        hints: debug ? 'warning' : false
    }
};

if (!debug) {
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
