<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-16 16:59:50
 * @FilePath: /zhenghe/src/sub-pages/pages/book/book-notice.vue
 * @Description:  预约须知
-->
<template>
	<CommonPage
		fixed="fixed"
		:is-back="true"
		bg-color="transparent"
		background-color="transparent"
		:is-tab="false"
		:the-tab="2"
	>
		<view class="content">
			<image
				class="home-bg"
				mode="widthFix"
				:src="`${envApi.imgBaseUrl}/book/book-bg.png`"
			/>

			<view class="title" :class="{ _h5: isH5 }">
				<PageTitle title="参观须知" />
			</view>

			<view class="content-info">
				<view class="item-info">
					一、根据中国国家博物馆工作实际，严格落实“限量、预约、错峰”的政策对外开放，伴有发热、咳嗽、腹泻等身体不适症状人员谢绝到馆参观。开放时间为每天
					9:00-17:00(16时停止入馆)，周一例行闭馆(节假日除外)，夜间场次暂时取消。
				</view>
				<view class="item-info">
					二、个人观众需提前1-7天在国家博物馆官网和公众号及国家博物馆官方APP预约，每天分为以下三个预约入馆时段:9:00-11:00，11:00-13:30，13:30-15:30。
				</view>
				<view class="item-info">
					三、参观当天凭预约时使用的本人二代身份证原件(外籍人士和港、澳、台地区观众凭预约二维码)从北门西侧入馆参观。限量预约开放期间，观众入馆须配合进行证件核录、接受健康监测，未见异常方可入馆。参观全程请佩戴口罩。
				</view>
				<view class="item-info">
					四、参观预约仅提供个人参观预约，不接受现场预约和团体预约，预约采取实名制，请提供参观人真实姓名、联系方式、二代身份证号码等信息，每个证件号每天只能预约1次。
				</view>
				<view class="item-info">
					五、预约成功后，系统自动发送预约成功消息通知，请妥善保存。目前仅可通过国家博物馆网站、微信公众号官方渠道进行预约，请大家认准，以免耽误您的行程。
				</view>
				<view class="item-info">
					六、观众须在预约时间段到馆参观，避免造成扎堆聚集，如错过预约时间段将谢绝入馆。如无法按时入馆参
				</view>
			</view>
			<view class="content-bottom-blank"></view>
			<view class="content-bottom">
				<view class="bottom-button" @click="knowNotice">
					已仔细阅读预约须知
				</view>
			</view>
		</view>
	</CommonPage>
</template>

<script setup lang="ts">
import envApi from '@/config/env';
import { isH5 } from '@/utils/platform';

const knowNotice = () => {
	uni.navigateBack();
};
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
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 710rpx;
		z-index: -1;
	}

	.title {
		width: calc(100% - 30rpx);
		margin-top: 160rpx;
		margin-left: 30rpx;
		&._h5 {
			margin-top: 40rpx;
		}
	}

	.content-info {
		margin-top: 30rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		height: 100%;
		width: calc(100% - 80rpx);
		padding: 40rpx;

		.item-info {
			margin-top: 40rpx;
			font-weight: 400;
			font-size: 26rpx;
			color: #4d4d4d;
			line-height: 60rpx;
			&:nth-child(1) {
				margin-top: 0;
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
		left: 0;
		width: 100%;
		height: calc(100rpx + env(safe-area-inset-bottom) / 2);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background-color: #fff;

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
</style>
