/* 出力ディレクトリを絶対パスで表現するため、pathモジュールを読み込み */
const path = require("path")

/* 編集箇所1. MiniCss... プラグインを読み込みする */
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

/* 編集箇所A. WebpackHtmlPlugin を読み込みする */
const HtmlWebpackPlugin = require("html-webpack-plugin")

/* モジュールの出力設定 */
module.exports = {
	entry: "./src/index.js", /* エントリーポイントのjsファイル */
	output: {
		path: path.resolve(__dirname, "./dist"), /* 生成したファイルの出力先ディレクトリ */
		filename: "main.js" /* 出力するファイル名 */
	},
	plugins: [ /* 編集箇所2. minicss... を利用するため、plugins の設定を追記 */
		new MiniCssExtractPlugin(),

		/* 編集箇所B. WebpackHtmlPluginの設定を追加 */
		new HtmlWebpackPlugin({
			template: "./src/index.html" /* pluginで読み込みするhtmlファイルを指定 */
		}),
	],
	/* モジュールの動作設定 */
	module: {
		rules: [ /* モジュール適用ルールを、配列形式で記述する */
			{
				test: /\.css/, /* 読み込みするファイルのパターンを正規表現で指定する(ファイル名の一致テスト) */
				use: [
					{
						/* 編集箇所3. cssファイルに対して、style-loaderの代わりにminicss... プラグインを適用する */
					// 	loader: "style-loader", 
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader", /* test で設定した条件に一致したら(今回は.cssファイルだったら)、指定したloaderを利用する */
					}
				]
			},
		]
	}
}