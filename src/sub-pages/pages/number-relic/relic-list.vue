<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 17:44:37
 * @FilePath: /zhenghe/src/sub-pages/pages/number-relic/relic-list.vue
 * @Description: 
-->
<template>
	<CommonPage
		:is-back="true"
		bg-color="transparent"
		background-color="transparent"
		:title="title"
	>
		<view class="content">
			<scroll-view
				class="content-scroll"
				:scroll-y="true"
				@scrolltolower="scrolltolower"
				@scrolltoupper="scrolltoupper"
			>
				<view class="scroll-list">
					<view
						v-for="item in dataList"
						:key="item.id"
						class="list-item"
						@click="jumpDeytails(item)"
					>
						<image class="item-img" :src="item.cover" />
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
const title = ref('铜钱');
const type = ref();

const jumpDeytails = (item: SubApiType.RelicListResp) => {
	uni.navigateTo({
		url: `/sub-pages/pages/number-relic/relic-details?id=${item.id}&title=${item.title}`
	});
};
const pageNo = 1;
const pageSize = 60;
const implementBoolean = false;
const { dataList, loading, endReached, loadMore } =
	usePagination<SubApiType.RelicListResp>(
		SubApi.queryRelicList,
		{},
		pageSize,
		pageNo,
		implementBoolean
	);

/**
 * 下拉刷新
 */
const scrolltoupper = () => {
	loadMore('reload', { classification: type.value });
};

/**
 * 上拉加载
 */
const scrolltolower = () => {
	loadMore('addMore', { classification: type.value });
};

onLoad(async (options) => {
	type.value = options?.type;
	title.value = options?.title;
	await loadMore('reload', { classification: options?.type });
});
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: calc(100% - 20rpx);
	margin-top: 20rpx;
	.content-scroll {
		width: 100%;
		height: 100%;

		.scroll-list {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			.list-item {
				width: 248rpx;
				height: 247rpx;
				background: linear-gradient(180deg, #0f090b 0%, #afafb1 100%);
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 10rpx;

				.item-img {
					width: 180rpx;
					height: 180rpx;
				}
			}
		}
	}
}
</style>
