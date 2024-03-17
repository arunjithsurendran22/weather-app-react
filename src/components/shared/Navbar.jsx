import { useNavigate } from "react-router-dom";
import CurrentLocation from "../shared/CurrentLocation";
import api from "../../authorization/api";
import Drawer from "./Drawer";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post("/profile/logout");
      if (response.data.message === "Logout successful") {
        localStorage.clear();
        // Navigate to the login page
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="h-16 flex justify-between items-center bg-gray-800 text-white px-6">
      <CurrentLocation />
      <div className="flex justify-between w-72">
        <Drawer />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
