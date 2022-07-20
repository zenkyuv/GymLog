import dayjs from 'dayjs'
import { range } from 'ramda'
import weekday from 'dayjs/plugin/weekday.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

export const daysOfWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

export const getYearDropdownOptions = (currentYear: number) => {
	let minYear = currentYear - 4
	let maxYear = currentYear + 5
	return range(minYear, maxYear + 1).map((y) => ({ label: `${y}`, value: y }))
}

export const getMonthDropdownOptions = () => {
	return range(1, 13).map((m) => ({
		value: m,
		label: dayjs()
			.month(m - 1)
			.format('MMMM'),
	}))
}

export const getNumberOfDaysInMonth = (year: number, month: number) => {
	return dayjs(`${year}-${month}-01`).daysInMonth()
}

export const createDaysForCurrentMonth = (year: number, month: number) => {
	return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
		return {
			dateString: dayjs(`${year}-${month}-${index + 1}`).format('YYYY-MM-DD'),
			dayOfMonth: index + 1,
			isCurrentMonth: true,
		}
	})
}

export const createDaysForPreviousMonth = (
	year: number,
	month: number,
	currentMonthDays: { dateString: string | number | Date | dayjs.Dayjs }[]
) => {
	const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString)
	const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month')
	const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
	const previousMonthLastMondayDayOfMonth = dayjs(
		currentMonthDays[0].dateString
	)
		.subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
		.date()
	return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
		return {
			dateString: dayjs(
				`${previousMonth.year()}-${previousMonth.month() + 1}-${
					previousMonthLastMondayDayOfMonth + index
				}`
			).format('YYYY-MM-DD'),
			dayOfMonth: previousMonthLastMondayDayOfMonth + index,
			isCurrentMonth: false,
			isPreviousMonth: true,
		}
	})
}

export const createDaysForNextMonth = (
	year: number,
	month: number,
	currentMonthDays: string | any[]
) => {
	const lastDayOfTheMonthWeekday = getWeekday(
		`${year}-${month}-${currentMonthDays.length}`
	)
	const nextMonth = dayjs(`${year}-${month}-01`).add(1, 'month')
	const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday

	return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
		return {
			dateString: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`)
			.format('YYYY-MM-DD'),
			dayOfMonth: index + 1,
			isCurrentMonth: false,
			isNextMonth: true
		}})
}

// sunday === 0, saturday === 6
export const getWeekday = (dateString: string | number | Date | dayjs.Dayjs) => {
	return dayjs(dateString).weekday()
}

export const isWeekendDay = (dateString: string | number | Date | dayjs.Dayjs) => {
	return [6, 0].includes(getWeekday(dateString))
}

export const today:number[] = new Date()
	.toISOString()
	.slice(0, 10)
	.split('-')
	.map((e) => Number(e))
export const [yearNow, monthNow, dayNow] = today
export const isToday = (year: number, month: number, day: number) => {
	return day === dayNow && month === monthNow && year === yearNow
}
