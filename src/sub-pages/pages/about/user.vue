<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 18:44:00
 * @FilePath: /zhenghe/src/sub-pages/pages/about/user.vue
 * @Description: 交通路线
-->
<template>
	<CommonPage
		:is-back="true"
		title="写留言"
		color="#fff"
		bg-color="#96856C"
		background-color="transparent"
	>
		<view class="content">
			<view class="content-text">本馆热线：0512-283824723</view>
			<view class="button" @click="callTel">立即拨打</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
const callTel = () => {
	uni.makePhoneCall({
		phoneNumber: '0512-283824723'
	});
};
</script>

<style lang="scss" scoped>
.content {
	width: 690rpx;
	height: 100%;
	margin: 0 auto;

	.content-text {
		margin: 80rpx 0;
		font-weight: bold;
		font-size: 40rpx;
		color: #96856c;
		line-height: 32rpx;
		letter-spacing: 2rpx;
		text-align: center;
	}

	.button {
		width: 100%;
		margin-top: 40rpx;
		border: 2rpx solid #96856c;
		line-height: 100rpx;
		height: 100rpx;
		text-align: center;
		color: #96856c;
		font-size: 28rpx;
		font-weight: 600;
	}
}
</style>
