import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import Weather from "./pages/Weather";


function App() {
  return (
    <Router>
      <Navbar /> {/* Move the Navbar inside the Router */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/weather" element={<Weather/>}/>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
