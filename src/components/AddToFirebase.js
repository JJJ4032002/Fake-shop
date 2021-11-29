import { collection, setDoc, doc, getFirestore } from "firebase/firestore";
const db = getFirestore();
let newProdRef;
async function AddToFirebase(items, user, ref) {
  try {
    // Add a new document with a generated id
    console.log(ref);
    if (ref) {
      newProdRef = doc(db, "Products", ref);
    }
    if (newProdRef) {
      await setDoc(newProdRef, { itemsArr: items, userId: user });
    } else {
      newProdRef = doc(collection(db, "Products"));
      console.log(newProdRef);

      // later...
      await setDoc(newProdRef, { itemsArr: items, userId: user });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default AddToFirebase;
