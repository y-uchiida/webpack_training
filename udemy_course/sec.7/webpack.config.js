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
			/* 画像の読み込みルールを追加 */
			{
				test: /\.(png|jpg|jpeg|svg|bmp)/,
				/* webpack 5 のasset modukeを利用する場合の記述 */
				type: "asset/resource",
				generator: {
					filename: "images/[name][ext]"
				},

				use: [
					/* webpack5 では、これらの記述は不要 */
					// {
					// 	/* file-loader を利用するので、"url-loader"はコメントアウトしておく */
					// 	// loader: "url-loader",
					// 	loader: "file-loader",
					// 	options: {
					// 		/* ES modulesの構文での読み込みをしない
					// 		 * ES modules: jsファイルから別のjsファイルを読み込むための仕様
					// 		 */
					// 		esModule: false,
					// 		name: "images/[name].[ext]"
					// 	}
					// }
				]
			}
		]
	}
}