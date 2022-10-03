import { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, YAxis, Tooltip } from 'recharts';
import { getExercisesHistory } from '../../../firestore-database';
import UserStore from '../../../states-store/states/user-store';

const WorkoutChart = (workout) => {
	const userStore = useContext(UserStore)
	const [exerciseHistory, setExerciseHistory] = useState(undefined)
	useEffect(() => {
		getExercisesHistory(userStore, workout.category, workout.exercise)
			.then(data => Promise.all(data).then(data =>
				setExerciseHistory(data.filter(data => data !== undefined))))
			.catch(err => console.log(err))
	}, [])
	const filteredExerciseHistory = exerciseHistory?.map(({ workoutData, timeData }) =>
		Object.keys(workoutData).
		filter(key => key == workout.exercise).
			reduce((obj, key) => { return Object.assign(obj, { [key]: workoutData[key], timeData }) }, {}))
		.filter(value => Object.keys(value).length !== 0)
	const data = filteredExerciseHistory?.map((history, i) =>
	({timeData: history?.timeData, volume: history?.[workout.exercise]?.reps
		.map((rep, i) => rep * history?.[workout.exercise]?.weight[i]).reduce((acc,val) => acc + val, 0) }))
	const workoutVolume = filteredExerciseHistory?.map((history, i) => history?.[workout.exercise]?.reps
		.map((rep, i) => rep * history?.[workout.exercise]?.weight[i]))

	const renderLineChart = (
	<LineChart width={400} height={350} data={data}>
		<Line type="monotone" dataKey="volume" stroke="#8884d8" />
		<CartesianGrid stroke="#ccc" />
		<XAxis dataKey="timeData" />
		<YAxis />
		<Tooltip />
	</LineChart>
	)

	return (
		<div>
			<h1>Chart</h1>
			<select style={{padding: '0.5em', margin: '1em'}}>
				<option value="">volume</option>
				<option disabled value="">More to be added ...</option>
			</select>
			{renderLineChart}
		</div>
	)
}

export default WorkoutChart