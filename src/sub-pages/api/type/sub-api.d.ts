/**
 * 展览list
 */
export interface ExhibitionListReq {
	pageNo: number;
	pageSize: number;
	title?: string;
	type?: string;
}
export interface ExhibitionListRespone {
	list: ExhibitionListResp[];
	total: number;
}

export interface ExhibitionListResp {
	id: number;
	hallId: number; // 展厅ID
	hallTitle: string; // 展厅名称
	location: string; // 位置
	title: string; // 标题
	cover: string; // 封面
	phoneCover: string; // 手机封面
	description: string; // 描述
	content: string; // 详情
	type: number; // 类型
	typeName: string; // 类型名称
	beginTime: string; // 开始时间
	endTime: string; // 结束时间
	vrUrl: string; // 360地址
	transMap: any;
}

/**
 * 文章list
 */
export interface ArticleListReq {
	pageNo: number;
	pageSize: number;
	categoryId?: string; // 分类编号
}
export interface ArticleListRespone {
	list: ArticleListResp[];
	total: number;
}

export interface ArticleListResp {
	id: number;
	title: string; // 标题
	content: string; // 详情
	author: string; // 作者
	categoryId: number; // 文章编号
	picUrl: string; // 图片
	introduction: string; // 简介
	createTime: string; // 发布时间
	browseCount: number; // 浏览量
	spuId: number; // 关联商品 spu编号
}
export interface ArticleDetailsReq {
	id: number;
	title?: string;
}
/**
 * 留言
 */
export interface InteractRespone {
	list: InteractListResp[];
	total: number;
}

export interface InteractListResp {
	id: number;
	memberId: number;
	nickname: string; // 用户昵称
	anonymous: boolean; // 是否匿名
	content: string; // 留言内容
	memberAvatar: string; // 用户头像
	replyUserAvatar: string; // 回复用户的头像
	replyUserId: number; // 回复用户ID
	replyUserName: string; // 回复用户昵称
	replyContent: string; // 回复内容
	replyTime: string; // 回复时间
	createTime: number; // 创建时间
}

/**
 * 新增留言
 */
export interface AddInteractReq {
	anonymous: boolean;
	content: string;
}

/**
 * 文物总账分页
 */
export interface RelicListReq {
	pageNo: number;
	pageSize: number;
	title?: string; // 藏品名称
	identifier?: string; // 藏品编号
	classification?: string; // 类别
	level?: string; // 文物级别
	platform?: string; // 展示平台
	tags?: string; // 标签
	status?: string; // 状态
}

export interface RelicListResponse {
	/*数据 */
	list: RelicListResp[];
	/*总量 */
	total: number;
}

export interface RelicListResp {
	/*编号 */
	id: number;

	/*藏品名称 */
	title: string;

	/*藏品编号 */
	identifier: string;

	/*封面图片 */
	cover: string;

	/*图片资源 */
	imgResource: string;

	/*年代范围 */
	historicalEraRange: string;

	/* */
	historicalEraRangeName: string;

	/*具体年代 */
	historicalEra: string;

	/*类别 */
	classification: number;

	/* */
	classificationName: string;

	/*质地类型 */
	materialsType: number;

	/* */
	materialsTypeName: string;

	/*具体质地 */
	materials: string;

	/* */
	materialsName: string;

	/*长度/直径 */
	length: string;

	/*长度单位 */
	lengthUnit: number;

	/* */
	lengthUnitName: string;

	/*宽度 */
	width: string;

	/*宽度单位 */
	widthUnit: number;

	/* */
	widthUnitName: string;

	/*高度 */
	height: string;

	/*高度单位 */
	heightUnit: number;

	/* */
	heightUnitName: string;

	/*详细尺寸说明 */
	dimensions: string;

	/*质量范围 */
	massRange: number;

	/* */
	massRangeName: string;

	/*质量 */
	mass: string;

	/*质量单位 */
	massUnit: number;

	/* */
	massUnitName: string;

	/*完残情况 */
	levelOfCompleteness: number;

	/* */
	levelOfCompletenessName: string;

	/*文物级别 */
	level: number;

	/* */
	levelName: string;

	/*文物来源 */
	transferMode: number;

	/* */
	transferModeName: string;

	/*保存状态 */
	preservationStatus: number;

	/* */
	preservationStatusName: string;

	/*详细描述 */
	description: string;

	/*展示平台 */
	platform: string;

	/* */
	platformName: string;

	/*标签 */
	tags: string;

	/* */
	tagsName: string;

	/*三维地址 */
	threeUrl: string;

	/*低像素三维地址 */
	lowPixelThreeUrl: string;
}

/**
 * 类别
 */
export interface RelicClassResponse {
	/**
	 * 类别
	 */
	classification: number;
	/**
	 * 类别名称
	 */
	classificationName: string;
	/**
	 * 数量
	 */
	count: number;
}
