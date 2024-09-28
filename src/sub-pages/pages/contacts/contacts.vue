<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 16:59:59
 * @FilePath: /zhenghe/src/sub-pages/pages/contacts/contacts.vue
 * @Description: 交通路线
-->
<template>
	<CommonPage
		:is-back="true"
		:title="title"
		color="#fff"
		bg-color="#96856C"
		background-color="transparent"
	>
		<view class="content">
			<view class="add-contacts" @click="jumpAdd">
				<text class="iconfont icon-Add icon"></text>
				新增联系人
			</view>
			<view class="contacts-list">
				<view class="contacts-item">
					<view v-if="formPage === 'book'" class="item-left">
						<MyRadio v-model="isSelected" />
					</view>
					<view class="item-center">
						<view class="item-name">烧饼仔</view>
						<view class="item-idCard">4123232322212123312</view>
					</view>
					<view class="item-right">
						<text class="iconfont icon-edit edit"></text>
						<text class="iconfont icon-delete delete"></text>
					</view>
				</view>
				<view class="contacts-item">
					<view class="item-left">
						<MyRadio v-model="isSelected" />
					</view>
					<view class="item-center">
						<view class="item-name">烧饼仔</view>
						<view class="item-idCard">4123232322212123312</view>
					</view>
					<view class="item-right">
						<text class="iconfont icon-edit edit"></text>
						<text class="iconfont icon-delete delete"></text>
					</view>
				</view>
			</view>
			<view class="content-bottom-blank"></view>
			<view v-if="formPage === 'book'" class="content-bottom">
				<view class="bottom-button cancel" @click="cancel">取消</view>
				<view class="bottom-button" @click="sure">确认</view>
			</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
const title = ref('常用联系人');
const isSelected = ref<boolean>(false);
const formPage = ref<string>('');

const jumpAdd = () => {
	uni.navigateTo({
		url: '/sub-pages/pages/contacts/contacts-add'
	});
};

const cancel = () => {
	uni.navigateBack();
};
const sure = () => {};

onLoad((options: any) => {
	formPage.value = options?.form || '';
});
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
	width: 690rpx;
	margin: 0 auto;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;

	.add-contacts {
		width: 100%;
		height: 100rpx;
		border: 2rpx dashed #d7cfbc;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #96856c;
		font-size: 26rpx;
		background-color: #f4f1e5;
		margin: 40rpx 0;
		font-weight: 400;

		.icon {
			font-size: 20rpx;
			margin-right: 6rpx;
		}
	}

	.contacts-list {
		width: 100%;
		.contacts-item {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 30rpx 0;
			border-bottom: 2rpx solid #d7cfbc;
			.item-left {
				margin-top: 6rpx;
				margin-right: 8rpx;
			}

			.item-center {
				flex: 1;
				color: #4d4d4d;
				font-size: 24rpx;
				font-weight: 500;
				.item-idCard {
					margin-top: 10rpx;
				}
			}
			.item-right {
				font-size: 28rpx;
				color: #9d9180;
				.edit {
					margin-right: 20rpx;
				}
				.delete {
					font-size: 32rpx;
				}
			}
		}
	}

	.content-bottom-blank {
		width: 100%;
		padding-bottom: calc(110rpx + env(safe-area-inset-bottom) / 2);
	}
	.content-bottom {
		position: fixed;
		bottom: 0;
		left: 50%;
		width: 690rpx;
		transform: translateX(-50%);
		height: calc(110rpx + env(safe-area-inset-bottom) / 2);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		background-color: #f1ecdc;

		.bottom-button {
			margin-top: 16rpx;
			background-color: #96856c;
			border: 2rpx solid #96856c;
			height: 80rpx;
			width: 48%;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			font-size: 34rpx;
			font-weight: 600;
			&.cancel {
				background-color: transparent;
				color: #96856c;
			}
		}
	}
}
</style>
