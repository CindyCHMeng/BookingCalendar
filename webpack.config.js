const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { version } = require('./package.json');

const APP_VERSION = version;

module.exports = {
	entry: {
		main: path.resolve(__dirname, "front_end_src/Main.jsx"),
		vendor: ["react", "react-dom"]
	},

	output: {
		path: path.resolve(__dirname, 'public'),
    filename: "js/[name].bundle.js"
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, "node_modules"),
				loader: 'babel-loader',
			},
			{
        test: /\.s?css$/,
        use: [
          'style-loader',
					MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[hash]-[name].[ext]',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        }],
      }
		]
	},

	resolve: {
		extensions: [".js", ".jsx"]
	},
	plugins: [
    new MiniCssExtractPlugin({
      filename: `css/style.css`,
    })
  ],
	devServer: {
		contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    port: 8000
	},

	devtool: "source-map"
}