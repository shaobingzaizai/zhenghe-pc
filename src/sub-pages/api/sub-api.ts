/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-16 21:53:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-21 18:33:45
 * @FilePath: /zhenghe/src/sub-pages/api/sub-api.ts
 * @Description:
 */
import http from '@/utils/request';
import * as SubApiType from './type/sub-api.d';

const SubApi = {
	// 获得博物馆展览分页
	queryExbihitionList: (params: SubApiType.ExhibitionListReq) =>
		http.get<SubApiType.ExhibitionListRespone>(
			'/museum/exhibit/page',
			params
		),
	// 获得博物馆展览分页
	queryExbihitionDetials: (params: { id: number }) =>
		http.get<SubApiType.ExhibitionListResp>('/museum/exhibit/get', params),
	// 获得文章分页
	queryArticleList: (params: SubApiType.ArticleListReq) =>
		http.get<SubApiType.ArticleListRespone>(
			'/promotion/article/page',
			params
		),
	// 获取文章详情
	queryArticleDetails: (params: SubApiType.ArticleDetailsReq) =>
		http.get<SubApiType.ArticleListResp>('/promotion/article/get', params),
	// 获得留言分页
	queryInteractList: (params: SubApiType.ArticleListReq) =>
		http.get<SubApiType.InteractRespone>('/museum/message/page', params),
	// 添加留言
	addInteract: (params: SubApiType.AddInteractReq) =>
		http.post<boolean>('/museum/message/create', params),
	// 获得文物类别 文物总账分类统计
	queryRelicClass: () =>
		http.get<SubApiType.RelicClassResponse[]>(
			'/museum/antique/classification'
		),
	// 获得文物分页
	queryRelicList: (params: SubApiType.RelicListReq) =>
		http.get<SubApiType.RelicListResponse>('/museum/antique/page', params),
	// 获取文物详情
	queryRelicDetails: (params: { id: number }) =>
		http.get<SubApiType.RelicListResp>('/museum/antique/get', params)
};

export default SubApi;
