<template>
	<!-- 左右滑动切换月份 -->
	<view
		class="my-calendar"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
	>
		<view class="titleBox">
			<text
				class="iconfont icon-left1 icon"
				@click="changeMoth('left')"
			></text>
			<view class="title">{{ currentYear }}年{{ currentMonth }}日</view>
			<text
				class="iconfont icon-right1 icon"
				@click="changeMoth('right')"
			></text>
		</view>
		<view class="week">
			<view v-for="(item, index) in week" :key="index" class="week-view">
				{{ item }}
			</view>
		</view>
		<!-- 日历 -->
		<view class="calendarbBox">
			<view
				class="singleDay"
				v-for="(item, index) in state.currentMonthAllDate"
				:key="index"
				@tap="selectedDate(item)"
			>
				<!-- 不是当前月日期 class="dayTextB",如果选中则跳转至所属月份-->
				<!-- <text class="dayTextB" v-if="item.month != 'current'">
					{{ item.number }}
				</text> -->
				<view v-if="item.month != 'current'" class="day-item not-moth">
					<view class="day-item-number">{{ item.number }}</view>
					<view class="day-item-text no">有票</view>
				</view>
				<view
					v-else
					class="day-item"
					:class="{
						active: String(state.currentToday) == String(item.date)
					}"
				>
					<view class="day-item-number">{{ item.number }}</view>
					<view class="day-item-text no">有票</view>
				</view>
			</view>
		</view>
		<!-- 箭头 ，箭头向下展示周，箭头向上展示月-->
		<view v-if="isShowChangeType" class="arrowBox">
			<view class="arrowButtonRegion" @tap="changeShowWeekOrMonth">
				周/月
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive, toRefs } from 'vue';

defineProps({
	/**
	 * 是否显示 周月切换
	 */
	isShowChangeType: {
		type: Boolean,
		required: true
	}
});

const emit = defineEmits(['changeDate']);

const state = reactive({
	// week: ['日', '一', '二', '三', '四', '五', '六'],
	week: ['一', '二', '三', '四', '五', '六', '日'],
	currentYear: '',
	currentMonth: '',
	currentToday: '',
	// 0周日，1周一
	monthFirstDayCurrentWeek: '',
	monthFinallyDayCurrentWeek: '',
	//currentMonthAllDate里面是一个一个的对象 ，对象属性number当前日期，isPlan当天是否有计划，month是否是当前月里面的日期，因为要显示不同的样式。还以根据需要在添加其他属性。
	currentMonthAllDate: [],
	lastMonthDateNumber: 0,
	nextMonthDateNumber: 0,
	// showMonthOrWeek为true,代表显示周，false显示月
	showMonthOrWeek: false,
	currentTodayDate: '',
	initialX: '',
	currentMonthNum: ''
});
const {
	currentMonthNum,
	initialX,
	currentTodayDate,
	showMonthOrWeek,
	lastMonthDateNumber,
	nextMonthDateNumber,
	currentMonthAllDate,
	week,
	currentMonth,
	currentYear,
	currentToday,
	monthFirstDayCurrentWeek,
	monthFinallyDayCurrentWeek
} = toRefs(state);

// 今天凌晨
state.currentTodayDate = new Date(
	new Date(new Date().toLocaleDateString()).getTime()
);

/**
 * 记录手指触碰初始位置
 */
const handleTouchStart = (event) => {
	state.initialX = event.changedTouches[0].clientX;
};

/**
 * 左右滑动事件
 */
const handleTouchEnd = (event, index) => {
	const currentX = event.changedTouches[0].clientX;
	if (currentX - state.initialX > 20) {
		//往右滑动，上个月
		state.currentTodayDate =
			state.currentMonth == 1
				? new Date(`${state.currentYear - 1}/12/1`)
				: new Date(
						`${state.currentYear}/${state.currentMonthNum - 1}/1`
					);
		getAllDatesOfCurrentMonth(state.currentTodayDate);
		return;
	}
	if (state.initialX - currentX > 20) {
		// 往左滑动，下个月
		state.currentTodayDate =
			state.currentMonth == 12
				? new Date(`${state.currentYear + 1}/1/1`)
				: new Date(
						`${state.currentYear}/${state.currentMonthNum + 1}/1`
					);
		getAllDatesOfCurrentMonth(state.currentTodayDate);
		return;
	}
};

