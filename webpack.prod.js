const path = require('path');
const webpack = require('webpack');


module.exports = {
    mode: 'production',

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },

    optimization: {
        minimize: false
    }   
};