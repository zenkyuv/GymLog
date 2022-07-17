import { GridRowId } from '@mui/x-data-grid/models/gridRows'
import {
	doc,
	where,
	setDoc,
	getDoc,
	getDocs,
	updateDoc,
	collection,
	getFirestore,
} from 'firebase/firestore'
import { UserStore } from './states-store/states/user-store'

const setDocument = async (
	userStore: UserStore,
	exercise: string,
	category: string,
	yearAndMonth: number[],
	reps: number[] | number,
	weight: number[] | number,
	action: string,
	indexToRemove: GridRowId[]
) => {

	const db = getFirestore()
	const [year, month, day] = yearAndMonth
	const userReps = userStore.workoutData.reps
	const userWeight = userStore.workoutData.weight
	const timeData = yearAndMonth.toString().split(',').join('-')
	getData(userStore, yearAndMonth)
	const repsCopy = userReps ? [...userStore.workoutData.reps] : [reps]
	const weightCopy = userWeight ? [...userStore.workoutData.weight] : [weight]

	if (action === 'add') {
		if (userReps && userWeight) {
			repsCopy.push(reps)
			weightCopy.push(weight)
		}
	}

	if (action === 'remove') {
		console.log('remove')
		repsCopy.splice(Number(...indexToRemove) - 1, 1)
		weightCopy.splice(Number(...indexToRemove) - 1, 1)
	}

	await setDoc(
		doc(db, 'users', userStore.userUID, timeData, 'exercises'),
		{
			[exercise]: {
				category: category,
				exercise: exercise,
				yearAndMonth: yearAndMonth,
				reps: repsCopy,
				weight: weightCopy,
				// sets: arrayUnion(`set-${timeInMs}-${reps}-${weight}`)
			},
		},
		{ merge: true }
	)

}

const getData = async (userStore: UserStore, yearAndMonth: number[]) => {
	console.log("loaded")
	userStore.isDbDataLoading(true)
	const [year, month, day] = yearAndMonth
	const timeData = yearAndMonth.toString().split(',').join('-')
	const db = getFirestore()
	const docRef = doc(db, 'users', userStore.userUID, timeData, 'exercises')
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		userStore.isDbDataLoading(false)
		for (let key in docSnap.data()) {
			const data = {
				category: docSnap.data()[key].category,
				exercise: docSnap.data()[key].exercise,
				// sets: docSnap.data()[key].sets,
				yearAndMonth: docSnap.data()[key].yearAndMonth,
				reps: docSnap.data()[key].reps,
				weight: docSnap.data()[key].weight,
			}
			userStore.setWorkoutData(data)
			return data
		}
	} else {
		userStore.isDbDataLoading(false)
		console.log("niema")
			const data = {
				category: undefined,
				exercise: undefined,
				// sets: docSnap.data()[key].sets,
				yearAndMonth: undefined,
				reps: undefined,
				weight: undefined,
		}
		userStore.setWorkoutData(data)
		return data
		// doc.data() will be undefined in this case
		// console.log('No such document!')
	}
}

const renderCategoriesAndExercises = async (userStore: UserStore) => {
	const db = getFirestore()
	const docRef = doc(db, 'users', userStore.userUID)
	const docSnap = await getDoc(docRef)
	if (docSnap.exists()) {
		for (let key in docSnap.data()) {
			return docSnap.data()[key]
		// 	const data = {
		// 		category: docSnap.data()[key].category,
		// 		exercise: docSnap.data()[key].exercise,
		// 	}
		// 	// userStore.setWorkoutData(data)
		// 	return data
		}
	}
}

export { setDocument, getData, renderCategoriesAndExercises}
