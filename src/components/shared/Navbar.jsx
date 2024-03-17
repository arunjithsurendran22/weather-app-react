import { useNavigate } from "react-router-dom";
import CurrentLocation from "../shared/CurrentLocation";
import api from "../../authorization/api";
import { IoIosLogOut } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useState } from "react";
import { SlLogout } from "react-icons/sl";

const Navbar = () => {
  const navigate = useNavigate();
  const [showExitButton, setShowExitButton] = useState(false);

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

  const handleMouseEnter = () => {
    setShowExitButton(true);
  };

  const handleMouseLeave = () => {
    setShowExitButton(false);
  };

  return (
    <div className="h-16 flex justify-between items-center bg-gray-800 text-white px-5 md:px-72 ">
      <div>
        <CurrentLocation />
      </div>
      <div
        className="flex justify-between text-2xl relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showExitButton ? (
          <ImExit className="animate-bounce cursor-pointer" onClick={handleLogout} />
        ) : (
          <button onClick={handleLogout}><SlLogout/></button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
