import { useContext } from 'react'
import { logout } from '../../auth'
import { observer } from 'mobx-react-lite'
import { today } from './calendar/helpers'
import twoDots from "../../../images/two-dots.svg"
import {getData} from '../../firestore-database'
import homeIcon from '../../../images/home-icon.svg'
import logoutIcon from '../../../images/logout-icon.svg'
import WorkoutPanel from './workout-panel/workout-panel'
import historyIcon from '../../../images/history-icon.svg'
import calendarIcon from '../../../images/calendar-icon.svg'
import {useEffect, useReducer, useRef, useState} from 'react'
import UserStore from '../../states-store/states/user-store'
import PageStore from '../../states-store/states/page-store'
import statisticsIcon from '../../../images/statistics-icon.svg'
import {CalendarDayHeader, Calendar} from './calendar/calendar'
import styles from '../../../component-styles/dashboard.module.css'

const Dashboard = observer(() => {

	const [yearAndMonth, setYearAndMonth] = useState(today)
	const savedComponent = useRef('home')
	const userStore = useContext(UserStore)
	const pageStore = useContext(PageStore)
	let component = undefined

	const reducer = (state, action: string) => {
		if (action === 'home') {
			savedComponent.current = 'home'
			return (component = (
				<WorkoutPanel component={'workoutPanel'} yearAndMonth={yearAndMonth}
					onYearAndMonthChange={setYearAndMonth}/>
			))
		} else if (action === 'calendar') {
		 	 savedComponent.current = 'calendar'
			return (component = (
				<Calendar today={today} yearAndMonth={yearAndMonth} onYearAndMonthChange={setYearAndMonth}
					renderDay={(calendarDayObject) => (
							<CalendarDayHeader calendarDayObject={calendarDayObject} />
					)} />
				))
		}
	}

	const [showComponent, setComponent] = useReducer(reducer, component)

	useEffect(() => {
		userStore.setSelectedDate(yearAndMonth)
		setComponent(savedComponent.current)
	}, [yearAndMonth])

	useEffect(() => {
		getData(userStore, yearAndMonth)
	}, [userStore, yearAndMonth])
	
	return (
		<div className={styles.container}>
			<div className={styles["cnt-row"]}>
				<div className={styles["nav-bar"]}>
					<a href="index.html" className={styles.logo}>
						Gym<br/><span className={styles.text}>Log</span>
					</a>
					<ul>
						<li className={savedComponent.current === 'home' ? styles.clicked : undefined}
								onClick={() => {setComponent('home'), getData(userStore, yearAndMonth)}}>
							<img className={styles["nav-icon"]} alt="home icon" src={homeIcon} />
						</li>
						<li className={savedComponent.current === 'calendar' ? styles.clicked : undefined}
								onClick={() => {setComponent('calendar'), getData(userStore, yearAndMonth)}}>
							<img className={styles["nav-icon"]} src={calendarIcon} alt="calendar icon"/>
						</li>
						<li>
							<img className={styles["nav-icon"]} src={historyIcon} alt="history icon" />
						</li>
						<li>
							<img className={styles["nav-icon"]} src={statisticsIcon} alt="statistics icon"/>
						</li>
						<li>
							<img onClick={() => {logout(userStore, pageStore)}} className={styles["nav-icon"]}
									src={logoutIcon}	alt="logout icon"/>
						</li>
					</ul>
				</div>
				<div className={styles.middle}>
					<div className={styles.name}>
						<h1>Hi, nazwa</h1>
						<p>Plan your days to be more productive.</p>
					</div>
					<div className={styles.component}>
						{showComponent}
					</div>
				</div>
				<div className={styles["user-info-bar"]}>
					<h3><span> My Profile</span> <img src={twoDots} alt="" /></h3>
					<div className={styles["user-avatar"]}>PG</div>
					<h3>Przemek Galezki</h3>
				</div>
			</div>
		</div>
	)
})

export default Dashboard
