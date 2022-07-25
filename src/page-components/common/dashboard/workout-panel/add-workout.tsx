import {
	DataGrid,
	GridColDef,
	GridColumns,
	GridRowId,
	GridRowsProp,
	GridToolbar,
	GridToolbarContainer,
	GridToolbarExport,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'
import ohp from "../../../../images/ohp.jpg"
import ControlPanel from './ex-control-panel'
import renderExercises from './renderExercises'
import { useContext, useEffect, useState } from 'react'
import { renderButtons } from '../calendar/calendar-buttons'
import { WorkoutOptions } from '../../../../types/interfaces'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import UserStore from '../../../states-store/states/user-store'
import loadingIndicator from '../../../../images/loading-indicator-2.svg'
import styles from '../../../../component-styles/workout-panel.module.css'
import { renderCategoriesAndExercises } from '../../../firestore-database'

const WorkoutPanel = observer((
	{component,
	yearAndMonth,
	onYearAndMonthChange}: WorkoutOptions) => {

	const userStore = useContext(UserStore)
	const [year, month, day] = yearAndMonth
	const [categoriesPanel, setCategoriesPanel] = useState({
		showCategories: false,
		category: undefined,
		exercise: undefined,
		controlPanel: false,
	})
	const [controlPanel, setControlPanel] = useState({
		category: undefined,
		exercise: undefined,
		showPanel: false
	})
	const [categories, setCategories]:any = useState()
	const daysOfCurrentMonths = new Date(year, month, 0).getDate()
	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
	type AddButton = 'add-button-top' | 'add-button'
	const [workout, setWorkout] = useState<undefined | any>({
		category: undefined,
		exercises: undefined
	})

	useEffect(() => {
	renderCategoriesAndExercises(userStore).then(e => setCategories(e))
	}, [])

	useEffect(() => {
		setControlPanel({category: undefined, exercise: undefined, showPanel: false})
	}, [yearAndMonth])

	function CustomToolbar() {
  return (
    <GridToolbarContainer>
			<GridToolbarExport
				printOptions={{allColumns: true}}
			/>
    </GridToolbarContainer>
  );
}

	const renderCategories = () => {
		return (
			<div className={styles.categories}>
				{workout?.category === undefined
					? categories.map(({category, exercises}: any, i) => (
						<div key={i} onClick={() => setWorkout(
							{ exercises: exercises, category: category })} className={styles.category}>
							<h1 className={styles["category-name"]}>{category}</h1>
							<img className={styles["category-image"]} src={ohp} alt="ohp" />
							</div>))
					: renderExercises(workout.category,workout.exercises,userStore,yearAndMonth,setCategoriesPanel)}
			</div>
		)
	}

	const changeTimeBtns = renderButtons(
		{setCategoriesPanel,
		component,
		yearAndMonth,
		onYearAndMonthChange,
		userStore,
		daysOfCurrentMonths}
	)

	const addExerciseBtn = (css: AddButton) => {
		return (
			<div className={styles[css]} onClick={() => {
					setCategoriesPanel(prev => ({ ...prev, showCategories: true }))
					setWorkout({category: undefined, exercises: undefined})}}>
				+
			</div>
		)
	}

	const data = userStore.workoutData
	const [databaseYear, databaseMonth, databaseDay] = userStore.databaseTime
		? userStore.databaseTime
		: [0, 0, 0]
	const dataExists = databaseYear === year && databaseMonth === month && databaseDay === day
	const weight = data?.map(data => data.weight) ? data?.map(data => data.weight).flat() : undefined
	const reps = data?.map(data => data.reps) ? data?.map(data => data.reps).flat() : undefined
	const rows: GridRowsProp = data !== undefined
			? weight.map((_e, i) => ({
					reps: reps[i],
					weight: weight[i],
					id: i + 1,
						}))
		: []

	const columns: GridColumns = [
		{ field: 'id', headerName: 'Set', width: 180 },
		{ field: 'weight', headerName: 'weight', width: 180 },
		{ field: 'reps', headerName: 'reps', width: 180 }
	]

	return (
		<div className={styles["workout-cnt"]}>

			{dataExists && !categoriesPanel.controlPanel
				? (<div className={styles["time-cnt-container"]}>
					{changeTimeBtns}
					{addExerciseBtn('add-button-top')}
					</div>)
				: changeTimeBtns}

			{userStore.dbDataLoading && !categoriesPanel.controlPanel
				? (<div className={styles.center}>
					<img alt="loading" className={styles["loading-indicator"]} src={loadingIndicator} />
				</div>)
				: categoriesPanel.showCategories
					? (renderCategories())
					: dataExists && !categoriesPanel.controlPanel
						? controlPanel.showPanel
							? <ControlPanel
								exercise={controlPanel.exercise}
								category={controlPanel.category}
								yearAndMonth={yearAndMonth}
								userStore={userStore} />
							: (<div className={styles["exercise-cnt"]}>
								{data?.map(({ weight, reps, exercise, category }) => (
									<div style={{ minHeight: "100%", position: "relative" }}>
										<h3>{exercise}</h3>
										<ClickAwayListener onClickAway={() => setSelectionModel([])}
										style={{ height: '100%', width: '100%' }}>
											<DataGrid className={styles["grid-height"]} selectionModel={selectionModel}
											onSelectionModelChange={(selectionModel) => setSelectionModel(selectionModel)}
											rows={rows} pageSize={5} columns={columns} components={{ Toolbar: CustomToolbar }}
											onRowClick={() => setControlPanel({
												category: category,
												exercise: exercise,
												showPanel: true
											})}
											sx={{
												'.MuiDataGrid-row': { cursor: "pointer" },
											}} />
										</ClickAwayListener>
									</div>
								))}
								</div>)
						: !categoriesPanel.controlPanel
							? <div className={styles.center}>{addExerciseBtn('add-button')}</div>
							: (<ControlPanel
								exercise={categoriesPanel.exercise}
								category={categoriesPanel.category}
								yearAndMonth={yearAndMonth}
								userStore={userStore} />)
							} 
		</div>
	)
	}
)

export default WorkoutPanel