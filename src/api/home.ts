/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-02 21:37:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 17:57:50
 * @FilePath: /zhenghe/src/api/home.ts
 * @Description:
 */
import http from '@/utils/request';

const HomeApi = {
	// 查看店铺列表
	getBannerList: (params: Home.BannerListReq) =>
		http.get<Home.BannerListReponse>('/promotion/banner/list', params),
	// 获取开屏页地址
	bannerClickCount: (params: { id: number }) =>
		http.put<boolean>('/promotion/banner/list', params),
	// 公告信息
	getNoticeList: () =>
		http.get<Home.NoticeListReponse[]>('/museum/notice/list', null)
};

export default HomeApi;
