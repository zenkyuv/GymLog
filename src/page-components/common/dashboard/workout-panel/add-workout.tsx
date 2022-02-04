import "../../../../component-styles/workout-panel.css"
import { isToday } from "../calendar/helpers"
import {renderButtons} from "../calendar/calendar-buttons"
import { useState } from "react"

function WorkoutPanel({component, yearAndMonth, onYearAndMonthChange}:any) {
	const [year, month, day] = yearAndMonth
	const [showExercises, setExercisesPanel]: any = useState(false)
	const categories = ["Shoulders", "Triceps", "Biceps", "Chest", "Back", "Legs", "Abs"]
	const componentBetween = <h1 className="time">{isToday(year, month, day)
		? "Today" : `${year}-${month}-${day}`}</h1>

	function exercises() {
		return (
			<div className="categories">
				{categories.map(category => <div className="category">{category}</div>)}
			</div>
		)
	}

	return (
		<div className="workout-cnt">
				{renderButtons(componentBetween,component,yearAndMonth,onYearAndMonthChange)}
			{showExercises ? exercises() : <div className="add-button" onClick={() => setExercisesPanel(true)}>+</div>}
		</div>
	)
}

export default WorkoutPanel