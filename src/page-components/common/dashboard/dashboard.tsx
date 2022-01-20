import { observer } from "mobx-react-lite"
import Footer from "../footer"
import Header from "../header"
import Calendar from "./calendar"
import "../../../component-styles/dashboard.css"
import { useReducer, useState } from "react"

const Dashboard = observer(() => {
	 var dt = new Date();
 var month = dt.getMonth();
	var year = dt.getFullYear();
	const weekday = dt.toLocaleString("default", { weekday: "short" })
	console.log(dt)
const daysInMonth = new Date(year, month, 0).getDate();
	console.log(daysInMonth)
	let component = undefined
	const [showComponent, setComponent]:any = useReducer(reducer, component)
	function reducer(state: any, action: any) {
		switch (action) {
			case 'calendar':
				return component = <Calendar />
		}
	}
	console.log(showComponent)
	console.log(component)
	return (
	<div className="container">
			<Header />
		<div className="cnt-row">
				<div className="nav-bar">
					<div className="user-avatar">PG</div>
					<ul>
						<li onClick={() => setComponent('calendar')}>Calendar</li>
						<li>cos</li>
						<li>cos</li>
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