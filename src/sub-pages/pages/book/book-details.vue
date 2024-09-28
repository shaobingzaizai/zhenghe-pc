<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-09 21:50:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-15 21:55:14
 * @FilePath: /zhenghe/src/sub-pages/pages/book/book-details.vue
 * @Description: 预约详情
-->
<template>
	<CommonPage
		:is-back="true"
		color="#fff"
		bg-color="#96856C"
		background-color="#96856C"
	>
		<view class="content">
			<view class="title" :class="{ _h5: isH5 }">
				<PageTitle color="#F1ECDC" title="我的预约" />
			</view>
			<view class="content-center">
				<view class="book-time">
					<view class="left">
						<view class="book-time1">参观时间</view>
						<view class="book-time2">09:00 ~ 17:00</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="book-title">
					<view class="time2">政和县博物馆参观电子票</view>
					<view class="time1">政和县博物馆地址信息位置</view>
				</view>
				<view class="book-time">
					<view class="left">
						<view class="book-time1">参观时间</view>
						<view class="book-time2">09:00 ~ 17:00</view>
					</view>
					<view class="right">
						<view class="book-time1">票类</view>
						<view class="book-time2">成人票</view>
					</view>
				</view>
				<view class="line1"></view>
				<view class="book-qr"></view>
				<view class="book-name">徐小明</view>
			</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
import { isH5 } from '@/utils/platform';

const { themeObject } = useStore('app');
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	.title {
		width: calc(100% - 60rpx);
		margin-top: 20rpx;
		margin-left: 60rpx;
		&._h5 {
			margin-top: 40rpx;
		}
	}
	.content-center {
		width: 652rpx;
		margin: 60rpx auto 0;
		background-color: #f1ecdc;
		border-radius: 25rpx;
		min-height: 300rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		padding-bottom: 60rpx;

		.book-time {
			width: 88%;
			margin-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				flex: 2;
			}
			.right {
				width: 140rpx;
			}
			.book-time1 {
				font-size: 20rpx;
				color: #898279;
				font-weight: 500;
			}
			.book-time2 {
				font-size: 40rpx;
				color: #221715;
				font-weight: bold;
			}
		}

		.line {
			margin: 40rpx 0;
			width: 90%;
			height: 0;
			border-top: 4rpx dashed #96856c;
			position: relative;

			&::after {
				position: absolute;
				top: -20rpx;
				left: -50rpx;
				content: '';
				width: 40rpx;
				height: 40rpx;
				border-radius: 20rpx;
				background-color: #96856c;
			}
			&::before {
				position: absolute;
				top: -20rpx;
				right: -50rpx;
				content: '';
				width: 40rpx;
				height: 40rpx;
				border-radius: 20rpx;
				background-color: #96856c;
			}
		}
		.line1 {
			width: 90%;
			height: 2rpx;
			background-color: #ccc;
			margin: 20rpx 0 40rpx;
		}

		.book-title {
			width: 88%;
			> .time1 {
				font-size: 24rpx;
				color: #898279;
				font-weight: 500;
			}
			> .time2 {
				font-size: 43rpx;
				color: #221715;
				font-weight: bold;
			}
		}

		.book-qr {
			margin-top: 40rpx;
			width: 400rpx;
			height: 400rpx;
			background-color: #ccc;
		}
		.book-name {
			margin-top: 40rpx;
			color: #221715;
			font-size: 54rpx;
			font-weight: bold;
		}
	}
}
</style>
