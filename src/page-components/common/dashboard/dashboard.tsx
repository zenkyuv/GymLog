import { observer } from "mobx-react-lite"
import Footer from "../footer"
import Header from "../header"
import { today } from "./calendar/helpers";
import WorkoutPanel from "./workout-panel/add-workout";
import Calendar, { CalendarDayHeader } from "./calendar/calendar";
import "../../../component-styles/dashboard.css"
import { useEffect, useReducer, useRef, useState } from "react"

const Dashboard = observer(() => {
	const [yearAndMonth, setYearAndMonth] = useState(today);
	let component: JSX.Element | undefined = undefined
	const savedComponent = useRef('')
	const [showComponent, setComponent]: any = useReducer(Reducer, component)
	
	function Reducer(state: any, action: any) {

		switch (action) {
			case 'addWorkout':
				console.log(state, action)
				savedComponent.current = "addWorkout"
				return component = <WorkoutPanel component={"workoutPanel"} yearAndMonth={yearAndMonth} onYearAndMonthChange={setYearAndMonth}/>
			// 	return component = <Calendar
			// 	today={today}
      //   yearAndMonth={yearAndMonth}
      //   onYearAndMonthChange={setYearAndMonth}
      //   renderDay={(calendarDayObject) => (
      //     <div>
      //       <CalendarDayHeader calendarDayObject={calendarDayObject} />
      //     </div>
      //   )}
      // />
		}
	}
console.log(showComponent, component)
			useEffect(() => {
		setComponent(savedComponent.current)
	}, [yearAndMonth]) 

	return (
	<div className="container">
			<Header />
		<div className="cnt-row">
				<div className="nav-bar">
					<div className="user-avatar">PG</div>
					<ul>
						<li onClick={() => setComponent('addWorkout')}>Add workout</li>
						<li>History</li>
						<li>Statistics</li>
						<li>cos</li>
					</ul>
				</div>
				{showComponent}
		</div>
			<Footer/>
	</div>
)
})

export default Dashboard