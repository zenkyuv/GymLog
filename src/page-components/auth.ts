/* eslint-disable react-hooks/rules-of-hooks */
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import {UserStore} from './states-store/states/user-store';
import { useContext } from 'react';
import { PageStore } from './states-store/states/page-store';
import { SignUserInfo } from '../types/interfaces';
// import { databaseData } from './firestore-database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDl9CGLGd5_25H5MWJUdFjXHdh28FNnv5k',
  authDomain: 'gymlogauth.firebaseapp.com',
  projectId: 'gymlogauth',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

function createUser({ userData, userStore }: SignUserInfo) {
	const email = userData.get('email').toString()
	const password = userData.get('password').toString()
  createUserWithEmailAndPassword(auth, email, password).then(
    (cred: any) => {
      const user = cred.user;
      if (user) {
        userStore.Logged();
        userStore.setUserUID(user.uid);
      }
      return setDoc(doc(db, 'users', cred.user.uid), {
        first: 'Ada',
        last: 'Lovelace',
      });
    }
  );
}

function signUser (
		{userData,
    userStore}: SignUserInfo
) {
	const email = userData.get('email').toString()
	const password = userData.get('password').toString()
console.log(userStore)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
			if (user) {
				console.log('zalogowany')
        userStore.Logged();
        userStore.setUserUID(user.uid);
        // SetPr(email.value, password.value);
        // databaseData(userStore);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorMessage) {
        console.log('wrong credentials');
      }
    });
}

function logout(userStore: UserStore, pageStore: PageStore) {
  signOut(auth)
    .then(() => {
      pageStore.makeDashboardNotVisible();
      userStore.NotLogged();
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

// function SetPr(email: any, password: any) {
//   setPersistence(auth, browserSessionPersistence)
//     .then(() => {
//       console.log();
//       // Existing and future Auth states are now persisted in the current
//       // session only. Closing the window would clear any existing state even
//       // if a user forgets to sign out.
//       // ...
//       // New sign-in will be persisted with session persistence.
//       return signInWithEmailAndPassword(auth, email, password);
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// }
function checkIfUserLogged(userStore: UserStore) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
			 userStore.Logged();
        userStore.setUserUID(user.uid);
      // signUser();
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;

      // ...
		} else {
			console.log('nie zalogowany')
      // User is signed out
      // ...
    }
  });
}

export { signUser, createUser, logout, checkIfUserLogged };
