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