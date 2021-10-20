# memorandum of webpack-training sec.15
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## vue.js をビルドする

### 必要なパッケージをインストールする
- vue-loader
- vue
- vue-template-compiler

### 設定ファイルの変更
- プラグインの追加
- モジュールのルールを追加

### vueのコンポーネントを作成
`src/vueApp.vue`を作成
```
// テンプレートのhtml
<template>
	<p>{{ message }}</p> 
</template>

// 初期化処理みたいなもの
<script>
export default {
	data: () => {
		console.log("Vue.js is installed!")
		return {message: "Hello, this is vueApp massage"}
	}
}
</script>

// scoped がついていると、このファイル内だけで適用されるstyleを記述できる
<style scoped>
p {
	color: darkolivegreen;
}
</style>
```

