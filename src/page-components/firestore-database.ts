import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

// const databaseData = (userStore: any) => {
//   const db = getFirestore();
//   console.log('sram');
//   const docRef = doc(db, 'users', userStore.userUID);

//   const unsub = onSnapshot(doc(db, 'users', userStore.userUID), (doc) => {
//     console.log('Current data: ', doc.data());
//   });
//   const q = query(
//     collection(db, 'users'),
//     where('category', '==', 'Shoulders')
//   );
//   const unsubscribe = onSnapshot(q, (snapshot: any) => {
//     console.log(snapshot);
//     snapshot.docChanges().forEach((change: any) => {
//       if (change.type === 'added') {
//         console.log('New city: ', change.doc.data());
//       }
//       if (change.type === 'modified') {
//         console.log('Modified city: ', change.doc.data());
//       }
//       if (change.type === 'removed') {
//         console.log('Removed city: ', change.doc.data());
//       }
//     });
//   });
// };

// const deleteData = async (userStore: any, yearAndMonth: any, exercise:any, ) => {
//   console.log(userStore);
//   const db = getFirestore();
//   const userReps = userStore.workoutData.reps;
//   const userWeight = userStore.workoutData.weight;
//   const timeData: any = yearAndMonth.toString().split(',').join('-');
//   console.log(userReps, userWeight);
//   await updateDoc(doc(db, 'users', userStore.userUID, timeData, 'exercises'), {
//     reps: deleteField(),
//   });
// };

const setDocument = async (
  userStore: any,
  exercise: any,
  category: any,
  yearAndMonth: any,
  reps: any,
  weight: any,
  action: any,
  indexToRemove: any
) => {
  const db = getFirestore();
  const [year, month, day] = yearAndMonth;
  const userReps = userStore.workoutData.reps;
  const userWeight = userStore.workoutData.weight;
  console.log(userStore.workoutData.yearAndMonth);
  const timeData: any = yearAndMonth.toString().split(',').join('-');
  getData(userStore, yearAndMonth);
  const repsCopy = userReps ? [...userStore.workoutData.reps] : [reps];
  const weightCopy = userWeight ? [...userStore.workoutData.weight] : [weight];

  if (action === 'add') {
    if (userReps && userWeight) {
      repsCopy.push(reps);
      weightCopy.push(weight);
    }
  }
  if (action === 'remove') {
    console.log(repsCopy);
    console.log(indexToRemove[0]);
    repsCopy.splice(indexToRemove[0] - 1, 1);
    weightCopy.splice(indexToRemove[0] - 1, 1);
    // yearAndMonthCopy.splice(0, 3);
    // console.log(yearAndMonthCopy);
  }
  // var timeInMs = Date.now();
  console.log(repsCopy, weightCopy);
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
  );
};
async function getData(userStore: any, yearAndMonth: any) {
  console.log();
  userStore.isDbDataLoading(true);
  const [year, month, day] = yearAndMonth;
  const timeData = yearAndMonth.toString().split(',').join('-');
  const db = getFirestore();
  const querySnapshot = await getDocs(
    collection(db, 'users', userStore.userUID, timeData)
  );
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
  });

  const docRef = doc(db, 'users', userStore.userUID, timeData, 'exercises');
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.exists(), 'kuas');
  if (docSnap.exists()) {
    userStore.isDbDataLoading(false);
    // console.log('Document data:', docSnap.data()['Overhead press']);
    for (let key in docSnap.data()) {
      // console.log(docSnap.data()[key].category);
      const data = {
        category: docSnap.data()[key].category,
        exercise: docSnap.data()[key].exercise,
        // sets: docSnap.data()[key].sets,
        yearAndMonth: docSnap.data()[key].yearAndMonth,
        reps: docSnap.data()[key].reps,
        weight: docSnap.data()[key].weight,
      };
      userStore.setWorkoutData(data);
    }
  } else {
    // doc.data() will be undefined in this case
    // console.log('No such document!');
    userStore.isDbDataLoading(false);
  }
}

export { setDocument, getData };
