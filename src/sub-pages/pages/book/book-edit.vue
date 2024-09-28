<template>
	<CommonPage
		color="#fff"
		bg-color="#96856C"
		background-color="transparent"
		title="填写预约信息"
	>
		<view class="content">
			<view class="sub-title">参观时间</view>
			<view class="book-time">
				<picker
					mode="date"
					:value="selectdDate"
					:start="minDate"
					:end="maxDate"
					@change="bindDateChange"
				>
					<view class="item-right">
						<text class="">2024年08月19日</text>
						<text class="time-font">14:00-17:30</text>
					</view>
				</picker>
				<text class="iconfont item-left icon-right1" />
			</view>
			<view class="book-type">
				<view class="type-label">预约形式</view>
				<MyRadio v-model="form.selectType" />
				<text class="type-font">个人</text>
				<MyRadio v-model="form.selectType1" />
				<text class="type-font">团队</text>
			</view>
			<view class="sub-title">观众信息</view>
			<view class="info-card">
				<InfoCard @open-modal="openModal" />
			</view>
			<view class="add-contacts" @click="jumpSelectContact">
				<text class="iconfont icon-Add icon"></text>
				添加观众（最多5人）
			</view>

			<view class="modify-view">
				<view class="input-view">
					<text class="input-label">手机号</text>
					<input type="number" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="modify-view">
				<view class="input-view">
					<input type="number" placeholder="请输入验证码" />
				</view>
				<view class="modify" @click="getModify">
					{{ timer ? `${times}s` : '获取验证码' }}
				</view>
			</view>

			<view class="content-bottom-blank"></view>
			<view class="content-bottom">
				<view class="bottom-button" @click="submitBooking">
					提交预约
				</view>
			</view>
		</view>
	</CommonPage>
	<BaseModal v-model="isShowModal">
		<view class="modal-content">这里是想请</view>
	</BaseModal>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';

const timer = ref();
const times = ref<number>(60);
const isShowModal = ref<boolean>(false);
const selectdDate = ref();
const minDate = ref(dayjs().format('YYYY-MM-DD'));
const maxDate = ref(dayjs().add(30, 'day').format('YYYY-MM-DD'));

console.log('minDate', minDate.value, maxDate.value);

const form = reactive({
	selectType: false,
	selectType1: false,
	phone: '',
	modify: ''
});

watch(
	() => form.selectType,
	(newVal) => {
		if (newVal) {
			form.selectType1 = false;
		}
	},
	{
		immediate: true
	}
);
watch(
	() => form.selectType1,
	(newVal) => {
		if (newVal) {
			form.selectType = false;
		}
	},
	{
		immediate: true
	}
);

const jumpSelectContact = () => {
	uni.navigateTo({
		url: '/sub-pages/pages/contacts/contacts'
	});
};

const openModal = () => {
	isShowModal.value = true;
};

/**
 * 修改日期
 */
const bindDateChange = (e: any) => {
	console.log(' e.detail.value', e.detail.value);
	selectdDate.value = e.detail.value;
};

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

/**
 * 提交预约
 */
const submitBooking = () => {};
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
	.sub-title {
		width: 100%;
		text-align: left;
		color: #4d4d4d;
		font-size: 27rpx;
		font-weight: bold;
		margin: 40rpx 0 20rpx;
	}
	.book-time {
		width: 100%;
		padding: 10rpx 0 20rpx;
		color: #96856c;
		font-size: 24rpx;
		border-bottom: 2rpx solid #cdcabe;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.item-right {
			.time-font {
				margin-left: 30rpx;
			}
		}
		.item-left {
			font-size: 28rpx;
			color: #9d9d9d;
		}
	}
	.book-type {
		width: 100%;
		border-bottom: 2rpx solid #cdcabe;
		padding: 30rpx 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.type-label {
			width: 200rpx;
			text-align: left;
			color: #4d4d4d;
			font-size: 27rpx;
			font-weight: bold;
		}
		.type-font {
			color: #4d4d4d;
			font-size: 27rpx;
			font-weight: 400;
			margin: 0 50rpx 0 10rpx;
		}
	}

	.info-card {
		width: 100%;
	}

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
		margin: 30rpx 0 0;
		font-weight: 400;

		.icon {
			font-size: 20rpx;
			margin-right: 6rpx;
		}
	}

	.input-view {
		border: 2rpx solid #cdcabe;
		flex: 1;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.input-label {
			text-align: center;
			color: #4d4d4d;
			font-size: 27rpx;
			font-weight: 400;
			margin-left: 30rpx;
		}
		> input {
			flex: 1;
			margin-left: 30rpx;
			height: 50rpx;
			border: none;
			font-size: 26rpx;
			color: #191919;
		}
	}
	.modify-view {
		margin-top: 30rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.modify {
			margin-left: 10rpx;
			width: 280rpx;
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
		left: 0;
		width: 100%;
		height: calc(110rpx + env(safe-area-inset-bottom) / 2);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background-color: #f1ecdc;

		.bottom-button {
			margin-top: 16rpx;
			background-color: #96856c;
			height: 80rpx;
			width: 90%;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			font-size: 34rpx;
			font-weight: 600;
		}
	}
}

.modal-content {
	color: #191919;
	font-size: 26rpx;
	font-weight: 500;
}
</style>
