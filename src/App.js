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

  // Creating the context

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
          const user = result.user;

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

  function ClickBtn(e) {
    setCheck(check + 1);

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
    } else {
      if (refSymbol.current === "+" || refSymbol.current === "-") {
        function checkDataEdit(ar) {
          if (refCheckId.current === ar.Id) {
            return true;
          }
        }
        const index = itemsArr.findIndex(checkDataEdit);

        if (num < 1) {
          itemsArr.splice(index, 1);
          let newArr = [...itemsArr];
          setItemsArr(newArr);
          AddToFirebase(newArr);
          refCheckId.current = null;
          refSymbol.current = null;
        } else {
          let Obj = itemsArr[index];
          let newObj = JSON.parse(JSON.stringify(Obj));
          newObj.num = num;
          itemsArr.splice(index, 1, newObj);
          let newArr = [...itemsArr];
          setItemsArr(newArr);
          AddToFirebase(newArr);
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
          AddToFirebase([...itemsArr, newObj]);
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
            AddToFirebase([...itemsArr, newObj]);
          } else {
            const newObj = { Title, Price, Photo, num, Id };
            itemsArr.splice(index, 1, newObj);
            let newArr = [...itemsArr];
            setItemsArr(newArr);
            AddToFirebase(newArr);
          }
        }
      }
    }
  }, [check, num]);

  useEffect(() => {
    console.log(itemsArr);
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
