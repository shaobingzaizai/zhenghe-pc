<!--
 * @Author: Wolf.Ma
 * @Date: 2024-09-02 21:37:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-28 21:34:10
 * @FilePath: /zhenghe-pc/src/App.vue
 * @Description: 
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { ThemeList } from '@/config/theme';
import { hostPage } from './utils/request';
import jsWxSdk from '@/utils/weixin-sdk';
import { isH5, isMpWeixin } from './utils/platform';

const { selectTheme, SET_THEME_OBJECT, INIT_SYSTEM_INFO } = useStore('app');
const { getCode } = useStore('user');

/**
 * 初始化主题颜色
 */
const initTheme = () => {
	SET_THEME_OBJECT(ThemeList[selectTheme.value || 'default']);
};

onLaunch(async () => {
	initTheme();
	// INIT_SYSTEM_INFO();
	// // getCode(location?.href || hostPage);
	// if (isH5) {
	// 	jsWxSdk.init((res) => {
	// 		if (res) {
	// 			getCode(location?.href || hostPage);
	// 		}
	// 	});
	// }
});
onShow(async () => {});
onHide(() => {
	console.log('App Hide');
});
</script>
<style>
/**
  *   theme.ts   themeBgColor: "#F1ECDC", // 主题背景色
  */
page {
	z-index: -999;
	background-color: #e6e0cb;
	font-family: SiYuanSongTi, sans-serif;
	min-width: 1280rpx !important;
}
body {
	font-family: SiYuanSongTi, sans-serif;
}
body ::after {
	height: 0;
}
/* 全局样式，影响所有可滚动元素 */
/* 隐藏滚动条，但仍然可以滚动 */
::-webkit-scrollbar {
	display: none; /* 对于Webkit浏览器 */
}
</style>
<style lang="scss">
.uni-app--showtabbar uni-page-wrapper::after {
	height: 0;
}

.uni-tabbar-bottom {
	display: none;
}

.scroll-bottom {
	height: calc(20rpx + env(safe-area-inset-bottom));
	width: 100%;
}
</style>
