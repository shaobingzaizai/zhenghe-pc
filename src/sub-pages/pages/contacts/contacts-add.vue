<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-08 21:41:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 16:59:55
 * @FilePath: /zhenghe/src/sub-pages/pages/contacts/contacts-add.vue
 * @Description: 新增联系人
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
			<view class="item">
				<view class="label">姓名</view>
				<view class="item-input">
					<input
						v-model="form.name"
						placeholder="请输入真实姓名"
						maxlength="20"
						confirm-type="done"
					/>
				</view>
			</view>
			<view class="item">
				<view class="label">身份证</view>
				<view class="item-input">
					<input
						v-model="form.idCard"
						placeholder="请输入身份证"
						maxlength="20"
						confirm-type="done"
						type="idCard"
					/>
				</view>
			</view>
			<view class="item">
				<view class="label">手机号</view>
				<view class="item-input">
					<input
						v-model="form.phone"
						placeholder="请输入手机号"
						maxlength="20"
						confirm-type="done"
						type="tel"
					/>
				</view>
			</view>
			<view class="item">
				<view class="label">验证码</view>
				<view class="item-input">
					<input
						v-model="form.modify"
						placeholder="请输入验证码"
						maxlength="20"
						confirm-type="done"
						type="number"
					/>
				</view>
				<view class="modify" @click="getModify">
					{{ timer ? `${times}s` : '获取验证码' }}
				</view>
			</view>
			<view class="content-bottom-blank"></view>
			<view class="content-bottom">
				<view class="bottom-button cancel" @click="cancel">取消</view>
				<view class="bottom-button" @click="sure">确认</view>
			</view>
		</view>
	</CommonPage>
</template>

<script lang="ts" setup>
const title = ref('新增联系人');
const form = reactive({
	name: '',
	idCard: '',
	phone: '',
	modify: ''
});
const timer = ref();
const times = ref<number>(60);

/**
 * 获取验证码
 */
const getModify = () => {
	if (timer.value) return;
	if (!form.phone) {
		uni.showToast({
			title: '请输入手机号',
			icon: 'none'
		});
		return;
	}
	if (!/^1\d{10}$/.test(form.phone)) {
		uni.showToast({
			title: '请输入正确的手机号',
			icon: 'none'
		});
		return;
	}
	timer.value = setInterval(() => {
		times.value -= 1;
		if (times.value === 0) {
			clearInterval(timer.value);
			timer.value = undefined;
		}
	}, 1000);
};

const cancel = () => {
	uni.navigateBack();
};
const sure = () => {};

onUnmounted(() => {
	timer.value && clearInterval(timer.value);
	timer.value = undefined;
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

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 40rpx;

		.label {
			text-align: left;
			width: 100rpx;
			color: #191919;
			font-weight: 600;
			font-size: 26rpx;
		}
		.item-input {
			flex: 1;
			height: 100rpx;
			border: 2rpx solid #96856c;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background-color: #fff;

			> input {
				margin-left: 30rpx;
				width: 90%;
				height: 50rpx;
				border: none;
				font-size: 26rpx;
				color: #191919;
			}
		}
		.modify {
			margin-left: 10rpx;
			width: 246rpx;
			height: 100rpx;
			color: #96856c;
			font-size: 26rpx;
			border: 2rpx solid #96856c;
			line-height: 100rpx;
			text-align: center;
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
