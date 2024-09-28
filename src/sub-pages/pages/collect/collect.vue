<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 10:32:11
 * @FilePath: /zhenghe/src/sub-pages/pages/collect/collect.vue
 * @Description: 
-->
<template>
	<CommonPage
		:is-back="true"
		bg-color="transparent"
		background-color="transparent"
		:title="title"
	>
		<view class="content">
			<scroll-view class="content-scroll">
				<view class="scroll-list">
					<view class="list-item" @click="jumpDeytails">
						<image class="item-img" />
					</view>
					<view class="list-item">
						<image class="item-img" />
					</view>
					<view class="list-item">
						<image class="item-img" />
					</view>
					<view class="list-item">
						<image class="item-img" />
					</view>
					<view class="list-item">
						<image class="item-img" />
					</view>
					<view class="list-item">
						<image class="item-img" />
					</view>
					<view class="list-item">
						<image class="item-img" />
					</view>
				</view>
			</scroll-view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
const title = ref('我的收藏');
const id = ref();

const jumpDeytails = () => {
	uni.navigateTo({
		url: `/sub-pages/pages/number-relic/relic-details?id=${1}&title=铜钱details`
	});
};

onLoad((options) => {
	id.value = options?.id;
	title.value = options?.title;
});
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: calc(100% - 20rpx);
	margin-top: 20rpx;
	.content-scroll {
		width: 100%;
		height: 100%;

		.scroll-list {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			.list-item {
				width: 248rpx;
				height: 247rpx;
				background: linear-gradient(180deg, #0f090b 0%, #afafb1 100%);
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 10rpx;

				.item-img {
					width: 180rpx;
					height: 180rpx;
				}
			}
		}
	}
}
</style>
