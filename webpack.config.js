var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSSQuery = [
    'modules',
    'sourceMap',
    'localIdentName=[name]__[local]___[hash:base64:5]'
];

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: __dirname + '/src',
                loader: 'babel-loader'
            },
            {
                test: /modules\/fetch-location\.js$/,
                include: __dirname + '/src',
                loader: __dirname + '/include-api-key'
            },
            {
                test: /\.css$/,
                include: __dirname + '/src/css',
                loader: ExtractTextPlugin.extract('css-loader?' + extractCSSQuery.join('&'))
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/css-modules.css', {allChunks: true})
    ]
};