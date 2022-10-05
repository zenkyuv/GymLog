import { useContext } from 'react'
import { logout } from '../../auth'
import { observer } from 'mobx-react-lite'
import { today } from './calendar/helpers'
import twoDots from "../../../images/two-dots.svg"
import macrosIcon from '../../../images/macros.svg'
import homeIcon from '../../../images/home-icon.svg'
import infoImg from "../../../images/info-outline.svg"
import logoutIcon from '../../../images/logout-icon.svg'
import WorkoutPanel from './workout-panel/workout-panel'
import chatDotsIcon from '../../../images/chat-dots.svg'
import UserStore from '../../states-store/states/user-store'
import calendarIcon from '../../../images/calendar-icon.svg'
import PageStore from '../../states-store/states/page-store'
import {useEffect, useReducer, useRef, useState} from 'react'
import {getData, getUserName} from '../../firestore-database'
import {CalendarDayHeader, Calendar} from './calendar/calendar'
import styles from '../../../component-styles/dashboard.module.css'
import CalorieCalculator from './calorie-calculator/calorie-calculator'
import loadingIndicatorImg from "../../../images/loading-indicator-2.svg"

const Dashboard = observer(() => {

	const [yearAndMonth, setYearAndMonth] = useState(today)
	interface User {
		firstName: string
		lastName: string
	}
	const [user, setUser] = useState<User | undefined>(undefined)
	const savedComponent = useRef('home')
	const userStore = useContext(UserStore)
	const pageStore = useContext(PageStore)
	const userWeight = useRef(null);
	const userHeight = useRef(null)
	const [infoPanel, setInfoPanel] = useState(false)
	const [bmiCalculator, setBmiCalculator] = useState(false)
	const [bmi, setBmi] = useState({
		bmiValue: undefined,
		category: undefined,
		color: undefined
	})

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
		} else if (action === 'calorieCalculator') {
			savedComponent.current = 'CalorieCalculator'
				return (component = (<CalorieCalculator/>))
		}
	}

	const [showComponent, setComponent] = useReducer(reducer, component)

	const calculateBmi = () => {
		const height = Number(userHeight.current.value)
		const weight = Number(userWeight.current.value)
		if (height && weight) {
			const bmi = Number((weight / Math.pow((height / 100), 2)).toFixed(1));
		if (bmi < 18.5) {
				const bmiItems = {bmiValue: bmi, category: "Underweight 😒", color: "#ffc44d"}
				localStorage.setItem('bmi', JSON.stringify(bmiItems));
				setBmi(bmiItems)
    	}
			else if (bmi >= 18.5 && bmi <= 24.9) {
				const bmiItems = { bmiValue: bmi, category: "Normal Weight 😍", color: "#0be881" }
				localStorage.setItem('bmi', JSON.stringify(bmiItems));
				setBmi(bmiItems)
    	}
			else if (bmi >= 25 && bmi <= 29.9) {
				const bmiItems = { bmiValue: bmi, category: "Overweight 😮", color: "#ff884d" }
				localStorage.setItem('bmi', JSON.stringify(bmiItems));
				setBmi(bmiItems)
    	}
			else {
				const bmiItems = { bmiValue: bmi, category: "Obese 😱", color: "#ff5e57" }
				localStorage.setItem('bmi', JSON.stringify(bmiItems));
				setBmi(bmiItems)
			}
		}
	}

	useEffect(() => {
		userStore.setSelectedDate(yearAndMonth)
		setComponent(savedComponent.current)
	}, [yearAndMonth])

	useEffect(() => {
		getData(userStore, yearAndMonth)
	}, [userStore, yearAndMonth])
	
	useEffect(() => {
		getUserName(userStore).then(data => setUser(data))
		const bmiFromStorage = JSON.parse(localStorage.getItem('bmi'))
		if (bmiFromStorage) {
			setBmi(bmiFromStorage)
		}
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles["cnt-row"]}>
				<div className={styles["nav-bar"]}>
					<a href="index.html" className={styles.logo}>
						Gym<br/><span className={styles.text}>Log</span>
					</a>
					<ul>
						<li className={savedComponent.current === 'home' ? styles.clicked : undefined}
								onClick={() => {setComponent('home')}}>
							<img className={styles["nav-icon"]} alt="home icon" src={homeIcon} />
						</li>
						<li className={savedComponent.current === 'calendar' ? styles.clicked : undefined}
								onClick={() => {setComponent('calendar')}}>
							<img className={styles["nav-icon"]} src={calendarIcon} alt="calendar icon"/>
						</li>
						<li className={savedComponent.current === 'calorieCalculator' ? styles.clicked : undefined}
								onClick={() => { setComponent('calorieCalculator')}}>
							<img className={`${styles["nav-icon"]} ${styles.big}`} src={macrosIcon} alt="macros icon" />
						</li>
						<li>
							<img className={styles["nav-icon"]} src={chatDotsIcon} alt="chat dots icon"/>
						</li>
						<li>
							<img onClick={() => {logout(userStore, pageStore)}} className={styles["nav-icon"]}
									src={logoutIcon}	alt="logout icon"/>
						</li>
					</ul>
				</div>
				<div className={styles.middle}>
					<div className={styles.name}>
						<h1>Hi, {user?.firstName
							? user?.firstName
							: <img src={loadingIndicatorImg} alt="loading indicator" />}</h1>
						<p>Plan your days to be more productive.</p>
					</div>
					<div className={styles.component}>
						{showComponent}
					</div>
				</div>
				<div className={styles["user-info-bar"]}>
					<h3><span> My Profile</span> <img src={twoDots} alt="" /></h3>
					<div className={styles["user-avatar"]}>{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
					<h3 className={styles["flex-center"]}>{user?.firstName && user?.lastName
						? `${user?.firstName} ${user?.lastName}`
						: <img src={loadingIndicatorImg} alt="loading indicator" />}</h3>
					{bmi?.bmiValue
						? <div className={styles["flex-column"]}>
						<div className={styles["bmi-result"]}>
							<h2 className={styles["text-bmi"]}>
								<span>BMI</span> <img onClick={() => setInfoPanel((state) => !state)} src={infoImg} alt="info icon" />
							</h2>
							<div>
								<span style={{color: bmi.color}} className={styles["bmi-value"]}>{bmi.bmiValue}</span>
								<span className={styles["bmi-category"]}>{bmi.category}</span>
							</div>
							</div>
							</div>
						: !bmiCalculator
							? <div style={{ width: '100%', marginTop: '3em' }}>
									<h2 className={styles["text-bmi"]}>
										<span>BMI</span>
										<img onClick={() => setInfoPanel((state) => !state)} src={infoImg} alt="info icon" />
									</h2>
									<button className={`${styles["bmi-button"]} ${styles["not-calculated"]}`}
										onClick={() => setBmiCalculator(true)}>
										Calculate bmi
									</button>
								</div>
							: <div className={styles["bmi-container"]}>
									<h2 className={styles["text-bmi"]}>
										<span>BMI</span> <img onClick={() => setInfoPanel((state) => !state)} src={infoImg} alt="info icon" />
									</h2>
									<h2><span>Weight:</span> <input ref={userWeight} type="number" /></h2>
									<h2><span>Height:</span> <input ref={userHeight} type="number" /></h2>
									<div>
										<button onClick={() => calculateBmi()} className={styles["bmi-button"]}>Calculate bmi</button>
									</div>
							</div>}
								{infoPanel
								? <div className={styles["info-container"]}>
									<p>
										Is BMI accurate for gym goers?
										Although BMI can be accurate for a large portion of the population,
										it often miscategorizes bodybuilders, who have an abundance of muscle,
										as having overweight or obesity. If you're a bodybuilder or another type
										of athlete, use alternative methods for evaluating your health.
									</p>
									</div>
								: null}
						<div className={styles["stats-container"]}>
							<button onClick={() => { setComponent('calorieCalculator') }}
								className={`${styles["bmi-button"]} ${styles["not-calculated"]}`}>
								Calculate daily calorie intake
							</button>
						</div>
				</div>
			</div>
		</div>
	)
})

export default Dashboard
