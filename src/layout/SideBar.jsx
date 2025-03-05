import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiMenu, FiX, FiGrid } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-600 text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        {/* Menu Button */}
        <div className="flex items-center p-3 gap-4 mt-5">
          <button
            className="text-white text-xl focus:outline-none w-10 flex justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
          <span
            className={`text-lg font-semibold transition-all duration-300 ${
              isOpen ? "opacity-100 w-44" : "opacity-0 w-0"
            }`}
          >
            Menu
          </span>
        </div>

        {/* Menu Items */}
        <ul className="space-y-3 mt-10">
          <li>
            <Link
              to="/"
              className="flex items-center p-3 hover:bg-gray-700 rounded-md gap-4"
            >
              <span className="w-10 flex justify-center">
                <FiHome className="w-6 h-6" />
              </span>
              <span
                className={`transition-all duration-300 ${
                  isOpen ? "opacity-100 w-44" : "opacity-0 w-0"
                }`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-3 hover:bg-gray-700 rounded-md gap-4"
            >
              <span className="w-10 flex justify-center">
                <FiGrid className="w-6 h-6" />
              </span>
              <span
                className={`transition-all duration-300 ${
                  isOpen ? "opacity-100 w-44" : "opacity-0 w-0"
                }`}
              >
                Dashboard
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
