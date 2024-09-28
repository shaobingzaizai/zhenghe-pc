/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-16 21:53:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 18:00:32
 * @FilePath: /zhenghe/src/api/app.ts
 * @Description:
 */
import http from '@/utils/request';

const AppApi = {
	// 获取jsSdk 签名
	createWeixinMpJsapiSignature: (params: { url: string }) =>
		http.post<any>(
			'/member/auth/create-weixin-jsapi-signature?url=' + params.url,
			params
		),
	// 社交授权的跳转
	socialAuthRedirect: (params: App.LoginReq) =>
		http.get<any>('/member/auth/social-auth-redirect', params),
	// 社交快捷登录
	socialLogin: (data: App.LoginReq) =>
		http.post<App.LoginResponse>('/member/auth/social-login', data),
	// 微信小程序的一键登录
	miniAppLogin: (data: App.MiniLoginReq) =>
		http.post<App.LoginResponse>('/member/auth/social-login', data),
	// 刷新token
	refreshToken: (data: { refreshToken: string }) =>
		http.post<App.LoginResponse>(
			'/member/auth/refresh-token?refreshToken=' + data.refreshToken,
			data
		),
	// 获取个人信息
	geutUserInfo: () => http.get<App.UserInfoResponse>('/member/user/get', null)
};

export default AppApi;
