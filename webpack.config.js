const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');



const isDev = process.env.NODE_ENV === 'development';
console.log('isDev:', isDev);
const isProd = !isDev;
console.log('isProd:', isProd);



const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new CssMinimizerWebpackPlugin()
        ]
    }

    return config;
}



const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;



const cssLoaders = (extention) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader, 
            options: {
                esModule: isDev,
            },
        },
        'css-loader',
    ]

    if (extention) {
        loaders.push(extention);
    }

    return loaders
}



const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}



module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
       main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.S[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: babelOptions()
                }
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}