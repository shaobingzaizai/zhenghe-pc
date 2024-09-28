<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-16 17:37:01
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 18:03:17
 * @FilePath: /zhenghe/src/components/base-modal/base-modal.vue
 * @Description: 
-->
<template>
	<view class="base-modal" :class="{ show: show }">
		<view class="modal-content">
			<slot></slot>
			<text class="close icon-close iconfont" @click="close"></text>
		</view>
	</view>
</template>
<script lang="ts" setup>
const show = defineModel();

const close = () => {
	show.value = false;
};
</script>
<style lang="scss" scoped>
.base-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	justify-content: center;
	opacity: 0;
	align-items: center;
	z-index: -1;
	transition: all 0.3s ease-in-out;
	&.show {
		transform: scale(1);
		opacity: 1;
		z-index: 9999;

		.modal-content {
			transform: scale(1);
		}
	}

	.modal-content {
		width: 80%;
		padding: 40rpx;
		min-height: 100rpx;
		background-color: #f1ecdc;
		border-radius: 10rpx;
		position: relative;
		margin-bottom: 200rpx;
		transform: scale(0);
		transition: all 0.3s ease-in-out;
		display: flex;
		justify-content: center;
		align-items: center;

		.close {
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			font-size: 40rpx;
			color: #9c8f7d;
		}
	}
}
</style>
