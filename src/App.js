import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPageText from "./components/MainPageText";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/" component={MainPageText} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
