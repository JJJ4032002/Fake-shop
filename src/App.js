import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPageText from "./components/MainPageText";
import Shop from "./components/Shop";
import Products from "./components/Products";
import IndividualProduct from "./components/IndividualProduct";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/" exact component={MainPageText} />
          <Route path="/shop" component={Shop} />
          <Route path="/Product/:id" exact component={Products} />
          <Route path="/Product/Individual/:id">
            <IndividualProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
