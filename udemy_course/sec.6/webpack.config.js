const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, "./dist"), 
		filename: "./js/main.js" 
	},
	plugins: [ 
		new MiniCssExtractPlugin({
			/* 出力先ディレクトリとファイル名の指定 */
			filename: "./css/main.css"
		}),
		new HtmlWebpackPlugin({
			template: "./src/templates/index.html" 
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [ 
			{
				test: /\.css/, 
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader", 
					}
				]
			},
		]
	}
}