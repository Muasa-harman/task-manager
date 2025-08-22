import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import { toggleTheme } from "../redux/theme/themeSlice";
// import { IoMenuSharp } from "react-icons/io5";

export const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    const currentSearchTerm = urlParams.get("searchTerm");

    // Check if the search term has changed
    if (searchTerm !== currentSearchTerm) {
      urlParams.set("searchTerm", searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`, { replace: true });
    }
  };
  return (
    <header className="border-b-2 p-3 flex items-center position-sticky  w-full justify-between z-10 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semi-bold dark:text-white"
      >
        <span
          className="px-3 py-1 bg-white text-gray-800 font-semibold 
             rounded-lg border border-gray-300 shadow-sm
             hover:bg-gray-50 transition-colors duration-300"
        >
          Medlogix
        </span>
      </Link>
      <div className="flex gap-2 items-center md:order-2">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-12 h-10 hidden items-center sm:inline"
        >
          {theme === "light" ? (
            <FaSun />
          ) : (
            <FaMoon className="w-6 h-6" pill="true" />
          )}
        </button>
        {currentUser ? (
          <Menu />
        ) : (
          <Link to="/sign-in">
            <button
              className="px-6 py-2 rounded-lg bg-white text-gray-800 font-semibold
             border border-gray-300 shadow-sm
             hover:bg-gray-50 hover:shadow-md
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
             transition-all duration-300 ease-in-out"
            >
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};
