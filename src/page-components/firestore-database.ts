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
	deleteDoc,
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
	const filterWorkoutData = userStore.workoutData?.filter(data => data.exercise == exercise)
	const userReps = filterWorkoutData ? filterWorkoutData.map(data => data.reps).flat() : []
	const userWeight = filterWorkoutData ? filterWorkoutData.map(data => data.weight).flat() : []
	const timeData = yearAndMonth.toString().split(',').join('-')

		if (userReps && userWeight) {
			userReps.push(reps)
			userWeight.push(weight)
		}

	const workout = {
		yearAndMonth: yearAndMonth, exercises: {
			[exercise]: {
				exerciseName: exercise, reps: userReps, weight: userWeight, category: category
			}
		}
	}
	const initialize = {}
	// set empty object or whatever so that collection is initialized and not skipped
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
	await setDoc(
		doc(db, 'users', userStore.userUID), {
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
	const userReps = filterWorkoutData ? filterWorkoutData.map(data => data.reps).flat() : []
	const userWeight = filterWorkoutData ? filterWorkoutData.map(data => data.weight).flat() : []
	const timeData = yearAndMonth.toString().split(',').join('-')

	userReps.splice(Number(...indexToRemove) - 1, 1)
	userWeight.splice(Number(...indexToRemove) - 1, 1)
	const workout = {
		yearAndMonth: yearAndMonth, exercises: {
			[exercise]: {
				exerciseName: exercise, reps: userReps, weight: userWeight
			}
		}
	}

	if (userReps.length === 0) {
		await deleteDoc(doc(db, 'users', userStore.userUID, "timeData", timeData, "category", category))
	} else {
			await setDoc(
			doc(db, 'users', userStore.userUID, "timeData", timeData, "category", category), {
				workout
			},
			{merge: true}
		)
	}
	getData(userStore, yearAndMonth) //refresh state with new data after data is removed from database 
}

const getData = async (userStore: UserStore, yearAndMonth: number[]) => {
	userStore.isDbDataLoading(true)
	const timeData = yearAndMonth.toString().split(',').join('-')
	const db = getFirestore()
	const querySnapshot = await getDocs(collection(db, 'users', userStore.userUID, "timeData", timeData, "category"))
	const exercises = []
	const categories = []
	if (querySnapshot.empty) {
		userStore.setDatabaseTime(undefined)
		userStore.isDbDataLoading(false)
	}
	querySnapshot.forEach((doc) => {
		categories.push(doc.id)
		if (Object.keys(doc.data()).length !== 0) {
			for (let [key, value] of Object.entries<any>(doc.data().workout.exercises)) {
				exercises.push({exercise: value.exerciseName, reps: value.reps.flat(), weight: value.weight.flat(), category: value.category})
			}
		userStore.isDbDataLoading(false)
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
			return docSnap.data().categories
	}
}

const getUserName = async (userStore: UserStore) => {
	const db = getFirestore()
	const docRef = doc(db, 'users', userStore.userUID)
	const docSnap = await getDoc(docRef)
	if (docSnap.exists()) {
		const firstName: string = docSnap.data().first
		const lastName:string = docSnap.data().last
			return {firstName, lastName}
	}
}

const getExercisesHistory = async (userStore: UserStore, category, exercise) => {
	const db = getFirestore()
	const querySnapshot = await getDocs(collection(db, 'users', userStore.userUID, "timeData"))
	const timeDataArray = []
	querySnapshot.forEach(async (doc) => {
		timeDataArray.push(doc.id)
	})
	const workoutDays = timeDataArray.map(async timeData => {
		const docRef = doc(db, 'users', userStore.userUID, "timeData", timeData, "category", category)
		const data = (await getDoc(docRef))
		if (data.exists()) {
			const workoutData = data.data().workout.exercises
			return {workoutData, timeData}
		}
		else return undefined
	})
	return workoutDays
}
export { setDocument, removeDocument, getData, renderCategoriesAndExercises, getCategories, getExercisesHistory, getUserName}
