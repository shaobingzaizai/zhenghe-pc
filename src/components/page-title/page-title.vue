<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 19:52:48
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 10:09:35
 * @FilePath: /zhenghe/src/components/page-title/page-title.vue
 * @Description: 
-->
<template>
	<view class="title-content">
		<view v-if="title" class="title-one">
			<view v-if="isShowTag" :style="{ color }" class="title-left">
				「
			</view>
			<view class="title-center" :style="{ color }">{{ title }}</view>
			<view v-if="isShowTag" :style="{ color }" class="title-right">
				」
			</view>
		</view>
		<text
			v-if="subTitle"
			class="title-text"
			:style="{ fontSize: subFontSize, color }"
		>
			{{ subTitle }}
		</text>
	</view>
</template>

<script lang="ts" setup>
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		default: '#342E25'
	},
	subTitle: {
		type: String,
		default: ''
	},
	subFontSize: {
		type: String,
		default: '26rpx'
	},
	isShowTag: {
		type: Boolean,
		default: false
	}
});
const { themeObject } = useStore('app');
</script>

<style lang="scss" scoped>
.title-content {
	width: 100%;
	display: flex;
	align-items: flex-start;
	flex-direction: column;

	.title-one {
		font-size: 26rpx;
		font-weight: 500;
		color: v-bind('themeObject.blackColor');
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 70rpx;
		letter-spacing: 2rpx;
		> .title-left {
			height: 70rpx;
			display: flex;
			align-items: flex-start;
		}
		> .title-center {
			font-size: 47rpx;
		}
		> .title-right {
			height: 70rpx;
			display: flex;
			align-items: flex-end;
		}
	}

	.title-text {
		font-weight: 500;
		font-size: 26rpx;
		color: v-bind('themeObject.subTitleColor');
	}
}
</style>
