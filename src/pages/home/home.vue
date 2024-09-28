<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-02 21:37:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-28 21:44:47
 * @FilePath: /zhenghe-pc/src/pages/home/home.vue
 * @Description: 
-->
<template>
	<CommonPage :is-height="true" :is-trans="true" select-nav="home">
		<view class="content">
			<view class="top-image">
				<image
					class="top-image"
					mode="widthFix"
					:src="`${envApi.imgPcUrl}/home/home-img.png`"
				/>
				<image
					class="top-img-bg"
					mode="widthFix"
					:src="`${envApi.imgPcUrl}/home/home-image-bg.png`"
				/>
			</view>

			<!-- 公告 -->
			<view
				v-if="noticeList?.id || noticeList?.content"
				class="home-notice"
				@click="jumpNotice"
			>
				<image
					class="notice-right"
					:src="`${envApi.imgBaseUrl}/home/home-notice.png`"
				/>
				<view class="notice-center">
					<view
						class="notice-view"
						:class="{ animation: noticeList.content.length > 100 }"
					>
						<text class="notice-text">
							{{ (noticeList && noticeList?.content) || '' }}
						</text>
					</view>
				</view>
				<view class="notice-dot">
					<view class="notice-dot-item active"></view>
					<view class="notice-dot-item"></view>
					<view class="notice-dot-item"></view>
				</view>
			</view>
		</view>
	</CommonPage>
</template>

<script setup lang="ts">
import envApi from '@/config/env';
import HomeApi from '@/api/home';
import { isH5 } from '@/utils/platform';

const { themeObject } = useStore('app');

const swiperList = ref<Home.BannerListReponse[]>();

const menuList = ref([
	{
		id: 'book',
		img: envApi.imgBaseUrl + '/home/book.png',
		label: '参观预约'
	},
	{
		id: 'introduce',
		img: envApi.imgBaseUrl + '/home/introduce.png',
		label: '博物馆介绍'
	},
	{
		id: 'number',
		img: envApi.imgBaseUrl + '/home/number.png',
		label: '数字文物'
	},
	{
		id: 'exhibition',
		img: envApi.imgBaseUrl + '/home/exhibition.png',
		label: '展览展馆'
	},
	{
		id: 'wenbo',
		img: envApi.imgBaseUrl + '/home/wenbo.png',
		label: '文博资讯'
	},
	{
		id: 'traffic',
		img: envApi.imgBaseUrl + '/home/traffic.png',
		label: '交通线路'
	},
	{
		id: 'notice',
		img: envApi.imgBaseUrl + '/home/notice.png',
		label: '参观须知'
	},
	{
		id: 'interact',
		img: envApi.imgBaseUrl + '/home/interact.png',
		label: '互动留言'
	}
]);
const noticeList = ref<Home.NoticeListReponse>();

const jumpNotice = () => {
	// uni.navigateTo({
	// 	url: '/sub-pages/pages/about/notice'
	// });
};

/**
 * 初始化数据
 */
const init = async () => {
	const res = await HomeApi.getBannerList({ position: 1 });
	if (res.code === 0) {
		swiperList.value = (res.data || []) as Home.BannerListReponse[];
	}
	const noticeRes = await HomeApi.getNoticeList();
	if (noticeRes.code === 0 && noticeRes.data && noticeRes.data.length) {
		noticeList.value = noticeRes.data[0];
	}
};

onLoad(async () => {
	await init();
});
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	height: 100%;

	.top-image {
		width: 100%;
		height: auto;
		position: relative;

		> image {
			width: 100%;
			height: 100%;
		}

		.top-img-bg {
			position: absolute;
			bottom: 10rpx;
			left: 50%;
			height: auto;
			width: 36%;
			transform: translateX(-50%);
		}
	}

	.home-notice {
		width: 76%;
		height: 83rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 21rpx;
		margin: 50rpx 0;
		border: 2rpx solid #762718;

		.notice-right {
			width: 61rpx;
			height: 40rpx;
			margin-right: 20rpx;
			opacity: 0;
		}
		.notice-center {
			flex: 1;
			overflow: hidden;
			text-align: center;
			.notice-view {
				// display: flex;
				// justify-content: flex-start;
				// align-items: center;
				width: auto;
				&.animation {
					animation: scroll-notice 10s linear infinite;
				}
				.notice-text {
					white-space: nowrap;
					font-weight: bold;
					font-size: 29rpx;
					color: #3b3832;
				}
			}
		}
		@keyframes scroll-notice {
			0% {
				transform: translateX(100%);
			}
			100% {
				transform: translateX(-100%);
			}
		}

		.notice-dot {
			display: flex;
			justify-content: center;
			align-items: center;
			.notice-dot-item {
				width: 16rpx;
				height: 16rpx;
				background: #f9f6ec;
				border: 2rpx solid #762718;
				margin-right: 6rpx;
				border-radius: 16rpx;

				&.active {
					background-color: #762718;
				}
			}
		}
	}
}
</style>
