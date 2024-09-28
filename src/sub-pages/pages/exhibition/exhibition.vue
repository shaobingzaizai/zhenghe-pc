<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 18:30:16
 * @FilePath: /zhenghe/src/sub-pages/pages/exhibition/exhibition.vue
 * @Description: 
-->
<template>
	<CommonPage
		fixed="fixed"
		:is-back="true"
		bg-color="transparent"
		background-color="transparent"
	>
		<view class="content">
			<image
				class="home-bg"
				mode="widthFix"
				:src="`${envApi.imgBaseUrl}/book/book-bg.png`"
			/>
			<scroll-view
				class="center-list"
				:scroll-y="true"
				@scrolltolower="scrolltolower"
				@scrolltoupper="scrolltoupper"
			>
				<view class="title" :class="{ _h5: isH5 }">
					<PageTitle :is-show-tag="true" title="展览展馆" />
					<!-- sub-title="360°探索线上展馆" -->
				</view>
				<view class="center">
					<view
						v-for="item in dataList"
						:key="item.id"
						class="center-item"
						@click="jumpDetails(item)"
					>
						<image
							class="item-img"
							mode="aspectFill"
							:src="item.phoneCover"
						/>
						<!-- <image
						class="item-icon"
						:src="`${envApi.imgBaseUrl}/home/3d.png`"
					/> -->
						<view class="item-text">
							<view class="item-text-title">
								{{ item.hallTitle }}
							</view>
							<view class="item-text-more">了解更多</view>
						</view>
					</view>
					<view class="scroll-bottom"></view>
				</view>
			</scroll-view>
		</view>
	</CommonPage>
</template>

<script setup lang="ts">
import envApi from '@/config/env';
import { isH5 } from '@/utils/platform';
import SubApi from '@/sub-pages/api/sub-api';
import * as SubApiType from '../../api/type/sub-api.d';
import { usePagination } from '@/hooks/use-pagination';

const { themeObject } = useStore('app');

const pageNo = 1;
const pageSize = 20;
const implementBoolean = false;
const { dataList, loading, endReached, loadMore } =
	usePagination<SubApiType.ExhibitionListResp>(
		SubApi.queryExbihitionList,
		{},
		pageSize,
		pageNo,
		implementBoolean
	);

/**
 * 下拉刷新
 */
const scrolltoupper = () => {
	loadMore('reload');
};

/**
 * 上拉加载
 */
const scrolltolower = () => {
	loadMore();
};

const jumpDetails = (item: SubApiType.ExhibitionListResp) => {
	uni.navigateTo({
		url: '/sub-pages/pages/exhibition/exhibition-details?id=' + item.id
	});
};

onLoad(async () => {
	await loadMore('reload');
});
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
		z-index: -1;
	}

	.center-list {
		width: 100%;
		height: 100%;

		.title {
			width: calc(100% - 60rpx);
			margin-top: 160rpx;
			margin-left: 60rpx;
			&._h5 {
				margin-top: 40rpx;
			}
		}

		.center {
			width: 685rpx;
			margin: 60rpx auto 0;

			.center-item {
				width: 100%;
				height: 444rpx;
				margin-bottom: 37rpx;
				border-radius: 18rpx;
				background-color: #ccc;
				position: relative;

				.item-img {
					width: 100%;
					height: 100%;
					border-radius: 18rpx;
				}

				.item-icon {
					position: absolute;
					top: 24rpx;
					left: 24rpx;
					width: 58rpx;
					height: 58rpx;
				}

				.item-text {
					position: absolute;
					bottom: 60rpx;
					left: 38rpx;

					.item-text-title {
						font-size: 47rpx;
						font-weight: 600;
						color: v-bind('themeObject.whiteColor');
					}
					.item-text-more {
						font-size: 27rpx;
						font-weight: 600;
						color: v-bind('themeObject.whiteColor');
						background-color: #395860;
						border-radius: 60rpx;
						width: 176rpx;
						height: 62rpx;
						line-height: 62rpx;
						text-align: center;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
}
</style>
