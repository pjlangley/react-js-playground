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
                include: __dirname + '/src',
                loader: 'babel-loader'
            },
            {
                test: /modules\/fetch-location\.js$/,
                include: __dirname + '/src',
                loader: __dirname + '/include-api-key'
            }
        ]
    }
};