src/sub-pages/pages/number-relic/relic-details.vue
<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 17:31:12
 * @FilePath: /zhenghe/src/sub-pages/pages/number-relic/relic-details.vue
 * @Description: 
-->
<template>
	<CommonPage
		fixed="fixed"
		:is-back="true"
		color="#fff"
		:title="title"
		bg-color="transparent"
		background-color="transparent"
	>
		<view class="content">
			<image
				class="home-bg"
				mode="widthFix"
				:src="`${envApi.imgBaseUrl}/book/details-bg.png`"
			/>
			<view class="title-content">
				<view class="title">{{ detailsInfo?.title }}</view>
				<view class="sub-info">
					<view class="sub-title sub">年代</view>
					<view class="sub-title">
						{{ detailsInfo?.historicalEraRange }}
					</view>
					<view class="sub-title sub">分类</view>
					<view class="sub-title">
						{{ detailsInfo?.classification }}
					</view>
				</view>
				<image class="info-image" :src="detailsInfo?.imgResource" />
			</view>

			<view class="info-content">
				<view class="line"></view>

				<view class="info-title">
					<mp-html
						:preview-img="false"
						:containerStyle="'white-space: pre-wrap'"
						:content="
							detailsInfo?.description
								? richText(detailsInfo.description)
								: ''
						"
					/>
				</view>
			</view>

			<view class="bottom-content">
				<view class="bottom-con">
					<view class="bottom-left bottom-button">
						<image
							class="left-icon"
							:src="`${envApi.imgBaseUrl}/retic/share.png`"
						/>
					</view>
					<view class="bottom-center bottom-button">
						<image
							class="center-icon"
							:src="`${envApi.imgBaseUrl}/retic/3d.png`"
						/>
						<view class="center-text">查看3D效果</view>
					</view>
					<view class="bottom-left bottom-button">
						<image
							class="left-icon"
							:src="`${envApi.imgBaseUrl}/retic/collect.png`"
						/>
					</view>
				</view>
			</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
import envApi from '@/config/env';
import SubApi from '@/sub-pages/api/sub-api';
import * as SubApiType from '../../api/type/sub-api.d';
// @ts-ignore
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html';
import { richText } from '@/utils';

const { themeObject } = useStore('app');
const Id = ref();
const title = ref('详情');
const detailsInfo = ref<SubApiType.RelicListResp>();

const init = async (id: string) => {
	const res = await SubApi.queryRelicDetails({ id: id || Id.value });
	if (res.code === 0) {
		detailsInfo.value = res.data;
	}
};

onLoad(async (options) => {
	console.log('op', options);
	Id.value = options?.id;
	title.value = options?.title;
	if (!options?.id) return;
	await init(options?.id);
});
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	// height: 100%;
	position: relative;
	overflow: auto;
	margin-bottom: calc(110rpx + env(safe-area-inset-bottom) / 2);
	.home-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 710rpx;
	}

	.title-content {
		margin-top: 180rpx;
		margin-left: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-direction: column;
		height: 420rpx;
		width: calc(100% - 40rpx);
		position: relative;
		.title {
			font-size: 47rpx;
			color: #f1ecdc;
			font-weight: 600;
		}
		.sub-info {
			.sub-title {
				font-size: 47rpx;
				color: #f1ecdc;
				font-weight: 600;
				&.sub {
					margin-top: 30rpx;
					color: #ccc;
					font-size: 24rpx;
				}
			}
		}
		.info-image {
			position: absolute;
			bottom: -100rpx;
			right: 80rpx;
			width: 305rpx;
			height: 296rpx;
			background-color: #ccc;
		}
	}

	.info-content {
		margin-top: 40rpx;
		width: 100%;
		min-height: 400rpx;
		border-radius: 30rpx 30rpx 0 0;
		background-color: v-bind('themeObject.themeBgColor');
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;

		.line {
			width: 630rpx;
			height: 2rpx;
			background-color: #ccc;
			margin-top: 100rpx;
			margin-bottom: 30rpx;
		}
		.info-title {
			width: 630rpx;
			line-height: 50rpx;
			color: #3b3b3b;
			font-size: 26rpx;
			font-weight: 500;
			// text-indent: 1em; /* 设置首行缩进为2em */
		}
	}

	.bottom-content {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100vw;
		height: calc(110rpx + env(safe-area-inset-bottom) / 2);
		background-color: v-bind('themeObject.themeBgColor');

		.bottom-con {
			width: calc(100% - 60rpx);
			margin: 10rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.bottom-button {
				display: flex;
				justify-content: center;
				align-items: center;
				border: 2rpx solid #96856c;
				border-radius: 8rpx;
			}

			.bottom-left {
				width: 110rpx;
				height: 88rpx;

				.left-icon {
					width: 56rpx;
					height: 56rpx;
				}
			}

			.bottom-center {
				width: 400rpx;
				height: 88rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.center-icon {
					width: 58rpx;
					height: 47rpx;
					margin-right: 16rpx;
				}
				.center-text {
					color: #96856c;
					font-size: 32rpx;
					font-weight: 600;
				}
			}
		}
	}
}
</style>
