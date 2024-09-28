/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-16 21:54:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 17:59:48
 * @FilePath: /zhenghe/src/@types/app.d.ts
 * @Description:
 */
declare namespace App {
	interface LoginReq {
		type: number;
		redirectUri?: string;
		code?: string;
		state?: string;
	}
	interface MiniLoginReq {
		phoneCode: string;
		loginCode?: string;
		state?: string;
	}
	interface LoginResponse {
		accessToken: String; // token
		expiresTime?: Number; // 有效期
		openid: String;
		refreshToken: String; // 刷新token
		userId?: Number; // 用户ID
	}
	interface Level {
		id?: number; // 等级编号
		name?: string; // 等级名称
		level?: number; // 等级
		icon?: string; // 等级图标
	}
	interface UserInfoResponse {
		avatar?: String; // 头像
		brokerageEnabled?: boolean; // 是否成为推广员
		experience?: number; // 经验值
		id?: number; // 用户ID
		level?: Level; // 等级
		mobile?: string; // 用户手机号
		nickname?: string; // 用户名
		point?: number; // 积分
		sex?: number; // 性别
		volunteer?: boolean; // 是否是志愿者
	}
}
