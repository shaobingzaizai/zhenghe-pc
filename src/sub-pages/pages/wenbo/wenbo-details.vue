<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-09 21:50:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-20 21:15:13
 * @FilePath: /zhenghe/src/sub-pages/pages/wenbo/wenbo-details.vue
 * @Description: 咨询
-->
<template>
	<CommonPage
		:is-back="true"
		bg-color="transparent"
		color="#fff"
		background-color="#96856C"
	>
		<view class="content">
			<view class="content-list">
				<view class="scroll-view">
					<view class="scroll-item">
						<view class="item-title">
							{{ details?.title }}
						</view>
						<view class="item-info">
							<mp-html
								:preview-img="false"
								:containerStyle="'white-space: pre-wrap'"
								:content="
									details?.content
										? richText(details.content)
										: ''
								"
							/>
						</view>
						<image
							class="item-image"
							:src="details?.picUrl"
							mode="aspectFill"
						/>
						<view class="item-time">
							发表于：{{ details?.createTime || '' }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
import SubApi from '@/sub-pages/api/sub-api';
import * as SubApiType from '../../api/type/sub-api.d';
// @ts-ignore
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html';
import { richText } from '@/utils';

const id = ref();
const details = ref<SubApiType.ArticleListResp>();

const init = async (id: number) => {
	const res = await SubApi.queryArticleDetails({ id });
	if (res.code === 0) {
		details.value = res.data as SubApiType.ArticleListResp;

		uni.setNavigationBarTitle({
			title: res.data?.title || '详情',
			success: function () {
				console.log('标题设置成功');
			},
			fail: function (err) {
				console.error('标题设置失败', err);
			}
		});
	}
};

onLoad((options: any) => {
	if (options?.id) {
		id.value = options.id;
		init(Number(options.id));
	}
});
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: calc(100% - 20rpx);
	margin-top: 20rpx;
	background-color: #fffbef;
	border-radius: 20rpx 20rpx 0 0;

	.content-list {
		width: 100%;
		height: 100%;

		.scroll-view {
			width: 100%;

			.scroll-item {
				padding: 40rpx;

				.item-title {
					font-weight: bold;
					font-size: 36rpx;
					color: #4d4840;
					line-height: 61rpx;
				}
				.item-info {
					padding: 0 10rpx;
					margin-top: 20rpx;
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
