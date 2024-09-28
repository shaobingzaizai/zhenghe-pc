/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 15:03:48
 * @FilePath: /zhenghe/src/utils/index.ts
 * @Description:
 */

import dayjs from 'dayjs';

// 防抖
export function debounce(
	func: Function,
	delay = 300,
	immediate = false
): Function {
	let timer: number | undefined;
	return function (this: unknown, ...args: any[]) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		if (immediate) {
			func.apply(self, args);
			immediate = false;
			return;
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(self, args);
		}, delay);
	};
}

// 节流
export const throttle = (func, delay = 200) => {
	let timeoutId;
	let lastExecTime = 0;
	return (...args) => {
		const currentTime = Date.now();
		const elapsed = currentTime - lastExecTime;
		if (!timeoutId && elapsed >= delay) {
			func.apply(this, args);
			lastExecTime = currentTime;
			timeoutId = setTimeout(() => {
				timeoutId = null;
			}, delay);
		}
	};
};

//千分位
export const thousandsFormat = (num: any) => {
	return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
};

/**
 *  map -> list
 * @param map
 * @returns {*[]}
 */
export const mapToList = (map) => {
	const list: { value: string; label: string }[] = [];
	Object.keys(map).forEach((key) => {
		list.push({ value: key, label: map[key] });
	});
	return list;
};
/**
 *  list -> map
 * @param list
 * @returns {*{}}
 */
export const listToMap = (list) => {
	const map = {};
	list.forEach((item) => {
		map[item.value] = item.label;
	});
	return map;
};

/**
 * 获取url 参数
 */
export function getUrlParam(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}

/**
 * 富文本转码
 * @param text
 * @returns
 */
export const richText = (text: string) => {
	const temp = text;
	let htmlString = temp;
	if (typeof temp === 'string') {
		htmlString = temp
			.replace(/\\/g, '')
			.replace(/<img/g, '<img style="display:block;width:100%"');
		htmlString = htmlString.replace(/ height="\d+"/g, "height='auto'");
		htmlString = htmlString.replace(
			/<iframe/g,
			'<video style="display:block;width:100%; height:240px"'
		);
		htmlString = htmlString.replace(/iframe/g, 'video');
	}
	return htmlString;
};
/**
 * 富文本转纯文字
 */
export const htmlToText = (val: string) => {
	val = val.replace(/\s*/g, ''); //去掉空格
	val = val.replace(/<[^>]+>/g, ''); //去掉所有的html标记
	val = val.replace(/↵/g, ''); //去掉所有的↵符号
	val = val.replace(/[\r\n]/g, ''); //去掉回车换行
	val = val.replace(/&nbsp;/g, ''); //去掉空格
	const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
	return val.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
		return arrEntities[t];
	});
};

/**
 * 转换时间格式
 */
export const dateFormart = (date: number) => {
	return dayjs(date).format('YYYY年MM月DD日 HH:mm');
};
