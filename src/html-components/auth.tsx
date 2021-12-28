import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./component-styles/register.css"
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl9CGLGd5_25H5MWJUdFjXHdh28FNnv5k",
  authDomain: "gymlogauth.firebaseapp.com",
  projectId: "gymlogauth",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth:any = getAuth();	

async function createUser(e: any, email: any, password: any, setUser: any) {
	e.preventDefault()
	createUserWithEmailAndPassword(auth, email.value, password.value).then((cred: any) => {
		const user = cred.user;
		if (user) {
			setUser.isLogged(true)
		}
		return setDoc(doc(db, "users", cred.user.uid), {
		first: "Ada",
		last: "Lovelace",
			});
		})
	}
	
function signUser(e: any, email:any, password: any, setUser: any) {
	e.preventDefault()
	signInWithEmailAndPassword(auth, email.value, password.value)
	.then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		if (user) {
			setUser.isLogged(true)		
		}
  })
  .catch((error) => {
    const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode, errorMessage)
		if (errorMessage) {
			console.log('zle haslo')
		}
  });

}

function logout(setUser: any) {
	const auth = getAuth();
	signOut(auth).then(() => {
  setUser.isLogged(false)
}).catch((error) => {
  // An error happened.
	console.log(error)
});
}
	
export {signUser, createUser, logout}