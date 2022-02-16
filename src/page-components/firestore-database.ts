import { doc, getDoc, getFirestore } from "firebase/firestore";
import UserStore from "./states-store/states/user-store";
import { useContext } from "react";
const datadabseData = async (userStore:any) => {
	console.log(userStore.userUID)
	const db = getFirestore()
	const docRef = doc(db, "users", userStore.userUID)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}

export default datadabseData