<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 17:42:33
 * @FilePath: /zhenghe/src/sub-pages/pages/number-relic/number-relic.vue
 * @Description: 数字文物
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
				:src="`${envApi.imgBaseUrl}/retic/number-bg.png`"
			/>
			<view class="title" :class="{ _h5: isH5 }">
				<PageTitle title="数字文物" />
			</view>

			<view class="center">
				<view
					v-for="item in dataList"
					:key="item.classification"
					class="center-item"
					@click="jumpList(item)"
				>
					<view class="center-content">
						<view class="cont-font1">
							{{ item.classificationName }}
						</view>
						<view class="cont-font2">
							共计{{ item.count || 0 }}件
						</view>
						<image class="cont-img" />
					</view>
				</view>
			</view>
		</view>
	</CommonPage>
</template>

<script setup lang="ts">
import envApi from '@/config/env';
import { isH5 } from '@/utils/platform';
import SubApi from '@/sub-pages/api/sub-api';
import * as SubApiType from '../../api/type/sub-api.d';

const { themeObject } = useStore('app');
const dataList = ref<SubApiType.RelicClassResponse[]>([]);

const jumpList = (item: SubApiType.RelicClassResponse) => {
	uni.navigateTo({
		url: `/sub-pages/pages/number-relic/relic-list?type=${item.classification}&title=${item.classificationName}`
	});
};

const init = async () => {
	const res = await SubApi.queryRelicClass();
	if (res.code === 0 && res.data) {
		dataList.value = res.data || [];
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

	.title {
		width: calc(100% - 60rpx);
		margin-top: 160rpx;
		margin-left: 60rpx;

		&._h5 {
			margin-top: 40rpx;
		}
	}

	.center {
		width: 687rpx;
		margin-top: 60rpx;

		.center-item {
			width: 100%;
			height: 132rpx;
			margin-bottom: 26rpx;
			border-radius: 22rpx;
			background-color: #fcf8ec;
			display: flex;
			justify-content: center;
			align-items: center;

			.center-content {
				width: 671rpx;
				height: 119rpx;
				border: 2rpx solid #8b6933;
				border-radius: 22rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				position: relative;

				.cont-font1 {
					color: v-bind('themeObject.themeColor');
					font-size: 36rpx;
					font-weight: 600;
					margin-left: 50rpx;
					margin-right: 24rpx;
				}
				.cont-font2 {
					color: #ababab;
					font-size: 24rpx;
					font-weight: 600rpx;
				}

				.cont-img {
					position: absolute;
					bottom: 10rpx;
					right: 50rpx;
					width: 115rpx;
					height: 115rpx;
					background-color: #ccc;
				}
			}
		}
	}
}
</style>
