var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  devServer: {
		proxy: {
			"/api": {
				target: "https://api.kraken.com/",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				},
				bypass: function(req) {
					if(req.url === "/api/nope") {
						return "/bypass.html";
					}
				}
			}
		}
	}
};
