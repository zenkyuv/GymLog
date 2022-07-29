import { useContext, useEffect, useState } from "react"
import { getExercisesHistory } from "../../../firestore-database"
import UserStore from "../../../states-store/states/user-store"
import styles from "../../../../component-styles/history.module.css"

const ExerciseHistory = (category) => {
	const userStore = useContext(UserStore)
	const [exerciseHistory, setExerciseHistory] = useState(undefined)
	useEffect(() => {
		getExercisesHistory(userStore, category.category, category.exercise)
			.then(data => Promise.all(data).then(data =>
				setExerciseHistory(data.filter(data => data !== undefined))))
			.catch(err => console.log(err))
	}, [])

	const filteredExerciseHistory = exerciseHistory?.map(({ workoutData, timeData }) =>
		Object.keys(workoutData).
		filter(key => key == category.exercise).
		reduce((obj, key) => { return Object.assign(obj, { [key]: workoutData[key], timeData }) }, {}))

	return (
		<div className={styles["history-container"]}>
			<div>History</div>
			<div className={styles["flex-column"]}>{filteredExerciseHistory?.map((history, i) =>
				<div>
					<h2>{history?.timeData}</h2>
					<div className={styles["flex-row"]} key={i}>
						<div>{history?.[category.exercise]?.reps.map(rep =>
							<h3 className={styles["h3-text"]}>{rep} <h5> reps</h5></h3>)}</div>
						<div>{history?.[category.exercise]?.weight.map(weight =>
							<h3 className={styles["h3-text"]}>{weight} <h5> kgs</h5></h3>)}</div>
					</div>
				</div>)}
			</div>
		</div>
	)
}

export default ExerciseHistory