<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-22 20:31:09
 * @FilePath: /zhenghe-pc-vue/src/pages/my/my.vue
 * @Description: 
-->
<template>
	<CommonPage fixed="static" :is-back="false" title="">
		<view class="content">
			<view class="home-bg">
				<image
					class="bg-image"
					:class="{ _h5: isH5 }"
					mode="widthFix"
					:src="`${envApi.imgBaseUrl}/home/home-bg.png`"
				/>
			</view>

			<view class="my-header" :class="{ _h5: isH5 }">
				<image class="header-image" :src="userInfo?.avatar" />
				<text v-if="isH5" class="header-text">
					{{ userInfo?.nickname ? userInfo.nickname : '请先登录' }}
				</text>
				<button v-else class="header-text" @getphonenumber="login">
					{{ userInfo?.nickname ? userInfo.nickname : '请先登录' }}
				</button>
			</view>

			<view class="my-item">
				<view
					v-for="item in myLists"
					:key="item.id"
					class="item"
					@click="jumpPage(item)"
				>
					<image class="item-right" :src="item.img" mode="widthFix" />
					<view class="item-center">
						<text class="item-text">{{ item.label }}</text>
					</view>
					<text class="iconfont item-left icon-right1" />
				</view>
			</view>
		</view>
	</CommonPage>
</template>

<script setup lang="ts">
import envApi from '@/config/env';
import { isH5 } from '@/utils/platform';
import { hostPage } from '@/utils/request';

const { themeObject } = useStore('app');
const { userInfo, getCode, miniLogin } = useStore('user');

const myLists = ref([
	{
		id: 'collect',
		img: envApi.imgBaseUrl + '/my/collect.png',
		label: '我的收藏'
	},
	{
		id: 'book',
		img: envApi.imgBaseUrl + '/my/book.png',
		label: '我的预约'
	},
	{
		id: 'phone',
		img: envApi.imgBaseUrl + '/my/phone.png',
		label: '常用联系人'
	},
	{
		id: 'service',
		img: envApi.imgBaseUrl + '/my/service.png',
		label: '联系我们'
	}
]);

const jumpPage = (item) => {
	if (!['service'].includes(item.id)) {
		if (!loginApp()) {
			return;
		}
	}
	switch (item.id) {
		case 'collect':
			uni.navigateTo({
				url: '/sub-pages/pages/collect/collect'
			});
			break;
		case 'book':
			uni.showToast({
				title: '正在赶工中...',
				icon: 'none'
			});
			// uni.navigateTo({
			// 	url: '/sub-pages/pages/book/book-list'
			// });
			break;
		case 'phone':
			uni.showToast({
				title: '正在赶工中...',
				icon: 'none'
			});
			// uni.navigateTo({
			// 	url: '/sub-pages/pages/contacts/contacts'
			// });
			break;
		case 'service':
			uni.navigateTo({
				url: '/sub-pages/pages/about/user'
			});
			break;
		default:
			break;
	}
};

/**
 * 登录
 */
const login = (e) => {
	// 获取 phoneCode
	// 1. 点击拒绝 弹窗 您已拒绝授权，请重新点击并授权
	// 2. 点击允许
	const {
		detail: { code }
	} = e;
	if (!code) {
		return uni.showToast({
			title: '您已拒绝授权，请重新点击并授权',
			icon: 'none'
		});
	}
	miniLogin(code);
};

const loginApp = () => {
	if (userInfo.value?.id) return true;
	getCode(location?.href || hostPage);
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
	.home-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 710rpx;
		z-index: 1;
		background-color: v-bind('themeObject.temeHightBgColor');
		.bg-image {
			position: absolute;
			top: 80rpx;
			right: 0;
			width: 360rpx;
			height: 200rpx;
			&._h5 {
				top: 0rpx;
			}
		}
	}

	.my-header {
		margin-top: 200rpx;
		margin-left: 50rpx;
		width: calc(100% - 50rpx);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		z-index: 10;
		&._h5 {
			margin-top: 100rpx;
		}

		.header-image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			background-color: #eee;
			margin-right: 30rpx;
		}
		.header-text {
			box-sizing: border-box;
			margin: 0;
			background-color: transparent;
			border: none;
			font-size: 36rpx;
			color: v-bind('themeObject.titleColor');
			font-weight: 600;
		}
	}

	.my-item {
		margin-top: 100rpx;
		height: calc(100% - 100rpx);
		width: 100%;
		background-color: v-bind('themeObject.themeBgColor');
		border-radius: 30rpx 30rpx 0 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		z-index: 10;

		.item {
			width: 662rpx;
			height: 110rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid v-bind('themeObject.lineColor');
			&:nth-child(1) {
				margin-top: 30rpx;
			}

			.item-right {
				width: 30rpx;
				height: 40rpx;
				margin-right: 26rpx;
			}
			.item-center {
				flex: 1;
				.item-text {
					color: v-bind('themeObject.titleColor');
					width: 540rpx;
					overflow: hidden; // 溢出部分隐藏
					text-align: center;
					text-overflow: ellipsis; // 显示省略号
					white-space: nowrap; // 文字不换行
				}
			}
			.item-left {
				font-size: 30rpx;
				color: v-bind('themeObject.titleColor');
			}
		}
	}
}
</style>
