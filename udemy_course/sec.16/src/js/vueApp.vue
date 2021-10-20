<template>
	<p>{{ message }}</p> 
</template>

<script>
export default {
	data: () => {
		console.log("Vue.js is installed!")
		return {message: "Hello, this is vueApp massage"}
	}
}
</script>

<style scoped>
p {
	color: darkolivegreen;
}
</style>