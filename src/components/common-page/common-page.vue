<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-28 21:24:20
 * @FilePath: /zhenghe-pc/src/components/common-page/common-page.vue
 * @Description: 
-->
<template>
	<view class="common-page">
		<NavBar
			v-if="isShowNav"
			:is-trans="isTrans"
			:is-height="isHeight"
			:select-nav="selectNav"
		/>
		<!-- 以前逻辑，采用默认配置 -->
		<view class="view-content">
			<slot></slot>
		</view>
		<!-- <TabBar v-if="isTab" :the-tab="theTab" /> -->
		<Footer />
	</view>
</template>

<script lang="ts" setup>
const props = defineProps({
	/**
	 * 是否显示顶部导航
	 */
	isShowNav: {
		type: Boolean,
		default: true
	},
	/**
	 * 是否透明
	 */
	isTrans: {
		type: Boolean,
		default: false
	},
	isHeight: { type: Boolean, default: false },
	selectNav: { type: String, default: 'home' }
});
</script>

<style lang="scss" scoped>
.common-page {
	display: flex;
	flex-direction: column;
	.scroll-content {
		position: relative;
		flex: 1;
		&.bar-bottom {
			padding: 0 0 calc(80rpx + env(safe-area-inset-bottom));
		}
	}
	.view-content {
		position: relative;
		flex: 1;
		overflow: auto;
		&.bar-bottom {
			padding: 0 0 calc(80rpx + env(safe-area-inset-bottom));
		}
	}
}
</style>
