<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-16 17:03:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 17:56:20
 * @FilePath: /zhenghe/src/components/info-card/info-card.vue
 * @Description: 
-->
<template>
	<view class="info-view">
		<view class="info-top">
			<view class="info-label">徐小明</view>
			<view class="info-right">
				<text class="iconfont icon-edit edit"></text>
				<text class="iconfont icon-delete delete"></text>
			</view>
		</view>
		<view class="info-top">
			<view class="info-label">
				特色展现
				<text class="font1">免费</text>
			</view>
			<view class="info-right" @click="openDetails">详情</view>
		</view>
		<view class="info-top">
			<view class="info-label">随行儿童</view>
			<view class="info-right">
				<view class="number-card">
					<view class="card-left" @click="numberChange('sub')">
						-
					</view>
					<view class="card-center">{{ number }}</view>
					<view class="card-right" @click="numberChange('add')">
						+
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
const emits = defineEmits(['openModal']);
const number = ref<number>(0);

const numberChange = (type: string) => {
	if (type === 'sub') {
		number.value = number.value - 1;
	}
	if (type === 'add') {
		number.value = number.value + 1;
	}
	if (number.value < 0) {
		number.value = 0;
	}
	if (number.value > 99) {
		number.value = 99;
	}
};

const openDetails = () => {
	emits('openModal');
};
</script>

<style lang="scss" scoped>
.info-view {
	width: calc(100% - 4rpx);
	border: 2rpx dashed #d7cfbc;
	background-color: #f4f1e5;
	.info-top {
		width: calc(100% - 60rpx);
		padding: 0 30rpx;
		height: 110rpx;
		border-bottom: 2rpx solid #d7cfbc;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&:nth-child(3) {
			border-bottom: none;
		}

		.info-label {
			color: #4d4d4d;
			font-size: 26rpx;
			font-weight: 500;
			.font1 {
				margin-left: 30rpx;
			}
		}
		.info-right {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #4d4d4d;
			font-size: 26rpx;
			font-weight: 500;
			.edit {
				font-size: 28rpx;
				color: #96856c;
				margin-right: 20rpx;
			}
			.delete {
				font-size: 28rpx;
				color: #96856c;
				font-size: 32rpx;
			}

			.number-card {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 180rpx;
				height: 60rpx;
				border: 2rpx solid #edeae4;
				color: #4d4d4d;
				background-color: #fff;
				.card-left {
					width: 60rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					border-right: 2rpx solid #edeae4;
				}
				.card-center {
					width: 60rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					border-right: 2rpx solid #edeae4;
				}
				.card-right {
					width: 60rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
				}
			}
		}
	}
}
</style>
