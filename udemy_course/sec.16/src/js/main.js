/* reactのモジュールを読み込み */
import "./reactApp.jsx"

/* vueのモジュールを読み込み */
import Vue from "vue"
import VueApp from "./vueApp.vue"
new Vue({
	el: "#vue-root",
	render: (h) => h(VueApp)
})

/* TypeScriptのモジュールを読み込みし、関数として利用 */
import add from "./add.ts"
console.log(add(12, 30))

/* modules/sample_module.js から、module_testという名前でモジュールを読み込む
 * モジュールの名前は、ファイル名でもいいし、それ以外に設定してもよい
 */
import module_test from "./samlple_module.js"

/* cssモジュールのインポート */
import "../css/main.scss"

/* 読み込みしたモジュールを呼び出し */
module_test()

console.log("webpack test")
