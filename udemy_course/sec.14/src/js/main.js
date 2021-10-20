/* reactのモジュールを読み込み */
import "./reactApp.jsx"

/* modules/sample_module.js から、module_testという名前でモジュールを読み込む
 * モジュールの名前は、ファイル名でもいいし、それ以外に設定してもよい
 */
import module_test from "./samlple_module.js"

/* cssモジュールのインポート */
import "../css/main.scss"

/* 読み込みしたモジュールを呼び出し */
module_test()

console.log("webpack test")
