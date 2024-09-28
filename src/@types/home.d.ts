/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-02 21:37:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-17 18:37:50
 * @FilePath: /zhenghe/src/@types/home.d.ts
 * @Description:
 */
/**
 * MerchantListResp
 */
declare namespace Home {
	interface BannerListReq {
		/**
		 * Banner position,示例值(1)
		 */
		position?: number;
	}
	/**
	 * 请求数据
	 *
	 * SystemOpenScreenResp
	 */
	interface BannerListReponse {
		id: number;
		title?: string;
		url?: string;
		picUrl?: string;
	}
	/**
	 * 公告列表
	 */
	interface NoticeListReponse {
		id: number;
		content: string;
		createTime: string;
	}
}