const changeMoth = (type) => {
	switch (type) {
		case 'left':
			//往右滑动，上个月
			state.currentTodayDate =
				state.currentMonth == 1
					? new Date(`${state.currentYear - 1}/12/1`)
					: new Date(
							`${state.currentYear}/${state.currentMonthNum - 1}/1`
						);
			getAllDatesOfCurrentMonth(state.currentTodayDate);
			break;
		case 'right':
			// 往左滑动，下个月
			state.currentTodayDate =
				state.currentMonth == 12
					? new Date(`${state.currentYear + 1}/1/1`)
					: new Date(
							`${state.currentYear}/${state.currentMonthNum + 1}/1`
						);
			getAllDatesOfCurrentMonth(state.currentTodayDate);
			break;
	}
};

/**
 * 选中哪天
 */
const selectedDate = (item) => {
	if (item.month != 'current') return;
	state.currentTodayDate = item.date;
	getAllDatesOfCurrentMonth(state.currentTodayDate);
	emit('changeDate', item.date);
	// 下面去后端请求计划数据，并展示
};

/**
 * 切换显示周还是月
 */
const changeShowWeekOrMonth = () => {
	state.showMonthOrWeek = !state.showMonthOrWeek;
	getAllDatesOfCurrentMonth(state.currentTodayDate);
};

/**
 * 得到当前月份/当前周的所有日期，dateData某天日期
 */
const getAllDatesOfCurrentMonth = (dateData) => {
	state.currentMonthAllDate = [];
	const today = new Date(dateData);
	state.currentToday = today.toLocaleDateString();
	state.currentYear = today.getFullYear();
	state.currentMonthNum = today.getMonth() + 1;
	if (today.getMonth() + 1 < 10) {
		state.currentMonth = '0' + (today.getMonth() + 1);
	} else {
		state.currentMonth = today.getMonth() + 1;
	}
	// 上个月总天数
	const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
	state.lastMonthDateNumber = new Date(
		lastMonth.getFullYear(),
		lastMonth.getMonth() + 1,
		0
	).getDate();
	// 下个月总天数
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
	state.nextMonthDateNumber = new Date(
		nextMonth.getFullYear(),
		nextMonth.getMonth() + 1,
		0
	).getDate();
	const dates = [];
	// 用if,else判断显示周还是月
	if (state.showMonthOrWeek) {
		// 显示当前选中日期所在周
		let day = today.getDay();
		let startDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - day
		);
		let endDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - day + 6
		);
		let currentMonthTwo = today.getMonth() + 1;
		for (let i = startDate; i <= endDate; ) {
			let monthFlag = '';
			if (new Date(i).getMonth() + 1 == currentMonthTwo) {
				monthFlag = 'current';
			} else if (new Date(i).getMonth() + 1 > currentMonthTwo) {
				monthFlag = 'last';
			} else {
				monthFlag = 'next';
			}
			dates.push(new Date(i));
			state.currentMonthAllDate.push({
				number: i.getDate(),
				month: monthFlag,
				date: new Date(i).toLocaleDateString()
			});
			i.setDate(i.getDate() + 1);
		}
	} else {
		// 显示当前选中日期所在月
		const firstDayOfMonth = new Date(
			today.getFullYear(),
			today.getMonth(),
			1
		);
		const lastDayOfMonth = new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			0
		);
		// 周日在第一位
		// state.monthFirstDayCurrentWeek = firstDayOfMonth.getDay();
		// state.monthFinallyDayCurrentWeek = lastDayOfMonth.getDay();
		// 周一在第一位
		state.monthFirstDayCurrentWeek = (firstDayOfMonth.getDay() + 6) % 7;
		console.log('state', state);
		// 补充上个月显示在本月的天数，例如5.1是周三，则周日周一周二显示上个月
		if (state.monthFirstDayCurrentWeek != 0) {
			// 判断上个月是不是上一年
			let isLastYearNumber = lastMonth.getMonth() + 1 == 12 ? 1 : 0;
			for (let i = 0; i < state.monthFirstDayCurrentWeek; i++) {
				state.currentMonthAllDate.push({
					number:
						state.lastMonthDateNumber -
						state.monthFirstDayCurrentWeek +
						1,
					month: 'last',
					date: `${state.currentYear - isLastYearNumber}/${lastMonth.getMonth() + 1}/${state.lastMonthDateNumber - state.monthFirstDayCurrentWeek + 1}`
				});
				state.lastMonthDateNumber++;
			}
		}
		for (let i = firstDayOfMonth; i <= lastDayOfMonth; ) {
			dates.push(new Date(i));
			state.currentMonthAllDate.push({
				number: dates.length,
				month: 'current',
				date: new Date(i).toLocaleDateString()
			});
			i.setDate(i.getDate() + 1);
		}
		if (state.monthFinallyDayCurrentWeek != 6) {
			// 判断下个月是不是下一年
			let yearNumber = nextMonth.getMonth() + 1 == 1 ? 1 : 0;
			for (let i = 0; i < 6 - state.monthFinallyDayCurrentWeek; i++) {
				state.currentMonthAllDate.push({
					number: i + 1,
					month: 'next',
					date: `${state.currentYear + yearNumber}/${nextMonth.getMonth() + 1}/${i + 1}`
				});
			}
		}
	}
	console.log('state.currentMonthAllDate', state.currentMonthAllDate);
	return dates;
};
getAllDatesOfCurrentMonth(state.currentTodayDate);

