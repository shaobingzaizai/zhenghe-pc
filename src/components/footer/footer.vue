<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-02 21:36:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-22 20:26:28
 * @FilePath: /zhenghe-pc-vue/src/components/footer/footer.vue
 * @Description: 
-->
<template>
	<view class="footer-content"></view>
</template>

<script lang="ts" setup>
import { isMpWeixin, platform } from '@/utils/platform';

/**
 * 父类事件
 */
const emits = defineEmits<{
	(e: 'back', item: any): void;
}>();
/**
 *  父类传参
 */
const props = defineProps({
	bgColor: { type: String, default: '#fff' }, // 背景色
	color: { type: String, default: '#000' }, // 字体颜色
	isBack: { type: Boolean, default: true }, // 是否显示返回
	isBackHome: { type: Boolean, default: false }, // 是否显示返回首页
	title: { type: String, default: '' }, // 标题
	backgroundColor: { type: String, default: '#fff' }, // 全页面背景色
	backgroundUrl: { type: String, default: '' }, // 背景图片
	fixed: {
		type: String,
		default: 'static',
		enum: ['static', 'relative', 'absolute', 'fixed', 'sticky']
	} // 布局样式 是否占位
});
const { navBarConfig, themeObject } = useStore('app');
const CustomBar: number = navBarConfig.value.CustomBar; // 高度
const StatusBar: number = navBarConfig.value.StatusBar; // 状态栏高度
const TheTabPage: any = ['pages/home/home'];

// 判断当前页面前是否有页面
const firstLevel = ref(true);
onLoad(() => {
	firstLevel.value = getCurrentPages().length === 1;
});
/**
 * 返回按钮
 */
const cuBack = () => {
	emits('back', {});
	if (firstLevel.value) {
		uni.reLaunch({ url: '/pages/home/home' });
	} else {
		uni.navigateBack();
	}
};
</script>

<style lang="scss" scoped>
.footer-content {
	width: 100%;
	height: 324rpx;
	background-color: v-bind('themeObject.footerBgColor');
}

.row-center-start {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.row-center-center {
	display: flex;
	align-items: center;
	justify-content: center;
}
.flex-row-between {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
