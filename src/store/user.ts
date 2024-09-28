/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 18:07:41
 * @FilePath: /zhenghe/src/store/user.ts
 * @Description:
 */
import { getUrlParam } from '@/utils';
import { isH5, isMpWeixin } from '@/utils/platform';
import { AppIdH5, hostPage } from '@/utils/request';
import { defineStore } from 'pinia';
import AppApi from '@/api/app';

const socialType = 31; // 社交类型 - 微信公众号

export default defineStore({
	id: 'user',
	state: () => {
		return {
			token: '',
			code: '',
			userInfo: {},
			loginAccess: {
				accessToken: '',
				expiresTime: undefined,
				openid: '',
				refreshToken: '',
				userId: undefined
			}
		} as {
			token: String;
			code: String;
			userInfo: App.UserInfoResponse;
			loginAccess: App.LoginResponse;
		};
	},
	actions: {
		SET_SELECT_THEME(str: string) {
			this.token = str;
		},
		/**
		 * 获取code
		 */
		async getCode(local: string, event = 'login') {
			/**
			 * 存在 token 直接获取数据
			 */
			if (this.token) {
				this.checkToken();
				return;
			}
			let code = getUrlParam('code');
			/**
			 * 存在code 直接登录
			 */
			if (code) {
				this.code = code;
				await this.login(code);
				return code;
			}
			/**
			 * 不存在code  获取code
			 */
			if (isH5) {
				this.getCodeH5(local, event);
			}
		},
		async getCodeH5(local: string, event = 'login') {
			const res = await AppApi.socialAuthRedirect({
				type: socialType,
				redirectUri: local + '?event=' + event
			});
			if (res.code === 0) {
				window.location = res.data;
			}
			// h5
			// 	window.location.href =
			// 		'https://open.weixin.qq.com/connect/oauth2/authorize' +
			// 		'?appid=' +
			// 		AppIdH5 +
			// 		'&redirect_uri=' +
			// 		encodeURIComponent(local) +
			// 		'&response_type=code' +
			// 		'&scope=snsapi_userinfo' +
			// 		'&state=STATE#wechat_redirect';
		},
		/**
		 * 获取token h5登录
		 */
		async login(code: string) {
			const res = await AppApi.socialLogin({
				code,
				state: getUrlParam('state') || '',
				type: socialType
			});
			if (res.code === 0) {
				this.token = res.data?.accessToken || '';
				this.loginAccess = res.data as App.LoginResponse;
				this.queryUserInfo();
			}
		},
		/**
		 * 获取token 小程序登录
		 */
		async miniLogin(phoneCode: string) {
			// 微信
			const resWe = await uni.login();
			if (resWe.errMsg === 'login:ok') {
				const res = await AppApi.miniAppLogin({
					phoneCode,
					loginCode: resWe.code
				});
				if (res.code === 0) {
					this.token = res.data?.accessToken || '';
					this.loginAccess = res.data as App.LoginResponse;
					this.queryUserInfo();
				}
			}
		},
		/**
		 * 刷新 token
		 */
		async refreshLogin() {
			const res = await AppApi.refreshToken({
				refreshToken: this.loginAccess?.refreshToken as string
			});
			if (res.code === 0) {
				this.token = res.data?.accessToken || '';
				this.loginAccess = res.data as App.LoginResponse;
				this.queryUserInfo();
			}
		},
		/**
		 * 校验token有效期
		 */
		async checkToken() {
			/**
			 * 判断 token时间是否过期
			 */
			const newDate = new Date().getTime();
			const subDate = newDate - Number(this.loginAccess?.expiresTime);
			if (subDate > 0) {
				// token 过期
				this.token = '';
				if (isH5) {
					this.getCodeH5(location?.href || hostPage);
				}
				return;
			}
			if (subDate + 6 * 60 * 60 * 100 > 0) {
				// 离token过期不到六个小时
				this.refreshLogin();
				return;
			}
			this.queryUserInfo();
		},
		/**
		 * 获取用户信息
		 */
		async queryUserInfo() {
			const res = await AppApi.geutUserInfo();
			if (res.code === 0) {
				this.userInfo = res.data as App.UserInfoResponse;
			}
		}
	},
	persist: {
		enabled: true,
		strategies: [
			{
				key: 'token',
				storage: localStorage,
				paths: ['token']
			},
			{
				key: 'userInfo',
				storage: localStorage,
				paths: ['userInfo']
			},
			{
				key: 'loginAccess',
				storage: localStorage,
				paths: ['loginAccess']
			}
		]
	}
});
