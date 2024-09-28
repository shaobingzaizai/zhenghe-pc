<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-20 23:23:24
 * @FilePath: /zhenghe/src/sub-pages/pages/interact/interact-edit.vue
 * @Description: 交通路线
-->
<template>
	<CommonPage
		:is-back="true"
		title="写留言"
		color="#fff"
		bg-color="#96856C"
		background-color="transparent"
	>
		<view class="content">
			<view class="content-text">
				<textarea v-model="content" placeholder="请输入留言内容" />
			</view>
			<view class="anonymity">
				<MyRadio v-model="anonymous" />
				匿名
			</view>
			<view
				class="button"
				:class="{ opacity: content.length === 0 }"
				@click="submitMessage"
			>
				提交
			</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
import SubApi from '@/sub-pages/api/sub-api';

const content = ref('');
const anonymous = ref<boolean>(false);

const submitMessage = async () => {
	if (content.value.length > 0) {
		const params = {
			content: content.value,
			anonymous: anonymous.value
		};
		uni.showLoading();
		try {
			const res = await SubApi.addInteract(params);
			uni.hideLoading();
			if (res.code === 0) {
				uni.showToast({
					title: '发布成功',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack();
				});
			}
		} catch (error) {
			uni.hideLoading();
			uni.showToast({
				title: '发布失败',
				icon: 'none'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 690rpx;
	height: 100%;
	margin: 0 auto;

	.content-text {
		margin-top: 40rpx;
		width: 100%;
		border: 2rpx solid #d8c9cc;
		height: 400rpx;
		background-color: #fff;

		> textarea {
			width: 96%;
			height: 90%;
			margin: 20rpx auto;
		}
	}

	.anonymity {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 10rpx;
		width: 100%;
	}

	.button {
		width: 100%;
		margin-top: 40rpx;
		background-color: #96856c;
		line-height: 100rpx;
		height: 100rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		font-weight: 600;
		&.opacity {
			opacity: 0.6;
		}
	}
}
</style>
