module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|public)/,
                loader: 'babel-loader'
            },
            {
                test: /modules\/fetch-location\.js$/,
                exclude: /(node_modules|public)/,
                loader: __dirname + '/include-api-key'
            }
        ]
    }
};