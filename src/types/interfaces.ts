import {UserStore} from "../page-components/states-store/states/user-store"

export interface SignUserInfo {
	userData: FormData
	userStore: UserStore,
}

export interface SignProps {
	setClick?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SetExercisePanel {
    showExercise: boolean
    category: any
    exercise: any
    controlPanel: boolean
}

export interface WorkoutOptions {
	component: string,
	yearAndMonth: number[],
	onYearAndMonthChange: React.Dispatch<React.SetStateAction<number[]>>,
	userStore?: UserStore,
	setExercisesPanel?: React.Dispatch<React.SetStateAction<SetExercisePanel>>
}

export interface ControlPanelData {
	userStore: UserStore,
	exercise: string,
	category: string,
	yearAndMonth: number[],
	databaseTimeEqualsFrontend?: boolean
}

export interface WorkoutData {
	category: string
	exercise: string
	reps: number[]
	weight: number[]
	yearAndMonth: number[]
}