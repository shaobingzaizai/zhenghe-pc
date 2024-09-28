/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-02 21:36:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-28 17:48:01
 * @FilePath: /zhenghe-pc/src/config/env.ts
 * @Description:
 */
const env = import.meta.env;
export const apiEnv: ApiEnv =
	env.VITE_USER_NODE_ENV === 'development' ? 'dev' : 'prod';
// export const apiEnv: ApiEnv = "prod";
console.log('env', env.VITE_USER_NODE_ENV);

const envMap = {
	dev: {
		apiBaseUrl: 'http://182.44.72.98:88/museum/app-api/',
		imgPcUrl: '/static/zhenghe-pc',
		imgBaseUrl: '/static/zhenghe'
	},
	prod: {
		apiBaseUrl: 'https://www.mmweb.top',
		imgPcUrl: '/static/zhenghe-pc',
		imgBaseUrl: 'https://cdn.vspo.cn/ins/images'
	}
};

type ApiEnv = keyof typeof envMap;
type Env<T extends ApiEnv> = {
	apiEnv: T;
} & (typeof envMap)[T];

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
	return Object.assign({ apiEnv }, envMap[apiEnv]);
}

const envApi = createEnv(apiEnv);
export default envApi;
