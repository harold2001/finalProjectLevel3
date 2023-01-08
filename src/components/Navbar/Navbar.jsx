import React from 'react';
import "./Navbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import App from '../../App';

const ButtonList = ({ pais }) => {
  return (
    <div className="div-lista-navbar">
      <button type="button" className="button-list-navbar col-12 px-3 py-4 d-flex justify-content-between align-items-center bg-transparent">
        <span>{pais}</span><span className="span-icon-arrow fs-5"><IoIosArrowForward /></span>
      </button>
    </div>
  )
}

export default function Navbar({children}) {

  const removeNavBar = () => {
    const navBar = document.getElementById("main-container-navbar");
    navBar.classList.remove("active")
  }



  return (
    <div id="main-container-navbar" className="">
      <div className="px-3 py-2 d-flex flex-column gap-4">
        <div className="text-end col-12">
          <button type="button" className="btn text-white fs-3 p-0" onClick={removeNavBar}><CgClose /></button>
        </div>
        {children}
        <div className="d-flex flex-column">
          <ButtonList pais={"London"} />
          <ButtonList pais={"Barcelona"} />
          <ButtonList pais={"Long Beach"} />
        </div>
      </div>


    </div>
  )
}
