import ControlPanel from './ex-control-panel'
import { SetExercisePanel } from '../../../../types/interfaces'
import { UserStore } from '../../../states-store/states/user-store'

const shoulderExercises = (
	category: string,
	userStore: UserStore,
	yearAndMonth: number[],
	setExercisesPanel: React.Dispatch<React.SetStateAction<SetExercisePanel>>
) => {

	const exercises = ['Overhead press']

	return (
		<div className="categories">
			{exercises.map((e, i) => (
				<div className="category" key={i} onClick={() => {
					<ControlPanel exercise={e} category={category}
							yearAndMonth={yearAndMonth} userStore={userStore}/>
						setExercisesPanel({showExercise: false, category: category,
							exercise: e, controlPanel: true})}}>
					{e}
				</div>))}
		</div>
	)
}

export default shoulderExercises