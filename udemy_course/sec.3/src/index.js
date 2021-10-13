/* modules/sample_module.js から、module_testという名前でモジュールを読み込む
 * モジュールの名前は、ファイル名でもいいし、それ以外に設定してもよい
 */
import module_test from "./modules/samlple_module.js"

/* 読み込みしたモジュールを呼び出し */
module_test()

console.log("webpack test")
