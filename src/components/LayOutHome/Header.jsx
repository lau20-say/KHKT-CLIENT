import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/Home/Logo.svg";
import { Link as LinkScroll } from "react-scroll";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [scrollActive, setScrollActive] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-30 bg-white-500 transition-all ${
          scrollActive ? "shadow-md pt-0" : "pt-2"
        }`}
      >
        <nav className="max-w-screen-xl px-4 sm:px-6 lg:px-8 mx-auto grid grid-flow-col py-2 sm:py-3">
          <div className="col-start-1 col-end-2 flex items-center">
            <img src={Logo} alt="Logo" className="h-16 w-auto" />{" "}
          </div>

          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center"></div>
        </nav>
      </header>
    </>
  );
};

export default Header;
