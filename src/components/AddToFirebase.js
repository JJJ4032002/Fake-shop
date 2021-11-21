import { collection, setDoc, doc, getFirestore } from "firebase/firestore";
const db = getFirestore();

async function AddToFirebase(items) {
  console.log(items);
  try {
    // Add a new document with a generated id
    const newCityRef = doc(collection(db, "cities"));

    // later...
    await setDoc(newCityRef, { itemsArr: items });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default AddToFirebase;
