import ControlPanel from './ex-control-panel'
import { SetExercisePanel } from '../../../../types/interfaces'
import { UserStore } from '../../../states-store/states/user-store'
import styles from '../../../../component-styles/workout-panel.module.css'


	// border-bottom: 1px solid #d2d2d2;
	// padding: 1em;
const renderExercises = (
	category: string,
	exercises: [],
	userStore: UserStore,
	yearAndMonth: number[],
	setCategoriesPanel: React.Dispatch<React.SetStateAction<SetExercisePanel>>
) => {


	return (
		<div className="exercises">
			{exercises.map((e, i) => (
				<div className={styles.exercise} key={i} onClick={() => {
					<ControlPanel exercise={e} category={category}
							yearAndMonth={yearAndMonth} userStore={userStore}/>
						setCategoriesPanel({showCategories: false, category: category,
							exercise: e, controlPanel: true})}}>
					{e}
				</div>))}
		</div>
	)
}

export default renderExercises