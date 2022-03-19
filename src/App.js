import "./App.css";
import HomePage from "./pages/Home/HomePage";
import ResultsPage from "./pages/Results/ResultsPage";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/results">
          <ResultsPage />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
