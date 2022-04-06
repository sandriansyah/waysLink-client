import "bootstrap/dist/css/bootstrap.min.css"
import "./app.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"


import Landing from "../src/pages/Landing"
import Home from "./pages/home"
import Profile from "./pages/profile"
import CreateLink from "./pages/createLink"
import MyLinks from "./pages/mylink"
import DisplayLinks from "./pages/displayLinks"

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/createlink" element={<CreateLink/>} />
          <Route exact path="/mylink" element={<MyLinks/>} />
          <Route exact path="/display" element={<DisplayLinks/>} />
        </Routes>
      </Router>
  );
}

export default App;
