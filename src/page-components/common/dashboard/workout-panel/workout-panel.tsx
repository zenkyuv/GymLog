import {
	DataGrid,
	GridColumns,
	GridRowId,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'
import ControlPanel from './control-panel'
import ohp from "../../../../images/ohp.jpg"
import renderExercises from './render-exercises'
import { useContext, useEffect, useState } from 'react'
import { renderButtons } from '../calendar/calendar-buttons'
import { WorkoutOptions } from '../../../../types/interfaces'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import UserStore from '../../../states-store/states/user-store'
import noConnectionImg from "../../../../images/cloud-offline.svg"
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
	const [categories, setCategories]: any = useState()
	const [isOnline, setStatus] = useState(navigator.onLine)
	const daysOfCurrentMonths = new Date(year, month, 0).getDate()
	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
	type AddButton = 'add-button-top' | 'add-button'
	const [workout, setWorkout] = useState<undefined | any>({
		category: undefined,
		exercises: undefined
	})

	useEffect(() => {
		setControlPanel({category: undefined, exercise: undefined, showPanel: false})
	}, [yearAndMonth])
	useEffect(() => {
		renderCategoriesAndExercises(userStore).then(e => setCategories(e))
		window.addEventListener('online', () => setStatus(true))
		window.addEventListener('offline', () => setStatus(false))
	}, [])

	function CustomToolbar(props) {
	const { exercise } = props
	return (
			<h3 style={{textAlign: 'left', padding: '0.3em'}}>{exercise}</h3>
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
	const columns: GridColumns = [
		{ field: 'id', headerName: 'Set', width: 180 },
		{ field: 'weight', headerName: 'weight', width: 180 },
		{ field: 'reps', headerName: 'reps', width: 180 }
	]

	return (
		<div className={styles["workout-cnt"]}>
			{isOnline
				? <>{dataExists && !categoriesPanel.controlPanel
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
										<ClickAwayListener onClickAway={() => setSelectionModel([])}
										style={{ height: '100%', width: '100%' }}>
											<DataGrid className={styles["grid-height"]} selectionModel={selectionModel}
											onSelectionModelChange={(selectionModel) => setSelectionModel(selectionModel)}
											rows={reps.map((_, i) =>
												({
													reps: reps[i],
													weight: weight[i],
													id: i + 1,
											}))}
											columns={columns} components={{ Toolbar: CustomToolbar }}
											componentsProps={{toolbar: {exercise}}}
											onRowClick={() => setControlPanel({
												category: category,
												exercise: exercise,
												showPanel: true
											})}
											sx={{
												'.MuiDataGrid-row': { cursor: "pointer" },
												height: 'auto',
												border: 'none'
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
					} </>
				: <div className={styles["noconnection"]}>
					<div>
						<img src={noConnectionImg} alt="noconnection img" /><span>No internet connection</span>
					</div>
					<span>Go online to get latest workout data.</span>
				</div>}
		</div>
	)
	}
)

export default WorkoutPanel