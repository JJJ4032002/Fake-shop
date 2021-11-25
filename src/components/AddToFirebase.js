import { collection, setDoc, doc, getFirestore } from "firebase/firestore";
const db = getFirestore();
let newCityRef = "";
async function AddToFirebase(items) {
  try {
    // Add a new document with a generated id
    if (newCityRef) {
      await setDoc(newCityRef, { itemsArr: items });
    } else {
      newCityRef = doc(collection(db, "Products"));

      // later...
      await setDoc(newCityRef, { itemsArr: items });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default AddToFirebase;
