<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 14:07:32
 * @FilePath: /zhenghe/src/pages/book/book.vue
 * @Description: 
-->
<template>
	<CommonPage
		fixed="fixed"
		:is-back="true"
		bg-color="transparent"
		background-color="transparent"
		:is-tab="false"
		:the-tab="2"
	>
		<view class="content">
			<image
				class="home-bg"
				mode="widthFix"
				:src="`${envApi.imgBaseUrl}/book/book-bg.png`"
			/>
			<view class="title" :class="{ _h5: isH5 }">
				<PageTitle title="参观预约" />
			</view>
			<view class="sub-title">1.参观日期</view>
			<view class="calender">
				<MyCalendar @change-date="changeDate" />
			</view>
			<view class="sub-title">2.入馆时段</view>
			<scroll-view scroll-x class="times">
				<view class="times-scroll">
					<view class="times-item">
						<text class="times-font1">09:00-13:00</text>
						<text class="times-font1 font2">余票：10</text>
					</view>
					<view class="times-item active">
						<text class="times-font1">09:00-13:00</text>
						<text class="times-font1 font2">余票：10</text>
					</view>
					<view class="times-item active">
						<text class="times-font1">09:00-13:00</text>
						<text class="times-font1 font2">余票：10</text>
					</view>
				</view>
			</scroll-view>
			<view class="agree">
				<MyRadio v-model="isChecked" />
				我已阅读《
				<text class="agree-font" @click="jumpPage">
					政和县博物馆入馆须知
				</text>
				》
			</view>
			<view class="content-bottom-blank"></view>
			<view class="content-bottom">
				<view class="bottom-button" @click="sureBooking">确认预约</view>
			</view>
		</view>
	</CommonPage>
</template>

<script setup lang="ts">
import envApi from '@/config/env';
import { isH5 } from '@/utils/platform';

const isChecked = ref<boolean>(false);
const selectDate = ref();
const selectTimes = ref();

/**
 * 修改日期
 */
const changeDate = (val) => {
	selectDate.value = val;
	console.log('val', val);
};

const jumpPage = () => {
	uni.navigateTo({
		url: '/sub-pages/pages/book/book-notice'
	});
};

/**
 * 确认预约
 */
const sureBooking = () => {
	// if (!selectDate.value) {
	// 	uni.showToast({
	// 		icon: 'none',
	// 		title: '请选择参观日期'
	// 	});
	// 	return;
	// }
	// if (!selectTimes.value) {
	// 	uni.showToast({
	// 		icon: 'none',
	// 		title: '请选择入馆时段'
	// 	});
	// 	return;
	// }
	// if (!isChecked.value) {
	// 	uni.showToast({
	// 		icon: 'none',
	// 		title: '请同意入馆须知'
	// 	});
	// 	return;
	// }
	uni.navigateTo({
		url: `/sub-pages/pages/book/book-edit?date=${selectDate.value}&times=${selectTimes.value}`
	});
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	height: 100%;
	position: relative;
	width: 690rpx;
	margin: 0 auto;
	.home-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 710rpx;
		z-index: 1;
	}

	.title {
		width: 100%;
		margin-top: 160rpx;
		margin-bottom: 20rpx;
		z-index: 10;
		&._h5 {
			margin-top: 40rpx;
		}
	}

	.sub-title {
		width: 100%;
		margin: 20rpx 0;
		color: #4d4d4d;
		font-size: 24rpx;
		font-weight: 600;
		z-index: 10;
	}

	.calender {
		width: 100%;
		background-color: #fffbec;
		z-index: 10;
	}

	.times {
		width: 100%;
		.times-scroll {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.times-item {
				min-width: 330rpx;
				margin-right: 30rpx;
				border: 2rpx solid #d1bd98;
				height: 140rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #fff;
				flex-direction: column;
				&.active {
					background-color: #d1bd98;
					.times-font1 {
						color: #fff;
					}
				}

				.times-font1 {
					color: #4d4d4d;
					font-size: 24rpx;
					font-weight: 500;
					&.font2 {
						// margin-top: 6rpx;
					}
				}
			}
		}
	}

	.agree {
		margin: 40rpx 0 0;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 22rpx;

		.agree-font {
			color: #9f2b27;
			font-size: 22rpx;
		}
	}
	.content-bottom-blank {
		width: 100%;
		padding-bottom: calc(110rpx + env(safe-area-inset-bottom) / 2);
	}
	.content-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: calc(110rpx + env(safe-area-inset-bottom) / 2);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background-color: #f1ecdc;

		.bottom-button {
			margin-top: 16rpx;
			background-color: #96856c;
			height: 80rpx;
			width: 90%;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			font-size: 34rpx;
			font-weight: 600;
		}
	}
}
</style>
