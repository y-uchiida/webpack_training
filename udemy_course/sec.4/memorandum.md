# memorandum of webpack-training sec.4
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## Webpackの設定ファイル
ファイル名は`webpack.config.js` で固定  
プロジェクトの直下に置く  
以下の内容は、テンプレート的に毎回使うものと思ってよいかもしれない
```
/* 出力ディレクトリを絶対パスで表現するため、pathモジュールを読み込み */
const path = require("path")

module.exports = {
	entry: "./src/index.js", /* エントリーポイントのjsファイル */
	output: {
		path: path.resolve(__dirname, "./dist") /* 生成したファイルの出力先ディレクトリ */
	}
}
```
## CSSモジュールの読み込み
`css-loader` を使うことで、cssファイルをモジュールとしてインポートできる  
```
$ npm install --save-dev css-loader@latest

added 17 packages, and audited 140 packages in 3s

19 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
jsファイルから、`import "[cssファイルのパス]"`と記述すると、そのcssを読み込みする  

css-loaderは、そのままの設定では利用できないので、cssファイルを読み込みするために`webpack.config.js` を編集する  

```
/* module.exportsの中に追記 */
	/* モジュールの動作設定 */
	module: {
		rules: [ /* モジュール適用ルールを、配列形式で記述する */
			{
				test: /\.css/, /* 読み込みするファイルのパターンを正規表現で指定する(ファイル名の一致テスト) */
				use: [
					{
						loader: "css-loader", /* test で設定した条件に一致したら(今回は.cssファイルだったら)、指定したloaderを利用する */
					}
				]
			},
		]
	}
```

## style-loaderでCSSを適用する
css-loaderでインポートしただけでは、cssファイルに記述した内容はhtmlに反映されない  
cssの内容をhtmlへstyleタグとして差し込みする役割を担う`style-loader` をインストールする
```
$ npm install --save-dev style-loader@latest

added 1 package, and audited 141 packages in 1s

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

インストールしたら、`webpack.config.js` に、style-loaderの設定を追記する  
use の配列に、loader として追加するだけ  
順番は、先にstyle-loader 記述し、そのあとにcss-loaderにしなければならない
webpackは、loaderの記述内容を下から順番に適用していく  
そのため、まずcss-loaderが適用されるように、後ろに書くということらしい
```
				use: [
					/* useは、下から適用されていくので、style-loader -> css-loader の順番に記述する */
					{
						loader: "style-loader", 
					},
					{
						loader: "css-loader", /* test で設定した条件に一致したら(今回は.cssファイルだったら)、指定したloaderを利用する */
					}
```