<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 15:19:03
 * @FilePath: /zhenghe/src/sub-pages/pages/interact/interact.vue
 * @Description: 留言列表
-->
<template>
	<CommonPage
		:is-back="true"
		title="互动留言"
		color="#fff"
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
					<view
						v-for="item in dataList"
						:key="item.id"
						class="scroll-item"
					>
						<view class="avatar">
							<image
								class="avatar-img"
								:src="item.memberAvatar"
							/>
							<text class="avatar-name">
								{{ item.nickname }}
							</text>
						</view>
						<view class="interact">
							<view class="interact-time">
								{{ dateFormart(Number(item.createTime)) }}
							</view>
							<view class="interact-info">
								{{ item.content }}
							</view>
						</view>
						<view v-if="item.replyContent" class="repaly">
							<text class="repaly-name">
								{{ item.replyUserName }}回复：
							</text>
							{{ item.replyContent }}
						</view>
					</view>

					<view class="scroll-bottom"></view>
				</view>
			</scroll-view>
		</view>
		<view class="interact-edit" @click="jumpEdit">
			<image :src="`${envApi.imgBaseUrl}/my/interact-edit.png`" />
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
import envApi from '@/config/env';
import { usePagination } from '@/hooks/use-pagination';
import SubApi from '@/sub-pages/api/sub-api';
import * as SubApiType from '../../api/type/sub-api.d';
import { dateFormart } from '@/utils';

const pageNo = 1;
const pageSize = 20;
const implementBoolean = false;
const { dataList, loading, endReached, loadMore } =
	usePagination<SubApiType.InteractListResp>(
		SubApi.queryInteractList,
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

const jumpEdit = () => {
	uni.navigateTo({
		url: '/sub-pages/pages/interact/interact-edit'
	});
};

onLoad(async () => {
	await loadMore('reload');
	console.log('daa', dataList);
});
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
				width: 676rpx;
				padding-top: 40rpx;
				margin: auto;

				.avatar {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.avatar-img {
						width: 82rpx;
						height: 82rpx;
						border-radius: 50%;
						margin-right: 20rpx;
						background-color: #ccc;
					}
					.avatar-name {
						font-weight: bold;
						font-size: 30rpx;
						color: #3c3c3d;
						display: -webkit-box;
						overflow: hidden;
						-webkit-line-clamp: 1;
						text-overflow: ellipsis;
						word-break: break-all;
						-webkit-box-orient: vertical;
						max-width: 400rpx;
					}
				}
				.interact {
					margin-top: 20rpx;
					width: calc(100% - 64rpx);
					padding: 20rpx 32rpx;
					background-color: #f8f5ed;
					border-radius: 12rpx;

					.interact-time {
						font-weight: 400;
						font-size: 20rpx;
						color: #96856c;
					}

					.interact-info {
						font-weight: 400;
						font-size: 28rpx;
						color: #272727;
						margin-top: 20rpx;
					}
				}

				.repaly {
					margin-top: 20rpx;
					width: calc(100% - 64rpx);
					padding: 20rpx 32rpx;
					border-radius: 12rpx;
					background-color: #d1bd98;
					font-weight: 400;
					font-size: 28rpx;
					color: #272727;

					.repaly-name {
						color: #957443;
					}
				}
			}
		}
	}
}
.interact-edit {
	position: fixed;
	bottom: 100rpx;
	right: 50rpx;
	width: 154rpx;
	height: 154rpx;

	> image {
		width: 100%;
		height: 100%;
	}
}
</style>
