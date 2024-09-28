<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-09 21:50:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-20 22:28:34
 * @FilePath: /zhenghe/src/sub-pages/pages/wenbo/wenbo-list.vue
 * @Description: 咨询
-->
<template>
	<CommonPage
		:is-back="true"
		title="咨询"
		bg-color="transparent"
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
					<view
						v-for="item in dataList"
						:key="item?.id"
						class="scroll-item"
						@click="jumpDetails(item)"
					>
						<view class="item-title">
							{{ item?.title || '' }}
						</view>
						<view class="item-info">
							{{ htmlToText(item?.content || '') }}
						</view>
						<image
							class="item-image"
							:src="item?.picUrl"
							mode="aspectFill"
						/>
						<view class="item-time">
							发表于：{{ item.createTime || '' }}
						</view>
					</view>
					<view class="scroll-bottom"></view>
				</view>
			</scroll-view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
import SubApi from '@/sub-pages/api/sub-api';
import * as SubApiType from '../../api/type/sub-api.d';
import { usePagination } from '@/hooks/use-pagination';
import { htmlToText } from '@/utils';

const jumpDetails = (item: SubApiType.ArticleListResp) => {
	uni.navigateTo({
		url: '/sub-pages/pages/wenbo/wenbo-details?id=' + item.id
	});
};

const pageNo = 1;
const pageSize = 20;
const implementBoolean = false;
const { dataList, loading, endReached, loadMore } =
	usePagination<SubApiType.ArticleListResp>(
		SubApi.queryArticleList,
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

onLoad(async () => {
	await loadMore('reload');
});
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: calc(100% - 20rpx);

	.content-list {
		width: 100%;
		height: 100%;

		.scroll-view {
			width: 100%;
			height: calc(100% - 30rpx);
			margin-top: 30rpx;

			.scroll-item {
				width: calc(100% - 80rpx);
				padding: 40rpx;
				background-color: #fffbef;
				border-radius: 20rpx;
				margin-bottom: 30rpx;

				.item-title {
					font-weight: bold;
					font-size: 36rpx;
					color: #4d4840;
					line-height: 61rpx;
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-box-orient: vertical;
				}
				.item-info {
					margin-top: 20rpx;
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-box-orient: vertical;
					font-weight: 400;
					font-size: 26rpx;
					color: #3b3b3b;
					line-height: 60rpx;
				}

				.item-image {
					width: 100%;
					height: 356rpx;
					margin: 30rpx 0 16rpx;
					background-color: #eee;
				}

				.item-time {
					font-weight: 400;
					font-size: 26rpx;
					color: #342e25;
					line-height: 44rpx;
					text-align: left;
				}
			}
		}
	}
}
</style>
