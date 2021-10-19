/* モジュールとして宣言する */
export default () => {

	/* ES6 の記述例 */
	const obj = {a:1, a:2 }
	const newObj = {...obj, c: 3}
	console.log(newObj)

	console.log("this is module of sample_module.js")
}