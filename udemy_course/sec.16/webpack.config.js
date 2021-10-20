const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

/* vue のプラグインを追加
 * 波括弧しないとエラーになってしまう
 */
const { VueLoaderPlugin } = require("vue-loader")

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, "./dist"), 
		filename: "./js/main.js" 
	},
	plugins: [ 
		new VueLoaderPlugin(), /* vue を動作させるためのプラグイン */
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
			/* TypeScriptのファイルの読み込み設定 */
			{
				test: /\.ts|tsx/,
				exclude: /node_modules/,
				use: [
					{loader: "ts-loader"}
				]
			},
			/* .vue ファイルを読み込みする際に、vueのプラグインが実行されるように設定 */
			{
				test: /\.vue/,
				exclude: /node_modules/,
				use: [
					{loader: "vue-loader"}
				]
			},
			/* js ファイルの読み込みの際に、babel が実行されるように設定 */
			{
				test: /\.js/,
				exclude: /node_modulues/, /* node_modules 内のjsファイルは対象外 */
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							["@babel/preset-env", {targets: "> 0.25%, not dead"}],
							"@babel/preset-react" /* reactをビルドするためのプラグインを取り込む */
						]

					}
				}
			},

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
				/* Sassを利用できるように設定を変更 */
				test: /\.css|sass|scss/, 
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ 
						loader: "css-loader",
						options: { sourceMap: true },　/* ソースマップの出力を追加する */
					},
					{ loader: "sass-loader" } /* 追記 */
				]
			},
			/* 画像の読み込みルールを追加 */
			{
				test: /\.(png|jpg|jpeg|svg|bmp)/,
				/* webpack 5 のasset moduleを利用する場合の記述 */
				type: "asset/resource",
				generator: { filename: "images/[name][ext]" },
				/* image-loaderを利用して画像を軽量化する */
				use: [
					{ loader: "image-webpack-loader" }
				],
				
			}
		]
	}
}