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

		if (userReps && userWeight) {
			repsCopy.push(reps)
			weightCopy.push(weight)
		}

	const workout = {
		yearAndMonth: yearAndMonth, exercises: {
			[exercise]: {
				exerciseName: exercise, reps: repsCopy, weight: weightCopy, category: category
			}
		}
	}
	const initialize = {}

	await setDoc(
		doc(db, 'users', userStore.userUID, "timeData", timeData, "category", category), {
			workout
		},
		{merge: true}
	)
	await setDoc(
		doc(db, 'users', userStore.userUID, "timeData", timeData), {
			initialize
		},
		{merge: true}
	)
}

const removeDocument = async (
	indexToRemove: GridRowId[],
	userStore: UserStore,
	exercise: string,
	yearAndMonth: number[],
	category: string
) => {

	const db = getFirestore()
	const filterWorkoutData = userStore.workoutData?.filter(data => data.exercise == exercise)
	const userReps = filterWorkoutData ? filterWorkoutData.map(data => data.reps) : []
	const userWeight = filterWorkoutData ? filterWorkoutData.map(data => data.weight) : []
	const repsCopy = [...userReps].flat()
	const weightCopy = [...userWeight].flat()
	const timeData = yearAndMonth.toString().split(',').join('-')

	repsCopy.splice(Number(...indexToRemove) - 1, 1)
	weightCopy.splice(Number(...indexToRemove) - 1, 1)
	
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
	// userStore.isDbDataLoading(true)
	const timeData = yearAndMonth.toString().split(',').join('-')
	const db = getFirestore()
	const querySnapshot = await getDocs(collection(db, 'users', userStore.userUID, "timeData", timeData, "category"));
	const exercises = []
	const categories = []
	const d = querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, " => ", doc.data().workout.exercises)
		categories.push(doc.id)
		if (Object.keys(doc.data()).length !== 0) {
			for (let [key, value] of Object.entries<any>(doc.data().workout.exercises)) {
				exercises.push({exercise: value.exerciseName, reps: value.reps.flat(), weight: value.weight.flat(), category: value.category})
			}
		userStore.setDatabaseTime(doc.data().workout.yearAndMonth)
		return doc.data
		}
	})
		userStore.setWorkoutData(exercises)
}

const getCategories = async (userStore: UserStore, yearAndMonth: number[]) => { 
	const timeData = yearAndMonth.toString().split(',').join('-')
	const db = getFirestore()
	const querySnapshot = await getDocs(collection(db, 'users', userStore.userUID, "timeData", timeData, "category"));
	const categories = []
	querySnapshot.forEach((doc) => {
		categories.push(doc.id)
	})
	return categories
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

const getExercisesHistory = async (userStore: UserStore, category, exercise) => {
	console.log(category)
	console.log(userStore)
	const db = getFirestore()
	const querySnapshot = await getDocs(collection(db, 'users', userStore.userUID, "timeData"))
	const timeDataArray = []
	querySnapshot.forEach(async (doc) => {
		timeDataArray.push(doc.id)
	})
	const workoutDays = timeDataArray.map(async timeData => {
		const docRef = doc(db, 'users', userStore.userUID, "timeData", timeData, "category", category)
		const data = (await getDoc(docRef))
		console.log(data.exists())
		if (data.exists()) {
			const workoutData = data.data().workout.exercises
			return {workoutData, timeData}
		}
		else return undefined
	})
	return workoutDays
}
export { setDocument, removeDocument, getData, renderCategoriesAndExercises, getCategories, getExercisesHistory}
