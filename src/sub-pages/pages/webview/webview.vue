<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-17 11:38:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 17:13:14
 * @FilePath: /zhenghe/src/sub-pages/pages/webview/webview.vue
 * @Description: 
-->
<template>
	<web-view :src="share_src"></web-view>
</template>

<script setup lang="ts">
// interface Params {
//   type?: keyof MapType;
//   url?: string;
// }

const share_src = ref('');
/**
 * 接收 type 和 url 两种参数
 * 如果 url 含 query, 则需要用 type 类型参数
 */
onLoad(async (options) => {
	if (!options) {
		return '参数错误';
	}
	const url = options?.url;
	share_src.value = decodeURIComponent(url);
});
</script>

<style scoped></style>
