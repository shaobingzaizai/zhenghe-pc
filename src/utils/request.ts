/**
 * 请求拦截封装
 */
import { isDevelopment, isH5 } from './platform';
import env from '@/config/env';
// http://192.168.1.109:5173/#/pages/home/home
export const hostPage = 'http://192.168.1.109:5173/';
export const AppIdH5 = 'wx55cf39268bee92e4';

function customReject(err: { code: number; msg: string }) {
	const { msg = '网络拥挤，稍候片刻！', code = -1 } = err;
	switch (code) {
		case 401:
			break;
		case 500:
			uni.showToast({
				icon: 'none',
				title: '网络拥挤，稍候片刻！'
			});
			break;
		default:
			uni.showToast({
				icon: 'none',
				title: msg
			});
			break;
	}
}

// h5环境开启代理
export const apiBaseUrl = isH5 && isDevelopment ? '/app-api' : env.apiBaseUrl;

function baseRequest(
	method:
		| 'OPTIONS'
		| 'GET'
		| 'HEAD'
		| 'POST'
		| 'PUT'
		| 'DELETE'
		| 'TRACE'
		| 'CONNECT'
		| undefined,
	url: string,
	data: { isLoading: any }
) {
	return new Promise((resolve, reject) => {
		const { token } = useStore('user');
		delete data.isLoading;
		let responseData: unknown;
		uni.request({
			url: apiBaseUrl + url,
			method,
			timeout: 20 * 1000,
			header: {
				token: token.value,
				'content-type': 'application/json; charset=utf-8',
				Accept: '*/*',
				'tenant-id': 1,
				Authorization: 'Bearer ' + token.value
			},
			data,
			success: (res: any) => {
				if (res.statusCode >= 0 && res.statusCode < 400) {
					if (res.data?.code === 0) {
						responseData = res.data;
					} else {
						customReject(res.data);
						reject(res.data);
					}
				} else {
					customReject({
						code: -1,
						msg: '网络拥挤，稍候片刻！'
					});
				}
			},
			fail: () => {
				customReject({
					code: -1,
					msg: '网络不给力，请检查你的网络设置~'
				});
			},
			complete: () => {
				resolve(responseData);
			}
		});
	});
}

const http = {
	get: <T>(api: string, params?: any) =>
		baseRequest('GET', api, {
			...params
		}) as Http.Response<T>,
	post: <T>(api: string, params: any) =>
		baseRequest('POST', api, {
			...params
		}) as Http.Response<T>,
	put: <T>(api: string, params: any) =>
		baseRequest('PUT', api, {
			...params
		}) as Http.Response<T>
};

export default http;
