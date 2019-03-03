const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        'index': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    }
}

