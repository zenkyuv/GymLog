import {
	getAuth,
	signOut,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth'
import { categories } from './common/dashboard/workout-panel/categories'
import { initializeApp } from 'firebase/app'
import { SignUserInfo } from '../types/interfaces'
import {UserStore} from './states-store/states/user-store'
import { PageStore } from './states-store/states/page-store'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDl9CGLGd5_25H5MWJUdFjXHdh28FNnv5k',
	authDomain: 'gymlogauth.firebaseapp.com',
	projectId: 'gymlogauth',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

const createUser = ({ userData, userStore }: SignUserInfo) => {
	const email = userData.get('email').toString()
	const password = userData.get('password').toString()
	const lastName = userData.get('lastName').toString()
	const firstName = userData.get('firstName').toString()
	console.log(lastName, firstName)
	createUserWithEmailAndPassword(auth, email, password).then(
		(cred: any) => {
			const user = cred.user
			if (user) {
				userStore.loginUser()
				userStore.setUserUID(user.uid)
			}
			return setDoc(doc(db, 'users', cred.user.uid), {
				categories,
				first: firstName,
				last: lastName,
			}).catch(err => console.log(err))
		}
	)
}

const signUser = ({userData, userStore}: SignUserInfo) => {
	const email = userData.get('email').toString()
	const password = userData.get('password').toString()
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user
			if (user) {
				console.log('zalogowany')
				userStore.loginUser()
				console.log(user.uid)
				userStore.setUserUID(user.uid)
			}
		})
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message
			console.log(errorCode, errorMessage)
			if (errorMessage) {
				console.log('wrong credentials')
			}
		})
}

const logout = (userStore: UserStore, pageStore: PageStore) => {
	signOut(auth)
		.then(() => {
			pageStore.makeDashboardNotVisible()
			userStore.logoutUser()
		})
		.catch((error) => {
			console.log(error)
		})
}

const checkIfUserLogged = (userStore: UserStore) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log("zalogowany")
			userStore.loginUser()
			userStore.setUserUID(user.uid)
			const uid = user.uid
		} else {
			console.log('nie zalogowany')
		}
	})
}

export { signUser, createUser, logout, checkIfUserLogged }
