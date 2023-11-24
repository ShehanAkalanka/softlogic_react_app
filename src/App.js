import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import AllRoutes from "../src/Components/Router/Router";

function App() {
  return (
    <div className="App">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
