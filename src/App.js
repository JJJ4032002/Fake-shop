import Navbar from "./components/Navbar";
import { Switch, Route, HashRouter } from "react-router-dom";
import MainPageText from "./components/MainPageText";
import Shop from "./components/Shop";
import Products from "./components/Products";
import IndividualProduct from "./components/IndividualProduct";
import { createContext, useEffect, useRef, useState } from "react";
import Cart from "./components/Cart";

import { app } from "./components/FirebaseInitialization";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import AddToFirebase from "./components/AddToFirebase";
const context = createContext("0");
function App() {
  const refTitle = useRef(null);
  const refPrice = useRef(null);
  const refPhoto = useRef(null);
  const refQuantity = useRef(null);
  const refId = useRef(null);
  const refSymbol = useRef(null);
  const refCheckId = useRef(null);
  const [itemsArr, setItemsArr] = useState([]);
  let [num, setNum] = useState(0);
  const [check, setCheck] = useState(0);
  const [signIn, setSignIn] = useState(true);
  const [pending, setPending] = useState(true);
  const [user, setUser] = useState("");
  const db = getFirestore();
  const [userId, setUserId] = useState("");
  // Creating the context
  async function getItems(id) {
    const docRef = query(collection(db, "Products"), where("userId", "==", id));

    const docSnap = await getDocs(docRef);

    docSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserId(doc.id);
      setItemsArr(doc.data().itemsArr);
      if (check < 1) {
        setCheck(check + 1);
      }

      console.log(doc);
    });
  }
  //
  function SignInChange() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    if (signIn) {
      setSignIn(false);
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.

          setUser(result.user.uid);
          getItems(result.user.uid);
          setPending(false);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          setSignIn(true);
          // ...
        });
    } else {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
      setSignIn(true);
      setPending(true);
    }
  }

  function CanAddToFirebase(items) {
    if (signIn) {
      console.log("Have not signed in yet");
    } else {
      AddToFirebase(items, user, userId);
    }
  }

  function ClickBtn(e) {
    if (check === 1) {
      setCheck(check + 1);
    }

    let Quantity = refQuantity.current.value;
    Quantity = Number(Quantity);
    const Id = refId.current.id;
    if (itemsArr.length === 0) {
      console.log("Empty array");
      setNum(Quantity);
    } else {
      function checkDataEdit(ar) {
        if (Id === ar.Id) {
          return true;
        }
      }
      const index = itemsArr.findIndex(checkDataEdit);

      if (index === -1) {
        console.log(num);
        setNum(Quantity);
      } else {
        let prev = itemsArr[index].num;
        setNum(prev + Quantity);
      }
    }
  }

  function ClickCartBtn(e) {
    setCheck(check + 1);
    let symbol = e.target.textContent;
    let Quantity = "";

    if (symbol === "+") {
      Quantity = e.target.previousSibling.textContent;
    } else {
      Quantity = e.target.nextSibling.textContent;
    }
    Quantity = Number(Quantity);
    refSymbol.current = symbol;

    let id = e.target.parentNode.parentNode.id;
    refCheckId.current = id;

    if (symbol === "+") {
      setNum(Quantity + 1);
    } else if (symbol === "-") {
      setNum(Quantity - 1);
    }
  }

  useEffect(() => {
    if (check === 0) {
      console.log("UseEffect ran first time");
    } else if (check === 1 && !signIn) {
      console.log("Ran for first time after sign in");
    } else {
      if (refSymbol.current === "+" || refSymbol.current === "-") {
        function checkDataEdit(ar) {
          if (refCheckId.current === ar.Id) {
            return true;
          }
        }
        const index = itemsArr.findIndex(checkDataEdit);

        if (num < 1) {
          let newArr = [...itemsArr];
          newArr.splice(index, 1);
          setItemsArr(newArr);
          CanAddToFirebase(newArr);
          refCheckId.current = null;
          refSymbol.current = null;
        } else {
          let Obj = itemsArr[index];
          let newObj = JSON.parse(JSON.stringify(Obj));
          newObj.num = num;

          let newArr = [...itemsArr];
          newArr.splice(index, 1, newObj);
          setItemsArr(newArr);
          CanAddToFirebase(newArr);
          refCheckId.current = null;
          refSymbol.current = null;
        }
      } else {
        const Title = refTitle.current.textContent;
        const Price = refPrice.current.textContent;
        const Photo = refPhoto.current.src;
        const Id = refId.current.id;

        if (itemsArr.length === 0) {
          console.log("Empty array");
          const newObj = { Title, Price, Photo, num, Id };
          setItemsArr([...itemsArr, newObj]);
          CanAddToFirebase([...itemsArr, newObj]);
        } else {
          function checkDataEdit(ar) {
            if (Id === ar.Id) {
              return true;
            }
          }
          const index = itemsArr.findIndex(checkDataEdit);
          if (index === -1) {
            const newObj = { Title, Price, Photo, num, Id };
            setItemsArr([...itemsArr, newObj]);
            CanAddToFirebase([...itemsArr, newObj]);
          } else {
            const newObj = { Title, Price, Photo, num, Id };
            itemsArr.splice(index, 1, newObj);
            let newArr = [...itemsArr];
            setItemsArr(newArr);
            CanAddToFirebase(newArr);
          }
        }
      }
    }
  }, [check, num]);

  useEffect(() => {
    console.log(itemsArr);
    console.log(user);
  }, [itemsArr]);
  return (
    <HashRouter>
      <div className="App">
        <context.Provider
          value={{ SignIn: signIn, Pending: pending, SignInBtn: SignInChange }}
        >
          <Navbar />
        </context.Provider>

        <Switch>
          <Route path="/" exact component={MainPageText} />
          <Route path="/shop" component={Shop} />
          <Route path="/Product/:id" exact component={Products} />
          <Route path="/Product/Individual/:id">
            <IndividualProduct
              click={ClickBtn}
              title={refTitle}
              price={refPrice}
              photo={refPhoto}
              quantity={refQuantity}
              indId={refId}
            />
          </Route>
          <Route exact path="/Cart">
            <Cart
              clickCart={ClickCartBtn}
              title={refTitle}
              price={refPrice}
              photo={refPhoto}
              quantity={refQuantity}
              indId={refId}
              arr={itemsArr}
            />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}
export const MyContextConsumer = context.Consumer;
export default App;
