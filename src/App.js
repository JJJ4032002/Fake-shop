import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPageText from "./components/MainPageText";
import Shop from "./components/Shop";
import Products from "./components/Products";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/" exact component={MainPageText} />
          <Route path="/shop" component={Shop} />
          <Route path="/Product/:id" component={Products} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
