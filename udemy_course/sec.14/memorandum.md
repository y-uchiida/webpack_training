# memorandum of webpack-training sec.14
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## Reactをビルドする
babelのプラグインでビルドを行うのでそれを追加
```
$ npm install --save-dev @babel/preset-react@latest

added 57 packages, and audited 58 packages in 9s

3 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
インストール完了後、configファイルのjsの設定に、`preset-react` を追加
```
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
```

### react本体と、ローダーをインストール
ビルドのための準備ができたので、reactのコードを動作させるための本体ライブラリを導入
```
$ npm install --save-dev react@latest react-dom@latest

added 5 packages, and audited 63 packages in 2s

3 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### react のコンポーネントを記述
`src/js/reactApp.jsx` を作成  
拡張子はjsxになる  
```
/* react の本体ライブラリをインポート */
import ReactDom from "react-dom"
import * as React from "react"

/* reactのコンポーネントを作成 */
const App = (props) => {
	return (
		<div>Hello, react App!!</div>
	)
}

/* #react-root の要素を探し、存在していれば App コンポーネントをマウントする */
const reactRoot = document.getElementById("react-root")
if (reactRoot) {
	ReactDom.render(<App />, reactRoot)
} else {
	console.log("No root element found")
}
```

### reactAppをインポート
`main.js`から、作成したreactのコードを読み込みする
```
/* reactのモジュールを読み込み */
import "./reactApp.jsx"
```

### react コンポーネントをマウントする要素をhtmlに追加
`index.pug` に、`div#react-root` を追加する

### ビルドを実行
ビルド実行して、問題が起きなければ完了  
index.htmlにアクセスした際はreactコンポーネント(テキスト)が表示され、  
それ以外のページにアクセスした場合はconsoleにメッセージが表示される