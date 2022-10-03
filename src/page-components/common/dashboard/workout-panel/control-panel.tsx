import {
	DataGrid,
	GridRowsProp,
	GridColDef,
	GridRowId,
} from '@mui/x-data-grid'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { ClickAwayListener } from '@mui/material'
import { ControlPanelData } from '../../../../types/interfaces'
import { getData, removeDocument, setDocument } from '../../../firestore-database'
import styles from '../../../../component-styles/control-panel.module.css'
import ExerciseHistory from './exercise-history'
import WorkoutChart from './workout-chart'

const ControlPanel = (
	{userStore,
	exercise,
	category,
	yearAndMonth}:ControlPanelData) => {
	
	const [show, setShowEl] = useState(false)
	const [historyPanel, setHistoryPanel] = useState(false)
	const [workoutChart, setWorkoutChart] = useState(false)
	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
	interface State {
		weight: number | string
		reps: number | string
	}

	const [values, setValues] = useState<State>({
		weight: 0,
		reps: 0,
	})

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			if (Number(event.target.value) >= 0) {
				setValues({ ...values, [prop]: event.target.value })
			}
		}

	const handleSubmit = (e) => {
		e.preventDefault()
		const reps = Number(values.reps)
		const weight = Number(values.weight)
		if (weight >= 0 && reps >= 0) {
			setDocument(userStore, exercise, category, yearAndMonth, reps, weight)
		} else {
			setShowEl(true)
			setTimeout(() => {
				setShowEl(false)
			}, 3000)
		}
	}

	const handleReset = () => {
		setValues({
			weight: 0,
			reps: 0,
		})
	}

	const loadDatabaseData = () => {
		const dbData = userStore.workoutData?.filter(data => data.exercise == exercise)
		const weight = dbData?.map(data => data.weight).flat()
		const reps = dbData?.map(data => data.reps).flat()
		const index = weight
		const rows: GridRowsProp = index !== undefined
			? index.map((_e, i) => ({
				id: i + 1,
				weight: weight?.[i],
				reps: reps?.[i],
			}))
			: []
		return {weight, reps, rows}
	}

	const databaseData = loadDatabaseData()
	const isSelected = selectionModel.length > 0
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Set', width: 180 },
		{ field: 'weight', headerName: 'Weight', width: 180 },
		{ field: 'reps', headerName: 'Reps', width: 180 },
	]

	return (
		<div className={`${styles.row} ${styles["flex-wrap"]}`}>
			{historyPanel
				? <ExerciseHistory category={category} exercise={exercise} />
				: workoutChart
					? <WorkoutChart category={category} exercise={exercise} /> 
					: <><form className={`${styles.column} ${styles["add-panel"]}`} onReset={handleReset} onSubmit={handleSubmit}>
					<div className={styles["text-container"]}>
						<h4 onClick={() => setHistoryPanel(true)}>History</h4>
						<h4 onClick={() => setWorkoutChart(true)}>Graph</h4>
					</div>
					<h1>{exercise}</h1>
					WEIGHT(kgs):
					<TextField type="number" id={styles["outlined-start-adornment"]} placeholder="kg"
						value={values?.weight} onChange={handleChange('weight')} />
					REPS:
					<TextField type="number" value={values?.reps} onChange={handleChange('reps')}
						id={styles["outlined-start-adornment"]} placeholder="reps" />
						<div className={styles["flex-gap"]}>
							{isSelected
								? <Button type="submit" variant="contained" color="success">Update</Button>
								:	<Button type="submit" variant="contained" color="success">Save</Button>}
							{isSelected
								? <Button onClick={() => removeDocument(selectionModel, userStore, exercise, yearAndMonth, category)}
									type="reset" color={isSelected ? 'error' : 'primary'} variant="contained">
									Delete
								</Button>
								: <Button type="reset" color={isSelected ? 'error' : 'primary'} variant="contained">
									Clear
								</Button>}
					</div>
				</form>
				<div className={`${styles.row} ${styles["info-panel"]}`}>
						<ClickAwayListener onClickAway={() => setSelectionModel([])}
							style={{ height: '100%', width: '100%' }}>
							<DataGrid rows={databaseData.rows} columns={columns}
								selectionModel={selectionModel} onSelectionModelChange={(selectionModel) => setSelectionModel(selectionModel)} />
						</ClickAwayListener>
					</div></>
			}
			
		</div>
	)
}

export default ControlPanel
