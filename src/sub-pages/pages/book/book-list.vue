<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-09 21:50:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-09 22:25:06
 * @FilePath: /zhenghe/src/sub-pages/pages/book/book-list.vue
 * @Description: 
-->
<template>
	<CommonPage
		:is-back="true"
		color="#fff"
		title="我的预约"
		bg-color="#96856C"
		background-color="transparent"
	>
		<view class="content">
			<scroll-view
				class="content-list"
				:scroll-y="true"
				@scrolltolower="scrolltolower"
				@scrolltoupper="scrolltoupper"
			>
				<view class="scroll-view">
					<view class="scroll-item" @click="jumpDetails()">
						<view class="item">
							<view class="item-title">参观时间</view>
							<view class="item-info one">
								2023年12月01日 13:00
							</view>
						</view>
						<view class="item">
							<view class="item-title">真实姓名</view>
							<view class="item-info">烧饼仔</view>
						</view>
						<view class="item">
							<view class="item-title">预约形式</view>
							<view class="item-info">个人</view>
						</view>
					</view>
					<view class="scroll-item">
						<view class="item">
							<view class="item-title">参观时间</view>
							<view class="item-info one">
								2023年12月01日 13:00
							</view>
						</view>
						<view class="item">
							<view class="item-title">真实姓名</view>
							<view class="item-info">烧饼仔</view>
						</view>
						<view class="item">
							<view class="item-title">预约形式</view>
							<view class="item-info">个人</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
const { themeObject } = useStore('app');

const jumpDetails = () => {
	uni.navigateTo({
		url: '/sub-pages/pages/book/book-details?id=1'
	});
};

/**
 * 下拉刷新
 */
const scrolltoupper = () => {};

/**
 * 上拉加载
 */
const scrolltolower = () => {};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;

	.content-list {
		width: 100%;
		height: 100%;

		.scroll-view {
			width: 100%;

			.scroll-item {
				width: calc(100% - 60rpx);
				padding: 30rpx;
				border-bottom: 2rpx solid v-bind('themeObject.lineColor');

				.item {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					height: 60rpx;
					color: #4d4d4d;
					text-align: left;

					.item-title {
						width: 160rpx;
					}
					.item-info {
						&.one {
							color: #96856c;
						}
					}
				}
			}
		}
	}
}
</style>
