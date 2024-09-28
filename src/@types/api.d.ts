/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-17 22:25:31
 * @FilePath: /zhenghe/src/@types/api.d.ts
 * @Description:
 */
/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-17 11:28:48
 * @FilePath: /zhenghe/src/@types/api.d.ts
 * @Description:
 */
declare namespace Http {
	type Response<T> = Promise<{
		[x: string]: any;
		data?: T;
		code?: number;
		msg?: string;
	}>;
	type PageResponse<T> = {
		/**
		 * 查看页码
		 */
		pageNum?: number | null;
		/**
		 * 每页显示数量
		 */
		pageSize?: number | null;
		/**
		 * 记录数据
		 */
		recordList?: T | null;
		/**
		 * 总条数
		 */
		total?: number | null;
		/**
		 * 总页数
		 */
		totalPage?: number | null;
	};
}
