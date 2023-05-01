const path = require('path'); // ? for more effective interaction with file system paths
const HTMLWebpackPlugin = require('html-webpack-plugin'); // ? compile html and automatically link files to body if present
const CSSMiniExtractPlugin = require('mini-css-extract-plugin'); // ? this plugin extracts CSS into separate files
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); // ? optimize and minify CSS
const TerserWebpackPlugin = require('terser-webpack-plugin'); // ? optimize and minify JS
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin"); // ? compress all images



const isDev = process.env.NODE_ENV === 'development' // ? if node tackles keyword "development" then it is set to "true"
const isProd = !isDev // ? reverse logic
const isDevServer = process.env.WEBPACK_SERVE;

console.log('IS DEV:', isDev);

// * --- FUNCTIONS --- * //
const makePage = page => {
    return {
        filename: `${page}`,
        template: `html/${page}`, // ? custom html file location
        minify: {
            collapseWhitespace: isProd, // ? minify HTML if we are in production mode
            removeComments: true
        },
        hash: true
    }
}

const cssLoaders = extra => {
    const loaders = [
        {
            loader: CSSMiniExtractPlugin.loader,
            options: { publicPath: '../' }
        },
        {
            loader: 'css-loader',
            options: { url: true }
        }
    ]

    if (extra) { loaders.push(extra); }

    return loaders;
}

const babelOptions = preset => {
    const options = {
        // ? "@babel/preset-env" is a smart preset that allows us to use the latest JS without needing to micromanage which syntax transforms are needed by our target environment(s)
        presets: ['@babel/preset-env'],
        // ? helps transform some JS classes
        plugins: ['@babel/plugin-proposal-class-properties']
    }

    // ? if we have another preset, for example .ts then this goes in as an argument preset
    if (preset) { options.presets.push(preset); }

    return options;
}

const optimization = () => {
    const config = { splitChunks: { chunks: 'all' } } // ? split packages into main.js file and vendor.js file (vendor will contain node_modules)

    if (isProd) { // ? export minified optimization settings only when in production mode (no comments included)
        config.minimizer = [
            new CSSMinimizerWebpackPlugin({
                minimizerOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                }
            }),
            new TerserWebpackPlugin({
                terserOptions: { format: { comments: false } },
                extractComments: false
            }),
            new ImageMinimizerWebpackPlugin({
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.sharpMinify,
                    options: {
                        encodeOptions: { jpeg: { quality: 60 }, png: { quality: 60 } }
                    }
                }
            })
        ]
    }
    
    return config;
}
// * ---  --- * //

module.exports = {
    context: path.resolve(__dirname, 'src'), // ? webpack knows to look only into src folder
    mode: 'development',
    entry: { main: ['core-js/stable', 'regenerator-runtime/runtime', './index.js'] },
    output: {
        filename: 'js/[name].bundle.js', // ? bundled js file (name refers to entry file name)
        path: path.resolve(__dirname, 'dist'),
        clean: !isDevServer
    },
    resolve: {
        // ? if we don't specify extensions while importing files, we can set webpack to figure them out, by giving extension names
        extensions: ['.js', '.json', '.png', '.svg'],
        // ? one way to think about aliases is that they are like pre-written path holders that we can attach while importing
        alias: {
            '@js': path.resolve(__dirname, 'src/js'),
            '@scss': path.resolve(__dirname, 'src/scss')
        }
    },
    optimization: optimization(),
    // ? while dev server is running, all the dist content is saved in local memory, to ensure faster workflow
    devServer: {
        port: 8080,
        hot: false,
        liveReload: true,
        watchFiles: ['dist/**/*'],
        open: ['http://localhost:8080/html/index.html']
    },
    // ? if we are in development mode add source-maps, otherwise "stay silent"
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new HTMLWebpackPlugin(makePage('index.html')),
        // ? bundled css file (name refers to entry file name)
        new CSSMiniExtractPlugin({ filename: 'css/[name].css' })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader', // ? used to load src and other attributes from html
                options: { esModule: false }
            },
            {
                test: /\.ico$/i,
                type: 'asset/resource', 
                generator: { filename: 'assets/[name][ext]' }
            },
            { test: /\.(jpe?g|png|gif)$/i,
              type: 'asset/resource', 
              generator: { filename: "assets/images/[name][ext]" } },
            { test: /\.(svg)$/i,
              type: 'asset/resource', 
              generator: { filename: "assets/symbol/svg/[name][ext]" } },
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, 
              type: 'asset/resource', 
              generator: { filename: "assets/font/[name][ext]" } },
            { test: /\.css$/, use: cssLoaders() },
            { test: /\.(sass|scss)$/, use: cssLoaders('sass-loader') },
            { test: /\.json$/,
              type: 'asset/resource',
              generator: { filename: "json/[name][ext]" } },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader', options: babelOptions() }
            }
        ]
    }
}