// 可删除，做了几个假数据，假装几天有计划的,isPlan为true代表当天有计划。
// state.currentMonthAllDate[2].isPlan = true;
// state.currentMonthAllDate[4].isPlan = true;
// state.currentMonthAllDate[0].isPlan = true;
</script>

<style scoped lang="scss">
.my-calendar {
	width: 100%;
	height: auto;
	border: 2rpx solid #d1bd98;
}
.calendarbBox {
	width: 96%;
	padding: 10rpx 2% 20rpx;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	.singleDay {
		width: 14.2%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.day-item {
			width: 82%;
			height: 90rpx;
			border: 2rpx solid #dfdfdf;
			border-radius: 8rpx;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			&.active {
				background-color: #fdf3eb;
			}
			&.not-moth {
				opacity: 0;
			}

			.day-item-number {
				color: #4f4f4f;
				font-size: 24rpx;
			}

			.day-item-text {
				margin-top: 6rpx;
				color: #96856c;
				font-size: 24rpx;

				&.no-have {
					color: #d2d2d2;
				}
			}
		}
	}
}
.transitionTime {
	transition: transform 0.5s;
}
.arrowBox {
	width: 100%;
	height: 109rpx;
	line-height: 109rpx;
	position: relative;
	.arrowButtonRegion {
		width: 100rpx;
		height: 50rpx;
		line-height: 50rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #00b488;
		border-radius: 10rpx;
		color: #fff;
		font-size: 28rpx;
		text-align: center;
	}
}
.titleBox {
	width: 100%;
	height: 92rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.icon {
		font-size: 32rpx;
		color: #333;
	}
	.title {
		margin: 0 12rpx;
		color: #333;
		font-size: 36rpx;
		font-weight: bold;
		text-align: left;
	}
}
.week {
	width: 96%;
	padding: 0 2%;
	height: 80rpx;
	line-height: 80rpx;
	color: #4f4f4f;
	font-size: 32rpx;
	font-weight: bold;
	text-align: left;
	display: flex;
	justify-content: space-around;
	border-top: 2rpx solid #d1bd98;
	border-bottom: 2rpx solid #d1bd98;
	background-color: #ebddc4;
	.week-view {
		width: 14.2%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
