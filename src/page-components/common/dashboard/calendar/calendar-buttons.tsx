import {isToday} from './helpers'
import {WorkoutOptions} from '../../../../types/interfaces'
import styles from "../../../../component-styles/workout-panel.module.css"

export const handleMonthNavBackButtonClick = (
	{setCategoriesPanel,
	component,
	yearAndMonth,
	onYearAndMonthChange,
	userStore}: WorkoutOptions
) => {

	const [year, month, day] = yearAndMonth
	let prevDay = day - 1
	let nextYear = year
	let nextMonth = month
	let daysOfCurrentMonths = new Date(year, month, 0).getDate()
	if (component === 'workoutPanel') {
		setCategoriesPanel({
			showCategories: false,
			category: undefined,
			exercise: undefined,
			controlPanel: false,
		})
		if (prevDay < 1) {
			nextMonth -= 1
			daysOfCurrentMonths = new Date(year, nextMonth, 0).getDate()
			prevDay = daysOfCurrentMonths
		}
	} else if (component === 'calendar') {
		prevDay = day
		nextMonth -= 1
	}

	if (nextMonth === 0) {
		nextMonth = 12
		nextYear = year - 1
	}

	onYearAndMonthChange([nextYear, nextMonth, prevDay])

}

export const handleMonthNavForwardButtonClick = (
	{setCategoriesPanel,
	component,
	yearAndMonth,
	onYearAndMonthChange,
	userStore}: WorkoutOptions
) => {

	const [year, month, day] = yearAndMonth
	let nextYear = year
	let nextMonth = month
	let nextDay = day + 1
	let daysOfCurrentMonths = new Date(year, month, 0).getDate()
	if (component === 'workoutPanel') {
		setCategoriesPanel({
			showCategories: false,
			category: undefined,
			exercise: undefined,
			controlPanel: false,
		})
		if (nextDay > daysOfCurrentMonths) {
			nextDay = 1
			nextMonth += 1
		}
	} else if (component === 'calendar') {
		nextDay = day
		nextMonth += 1
	}

	if (nextMonth === 13) {
		nextMonth = 1
		nextYear = year + 1
	}

	onYearAndMonthChange([nextYear, nextMonth, nextDay])

}

export const renderButtons = (
	{setCategoriesPanel,
	component,
	yearAndMonth,
	onYearAndMonthChange,
	userStore,
	daysOfCurrentMonths}: Required<WorkoutOptions>
) => {

	const [year, month, day] = yearAndMonth

	return (
		<div className={styles["time-cnt"]}>
			<button
				data-testid="button-back"
				className={`${styles["button-margin"]}`}
				onClick={() =>
					handleMonthNavBackButtonClick(
						{setCategoriesPanel,
						component,
						yearAndMonth,
						onYearAndMonthChange,
						userStore,
						daysOfCurrentMonths}
					)}>
				{'<'}
			</button>
			 <h1 data-testid="time" className={styles.time}>
				{isToday(year, month, day) ? 'Today' : `${year}-${month}-${day}`}
			</h1>
			<button
				data-testid="button-forward"
				className={styles["button-margin"]}
				onClick={() =>
					handleMonthNavForwardButtonClick(
						{setCategoriesPanel,
						component,
						yearAndMonth,
						onYearAndMonthChange,
						userStore,
						daysOfCurrentMonths}
					)}>
				{'>'}
			</button>
		</div>
	)
}
