<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-02 21:36:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-28 21:49:22
 * @FilePath: /zhenghe-pc/src/components/nav-bar/nav-bar.vue
 * @Description: 
-->
<template>
	<view class="nav-content" :class="{ height0: isHeight }">
		<view class="nav-bar" :class="{ trans: isTrans }">
			<view class="nav-left">
				<image :src="`${envApi.imgPcUrl}/home/zhenghe-icon.png`" />
			</view>
			<view class="nav-center">
				<view class="nav-list">
					<view
						v-for="item in navList"
						:key="item.value"
						class="nav-item"
						:class="{ active: selectNav === item.value }"
						@click="jumpPages(item)"
					>
						{{ item.label }}
					</view>
				</view>
			</view>
			<view class="nav-right">
				<text class="font1">微信小程序</text>
				<text class="iconfont icon-down icon"></text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import envApi from '@/config/env';

/**
 * 父类事件
 */
const emits = defineEmits<{
	(e: 'back', item: any): void;
}>();
const { themeObject } = useStore('app');

/**
 *  父类传参
 */
const props = defineProps({
	isTrans: { type: Boolean, default: false }, // 背景色
	isHeight: { type: Boolean, default: false },
	selectNav: { type: String, default: 'home' }
});

const navList = reactive([
	{ value: 'home', label: '首页' },
	{ value: 'intro', label: '简介' },
	{ value: 'exibition', label: '展览' },
	{ value: 'relic', label: '文物' },
	{ value: 'message', label: '资讯' },
	{ value: 'service', label: '服务' }
]);

const jumpPages = (item: any) => {
	switch (item.value) {
		case 'home': // 博物馆介绍
			uni.navigateTo({
				url: '/pages/home/home'
			});
			break;
		case 'intro': // 博物馆介绍
			uni.navigateTo({
				url: '/sub-pages/pages/introduce/introduce'
			});
			break;
		case 'relic': // 数字文物
			uni.navigateTo({
				url: '/sub-pages/pages/number-relic/number-relic'
			});
			break;
		case 'exhibition': // 展览展馆
			uni.navigateTo({
				url: '/sub-pages/pages/exhibition/exhibition'
			});
			break;
		case 'message': // 文博资讯
			uni.navigateTo({
				url: '/sub-pages/pages/wenbo/wenbo-list'
			});
			break;
		case 'service': // 交通线路
			uni.navigateTo({
				url: '/sub-pages/pages/traffic/traffic'
			});
			break;
	}
};

// 判断当前页面前是否有页面
const firstLevel = ref(true);
</script>

<style lang="scss" scoped>
.nav-content {
	width: 100%;
	height: 112rpx;

	&.height0 {
		height: 0;
	}
	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100vw;
		height: 112rpx;
		background-color: v-bind('themeObject.themeColor');
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: all 0.4s ease-in-out;
		border-bottom: 1rpx solid #e6e0cb;

		&.trans {
			background-color: transparent;
		}

		.nav-left {
			width: 206rpx;
			height: 54rpx;
			margin-left: 48rpx;
			> image {
				width: 100%;
				height: 100%;
			}
		}
		.nav-center {
			flex: 1;
			justify-content: center;
			align-items: center;
			display: flex;
			min-width: 800rpx !important;
			height: 100%;

			.nav-list {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;

				.nav-item {
					width: 78rpx;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 400;
					font-size: 26rpx;
					color: #eee9d1;
					font-weight: 400;
					transition: all 0.2s ease-in-out;
					background-color: transparent;
					margin: 0 30rpx;

					&.active {
						background-color: #762718;
					}
				}
			}
		}

		.nav-right {
			margin-right: 48rpx;
			width: 160rpx;
			height: 47rpx;
			border: 2rpx solid #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 24rpx;

			.font1 {
				font-weight: 400;
				font-size: 18rpx;
				color: #ffffff;
			}
			.icon {
				font-size: 20rpx;
				color: #ffffff;
				margin-left: 6rpx;
			}
		}
	}
}

.row-center-start {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.row-center-center {
	display: flex;
	align-items: center;
	justify-content: center;
}
.flex-row-between {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
