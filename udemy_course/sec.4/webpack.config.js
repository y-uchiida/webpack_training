/* 出力ディレクトリを絶対パスで表現するため、pathモジュールを読み込み */
const path = require("path")

/* モジュールの出力設定 */
module.exports = {
	entry: "./src/index.js", /* エントリーポイントのjsファイル */
	output: {
		path: path.resolve(__dirname, "./dist"), /* 生成したファイルの出力先ディレクトリ */
		filename: "main.js" /* 出力するファイル名 */
	},
	/* モジュールの動作設定 */
	module: {
		rules: [ /* モジュール適用ルールを、配列形式で記述する */
			{
				test: /\.css/, /* 読み込みするファイルのパターンを正規表現で指定する(ファイル名の一致テスト) */
				use: [
					/* useは、下から適用されていくので、style-loader -> css-loader の順番に記述する */
					{
						loader: "style-loader", 
					},
					{
						loader: "css-loader", /* test で設定した条件に一致したら(今回は.cssファイルだったら)、指定したloaderを利用する */
					}
				]
			},
		]
	}
}