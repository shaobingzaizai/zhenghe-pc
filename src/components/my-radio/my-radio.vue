<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-16 10:14:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 11:11:34
 * @FilePath: /zhenghe/src/components/my-radio/my-radio.vue
 * @Description: 
-->
<template>
	<view class="select-circle" @click="agreeNotice">
		<view v-if="isChecked" class="is-agree"></view>
	</view>
</template>
<script lang="ts" setup>
const isChecked = defineModel();
const agreeNotice = () => {
	isChecked.value = !isChecked.value;
};
</script>

<style scoped lang="scss">
.select-circle {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 8rpx;
	border: 1rpx solid #d1bd98;
	border-radius: 50%;
	width: 22rpx;
	height: 22rpx;
	background-color: #fff;
	transition: all 0.3s ease-in-out;

	.is-agree {
		border-radius: 50%;
		width: 16rpx;
		height: 16rpx;
		background-color: #d1bd98;
	}
}
</style>
