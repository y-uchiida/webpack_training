/* react の本体ライブラリをインポート */
import ReactDom from "react-dom"
import * as React from "react"

/* 作成したコンポーネントを読み込み */
import Alert from "./Alert.tsx"

/* reactのコンポーネントを作成 */
const App = (props) => {
	return (
		<div>
			Hello, react App!!
			{/* Alert を追記 */}
			<Alert message="Success" />
		</div>
	)
}

/* #react-root の要素を探し、存在していれば App コンポーネントをマウントする */
const reactRoot = document.getElementById("react-root")
if (reactRoot) {
	ReactDom.render(<App />, reactRoot)
} else {
	console.log("No root element found")
}