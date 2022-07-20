import {
	daysOfWeek,
	createDaysForCurrentMonth,
	createDaysForNextMonth,
	createDaysForPreviousMonth,
	isWeekendDay,
	getMonthDropdownOptions,
	getYearDropdownOptions,
} from './helpers'
import {
	handleMonthNavBackButtonClick,
	handleMonthNavForwardButtonClick,
} from './calendar-buttons'
import classNames from 'classnames'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import UserStore from '../../../states-store/states/user-store'
import styles from '../../../../component-styles/calendar.module.css'

export const Calendar = ({
	today,
	className = '',
	yearAndMonth,
	onYearAndMonthChange,
	renderDay = () => null,
}: {
	today: number[]
	className?: string
	yearAndMonth: number[]
	onYearAndMonthChange: React.Dispatch<React.SetStateAction<number[]>>
	renderDay: (day: any) => JSX.Element
	}) => {

	let [year, month] = yearAndMonth
	const userStore = useContext(UserStore)
	type exercises = {
		"Shoulders": string,
		"Legs": string
	}
	const [category, setCategory] = useState<exercises>()
	const [yearNow, monthNow, dayNow]: number[] = today
	function getWorkoutCategory(day: { dateString: any; dayOfMonth?: number; isCurrentMonth?: boolean }) {
		const yearAndMonth = day.dateString.split("-").map((element: any) => {
			return Number(element)
		})
		// return getData(userStore, yearAndMonth).then(e => e.category)
	}
	let currentMonthDays = createDaysForCurrentMonth(year, month)
	let previousMonthDays = createDaysForPreviousMonth(
		year,
		month,
		currentMonthDays
	)

	let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays)
	let calendarGridDayObjects = [
		...previousMonthDays,
		...currentMonthDays,
		...nextMonthDays,
	]

	const handleMonthSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
		let nextYear = year
		let nextMonth = parseInt(evt.currentTarget.value, 10)
		onYearAndMonthChange([nextYear, nextMonth])
	}

	const handleYearSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
		let nextMonth = month
		let nextYear = parseInt(evt.currentTarget.value, 10)
		onYearAndMonthChange([nextYear, nextMonth])
	}

	const component = 'calendar'

	useEffect(() => {
			const a = calendarGridDayObjects.map(day => getWorkoutCategory(day))
			Promise.all(a).then((arr:any) => {
				setCategory(arr)
			})
	}, [yearAndMonth])

	return (
		<div className={styles["calendar-root"]}>
			<div className={styles["navigation-header"]}>
				<div className={styles["month-nav-arrow-buttons"]}>
					<button
						data-testid="button-back"
						onClick={() =>
							handleMonthNavBackButtonClick(
								{component,
								yearAndMonth,
								onYearAndMonthChange,
								userStore}
							)}>
						{' '}
						prev{' '}
					</button>
					<button
						data-testid="button-forward"
						onClick={() =>
							handleMonthNavForwardButtonClick(
								{component,
								yearAndMonth,
								onYearAndMonthChange,
								userStore}
							)}>
						next
					</button>
				</div>
				<select className={styles["month-select"]} value={month} onChange={handleMonthSelect}>
					{getMonthDropdownOptions().map(({ label, value }) => (
						<option value={value} key={value}>
							{label}
						</option>))}
				</select>
				<select className={styles["year-select"]} value={year} onChange={handleYearSelect}>
					{getYearDropdownOptions(year).map(({ label, value }) => (
						<option value={value} key={value}>
							{label}
						</option>))}
				</select>
			</div>
			<div className={styles["days-of-week"]}>
				{daysOfWeek.map((day, index) => (
					<div key={day} className={classNames(styles['day-of-week-header-cell'],
						{[styles['weekend-day']]: [6, 0].includes(index),})}>
						{day}
					</div>))}
			</div>
			<div className={styles["days-grid"]}>
				{calendarGridDayObjects.map((day, i) => (
					<div key={day.dateString} className={classNames(styles['day-grid-item-container'],
						{[styles['weekend-day']]: isWeekendDay(day.dateString),
						 [styles['current-month']]: day.isCurrentMonth,
						 [styles['not-current-month']]: !day.isCurrentMonth})}>
						<div className={styles["day-content-wrapper"]}>
							{day.dayOfMonth === dayNow &&
							year === yearNow &&
							month === monthNow &&
							day.isCurrentMonth
							? (<span className={styles.today}>{renderDay(day)}</span>)
							: (renderDay(day))}
							<div className={category?.[i] ? `${category?.[i]}-indicator` : ''}>
								{category?.[i]}
							</div>
						</div>
					</div>))}
			</div>
		</div>
	)
}

export const CalendarDayHeader = ({ calendarDayObject }) => {
	return (
		<div className={styles["day-grid-item-header"]}>{calendarDayObject.dayOfMonth}</div>
	)
}
