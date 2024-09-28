<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 16:19:59
 * @FilePath: /zhenghe/src/sub-pages/pages/traffic/traffic.vue
 * @Description: 交通路线
-->
<template>
	<CommonPage
		:is-back="true"
		title="交通路线"
		color="#fff"
		bg-color="#96856C"
		background-color="transparent"
	>
		<view class="content">
			<view class="map-view" @click="openMap">
				<!-- <map
					class="map"
					:latitude="latitude"
					:longitude="longitude"
					:markers="covers"
				></map> -->
				<image class="map" />
			</view>
			<view class="item-info">
				青铜器是中国古代社会进入文明时代的重要标志，为贵族社会崇尚礼制的特殊产物。由于青铜器多用于祭神享祖、礼尚交往、宴飨宾客等礼仪活动，故被称作“礼器”。不同身份的贵族，拥有与他们地位相称的礼器。青铜器是当时维护统治、强化政权的必要工具，也是权力的象征。
				在漫长的历史岁月里，夏商周青铜艺术以其繁多的种类、精美的纹饰、高超的铸造技术，充分体现了中华文化的博大精深和古人完美杰出的创造能力，秦汉以后出现式微，到了宋元明清以复古的面貌得以重现。
			</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
const latitude = ref(39.909);
const longitude = ref(116.39742);
const covers = ref([
	{
		latitude: 39.909,
		longitude: 116.39742
	}
]);

const openMap = () => {
	// uni.getLocation({
	// 	type: 'gcj02', //返回可以用于uni.openLocation的经纬度
	// 	success: function (res) {
	// 		console.log('res', res);
	// 	},
	// 	fail: function (err) {
	// 		console.log('err', err);
	// 	}
	// });
	uni.openLocation({
		// 默认为INS新乐园经纬度
		latitude: 31.217868,
		longitude: 121.470297,
		name: '政和县博物馆',
		address: '政和县博物馆'
	});
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	.map-view {
		width: calc(100% - 80rpx);
		padding: 40rpx;
		.map {
			width: 100%;
			height: 332rpx;
			background-color: #ccc;
		}
	}
	.item-info {
		width: 650rpx;
		margin: 20rpx auto 0;
		font-weight: 400;
		font-size: 26rpx;
		color: #3b3b3b;
		line-height: 60rpx;
		text-align: left;
	}
}
</style>
