<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 18:37:46
 * @FilePath: /zhenghe/src/sub-pages/pages/about/notice.vue
 * @Description: 交通路线
-->
<template>
	<CommonPage
		:is-back="true"
		title="公告详情"
		color="#fff"
		bg-color="#96856C"
		background-color="transparent"
	>
		<view class="content">
			<view class="title">
				政和县博物馆举办 “最后的华章：青铜 时代之东周王城青铜器”主题讲座
			</view>
			<view class="info">
				青铜器是中国古代社会进入文明时代的重要标志，为贵族社会崇尚礼制的特殊产物。由于青铜器多用于祭神享祖、礼尚交往、宴飨宾客等礼仪活动，故被称作“礼器”。不同身份的贵族，拥有与他们地位相称的礼器。青铜器是当时维护统治、强化政权的必要工具，也是权力的象征。
				在漫长的历史岁月里，夏商周青铜艺术以其繁多的种类、精美的纹饰、高超的铸造技术，充分体现了中华文化的博大精深和古人完美杰出的创造能力，秦汉以后出现式微，到了宋元明清以复古的面貌得以重现。
			</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
const interact = ref('');
</script>

<style lang="scss" scoped>
.content {
	width: 690rpx;
	height: 100%;
	margin: 0 auto;

	.title {
		margin-top: 40rpx;
		font-weight: bold;
		font-size: 36rpx;
		color: #4d4840;
		line-height: 61rpx;
		letter-spacing: 2rpx;
	}
	.info {
		margin-top: 60rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: #3b3b3b;
		line-height: 60rpx;
		letter-spacing: 2rpx;
	}
}
</style>
