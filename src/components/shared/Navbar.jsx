import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiHome2Fill } from "react-icons/ri";
import { VscSignIn } from "react-icons/vsc";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaUserTie, FaTimes, FaBars } from "react-icons/fa";
import { FaMapMarked } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { key: "home", label: "Home", path: "/home", icon: <RiHome2Fill /> },
    { key: "login", label: "Login", path: "/", icon: <VscSignIn /> },
    {
      key: "register",
      label: "Register",
      path: "/register",
      icon: <SiGnuprivacyguard />,
    },
    { key: "profile", label: "Profile", path: "/profile", icon: <FaUserTie /> },
    {
      key: "weather",
      label: "Weather",
      path: "/weather",
      icon: <FaMapMarked />,
    },
  ];

  return (
    <nav className="shadow-md p-1 md:p-4  left-0 right-0 bg-white "> 
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/home"
            className="text-lg font-semibold text-gray-800 flex items-center"
          >
            <RiHome2Fill className="mr-2" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-4 ml-auto">
          {links.slice(1).map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className="flex items-center text-gray-700 hover:text-gray-900 transition duration-300 border px-4 py-2 rounded-full"
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col items-center">
          {links.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className="text-center text-gray-700 hover:text-gray-900 transition duration-300 mb-2 px-4 py-2 w-full"
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
