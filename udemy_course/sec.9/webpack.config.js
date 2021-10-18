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

		new HtmlWebpackPlugin({ /* index.html を出力する設定 */
			// template: "./src/templates/index.html"
			template: "./src/templates/index.pug",
			filename: "index.html"
		}),
		
		new HtmlWebpackPlugin({ /* access.html を出力する設定 */
			template: "./src/templates/access.pug",
			filename: "access.html"
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			/* pug ファイルの読み込み設定を追加 */
			{
				test: /\.pug/,
				use: [
					/* 2. htmlを文字列としてエクスポート */
					{loader: "html-loader"},
					
					/* 1. pug ファイルをhtmlに変換 */
					{
						loader: "pug-html-loader",
						options: {
							pretty: true /* 返還後のhtmlのミニファイを行わない */
						}
					}
				]
			},
			{
				test: /\.css/, 
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: "css-loader" }
				]
			},
			/* 画像の読み込みルールを追加 */
			{
				test: /\.(png|jpg|jpeg|svg|bmp)/,
				/* webpack 5 のasset modukeを利用する場合の記述 */
				type: "asset/resource",
				generator: { filename: "images/[name][ext]" },
			}
		]
	}
}