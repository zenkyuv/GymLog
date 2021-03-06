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

const ControlPanel = (
	{userStore,
	exercise,
	category,
	yearAndMonth}: ControlPanelData) => {
	
	const [show, setShowEl] = useState(false)
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
		const weight = dbData !== [] ? dbData?.map(data => data.weight).flat() : undefined
		const reps = dbData !== [] ? dbData?.map(data => data.reps).flat() : undefined
		const index = weight
		const rows: GridRowsProp = index !== undefined
			? index.map((_e, i) => ({
				id: i + 1,
				weight: weight[i],
				reps: reps[i],
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
			<form className={`${styles.column} ${styles["add-panel"]}`} onReset={handleReset} onSubmit={handleSubmit}>
				<div className={styles["text-container"]}>
					<h4>History</h4>
					<h4>Graph</h4>
				</div>
				<h1>{exercise}</h1>
				WEIGHT(kgs):
				<TextField type="number" id={styles["outlined-start-adornment"]} placeholder="kg"
					value={values.weight} onChange={handleChange('weight')}/>
				REPS:
				<TextField type="number" value={values.reps} onChange={handleChange('reps')}
					id={styles["outlined-start-adornment"]} placeholder="reps"/>
				<div className={styles["flex-gap"]}>
					<Button type="submit"
						variant="contained" color="success">
						{isSelected
							? <span>Update</span>
							: <span>Save</span>}
					</Button>
					<Button type="reset" color={isSelected ? 'error' : 'primary'}
						onClick={() => getData(userStore, yearAndMonth)} variant="contained">
						{isSelected
							? (<span onClick={() => removeDocument(selectionModel, userStore, exercise, yearAndMonth, category)}>
								Delete </span>)
							: (<span>Clear</span>)}
					</Button>
				</div>
			</form>
			
				<div className={`${styles.row} ${styles["info-panel"]}`}>
					<ClickAwayListener onClickAway={() => setSelectionModel([])}
						style={{ height: '100%', width: '100%' }}>
						<DataGrid rows={databaseData.rows} pageSize={5} columns={columns}
							selectionModel={selectionModel} onSelectionModelChange={
								(selectionModel) => setSelectionModel(selectionModel)
							}/>
					</ClickAwayListener>
				</div>
			
		</div>
	)
}

export default ControlPanel
