/*
 * @Author: Wolf.Ma
 * @Date: 2024-09-01 15:58:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-17 23:00:54
 * @FilePath: /zhenghe/src/hooks/use-pagination.ts
 * @Description: 分页获取数据
 */
export function usePagination<T>(
	api,
	params = {},
	pageSize,
	initialPage,
	implementBoolean?: boolean,
	dataCallBack?: (data: any) => any
) {
	const currentPage = ref(initialPage); // 当前页码
	const dataList = ref<T[]>([]); // 显示的数据数组
	const loading = ref(false); // 是否正在加载数据
	const endReached = ref(false); // 是否已经加载完所有数据

	async function loadMore(type = 'addMore', newParams?: {}) {
		if (type === 'reload') {
			currentPage.value = initialPage;
			// dataList.value = [];
			loading.value = false;
			endReached.value = false;
		}
		if (!loading.value && !endReached.value) {
			loading.value = true;
			const paramType = {
				...(newParams ?? params),
				pageNum: currentPage.value,
				pageSize
			};
			for (const key in paramType) {
				if (paramType[key] === undefined) {
					delete paramType[key];
				}
			}
			const response = await api({ ...paramType }).catch(() => {
				loading.value = false;
			});
			let data = response.data.list || [];
			dataCallBack && (data = dataCallBack(response));
			const newItems = data;
			dataList.value =
				type === 'addMore'
					? [...dataList.value, ...newItems]
					: newItems;
			loading.value = false;
			if (newItems.length < pageSize) {
				endReached.value = true;
			} else {
				currentPage.value++;
			}
		}
	}

	// watchEffect(() => {
	//   loadMore();
	// });

	onLoad(() => {
		if (implementBoolean === false) return;
		loadMore();
	});

	return {
		dataList,
		loading,
		endReached,
		loadMore
	};
}
