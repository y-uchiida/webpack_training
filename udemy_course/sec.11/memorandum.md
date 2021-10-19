# memorandum of webpack-training sec.11
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## ES6 のトランスパイル
ES6をサポートしていないブラウザでも動作させるため、ES6のコードをES5の文法に変換してdistに出力することを、トランスパイルと呼ぶ  
ES6 の構文については、以下のページが参考になるとのこと  
https://www.w3schools.com/js/js_es6.asp  
https://www.taniarascia.com/es6-syntax-and-feature-overview/

## babel をインストール
```
$ npm install --save-dev babel-loader@latest @babel/core@latest @babel/preset-env@latest
```

## 設定ファイルの修正
`webpack.config.js` を修正
```
	module: {
		rules: [
			/* js ファイルの読み込みの際に、babel が実行されるように設定 */
			{
				test: /\.js/,
				exclude: /node_modulues/, /* node_modules 内のjsファイルは対象外 */
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
	/* ... 以下略 ... */
```

## presets-env
babelのプラグインをまとめてインストールしてくれる  
babelでの変換を、どのブラウザを対象にして行うかの範囲をコントロールするのが`presets-env`  
```
	presets: [
		"@babel/preset-env", [
			{targets: "> 0.25%, not dead"} /* 0.25% 以上のシェアがあり、サポートが終了していないブラウザ */
		]
```