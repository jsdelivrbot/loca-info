const path = require('path');
const webpack = require('webpack');


module.exports = {
    mode: 'development',

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
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }
        ]
    },

    devServer: {
        /* devServer 는 변경사항 발생시 메모리에 bundle.js 를 배포하고 해당 파일?을 바라보며 서비스된다 */
        hot: true,
        inline: true,
        historyApiFallback: true,       // 404 일 경우 /index.html 로 서비스
        host: '0.0.0.0',
        port: 5050,
        contentBase: __dirname + '/public/',
        disableHostCheck: true,     // 외부에서 접속 허용
        proxy: {
            "/allData" : "http://localhost:5000",
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};