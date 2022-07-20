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
	addDoc,
} from 'firebase/firestore'
import { UserStore } from './states-store/states/user-store'

const setDocument = async (
	userStore: UserStore,
	exercise: string,
	category: string,
	yearAndMonth: number[],
	reps: number,
	weight: number,
	action: string,
	indexToRemove: GridRowId[]
) => {

	const db = getFirestore()
	const [year, month, day] = yearAndMonth
	getData(userStore, yearAndMonth)
	const workoutData = userStore.workoutData
	const copyWorkoutData = userStore.workoutData ? [...workoutData] : []
	const filterWorkoutData = userStore.workoutData?.filter(data => data.exercise == exercise)
	const userReps = filterWorkoutData ? filterWorkoutData.map(data => data.reps) : []
	const userWeight = filterWorkoutData ? filterWorkoutData.map(data => data.weight) : []
	const timeData = yearAndMonth.toString().split(',').join('-')
	const repsCopy = [...userReps].flat()
	const weightCopy = [...userWeight].flat()

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

	const workout = {
		yearAndMonth: yearAndMonth, exercises: {
			[exercise]: {
				exerciseName: exercise, reps: repsCopy, weight: weightCopy
			}
		}
	}

	await setDoc(
		doc(db, 'users', userStore.userUID, timeData,category), {
			workout
		},
		{merge: true}
	)
}

const getData = async (userStore: UserStore, yearAndMonth: number[]) => {
	console.log("loaded")
	// userStore.isDbDataLoading(true)
	const [year, month, day] = yearAndMonth
	const timeData = yearAndMonth.toString().split(',').join('-')
	const db = getFirestore()
	const querySnapshot = await getDocs(collection(db, 'users', userStore.userUID, timeData));
	const d = querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, " => ", doc.data().workout.exercises)
		const categories = []
		const exercises = []
		categories.push(doc.id)
		if (Object.keys(doc.data()).length !== 0) {
			for (let [key,value] of Object.entries<any>(doc.data().workout.exercises)) {
			exercises.push({exercise: value.exerciseName, reps: value.reps.flat(), weight: value.weight.flat()})
			}
			userStore.setWorkoutData(exercises)
			userStore.setDatabaseTime(doc.data().workout.yearAndMonth)
			userStore.setCategoriesDependableOnDay(categories)
		return doc.data
		}})
}

const renderCategoriesAndExercises = async (userStore: UserStore) => {
	const db = getFirestore()
	const docRef = doc(db, 'users', userStore.userUID)
	const docSnap = await getDoc(docRef)
	if (docSnap.exists()) {
		for (let key in docSnap.data()) {
			return docSnap.data()[key]
		}
	}
}

export { setDocument, getData, renderCategoriesAndExercises}
