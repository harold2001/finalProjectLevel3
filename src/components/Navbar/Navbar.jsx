import React from 'react';
import "./Navbar.css";
import { IoIosArrowForward } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import App from '../../App';
import { AiOutlineSearch } from "react-icons/ai";


const removeNavBar = () => {
  const navBar = document.getElementById("main-container-navbar");
  navBar.classList.remove("active")
}

export default function Navbar({ functionForm }) {

  const ButtonList = ({ pais }) => {
    return (
      <div className="div-lista-navbar">
        <form onSubmit={functionForm}>
          <input type="text" name="city" value={pais} style={{display:"none"}} disabled/>
          <button type="submit" className="button-list-navbar col-12 px-3 py-4 d-flex justify-content-between align-items-center bg-transparent">
            <span>{pais}</span><span className="span-icon-arrow fs-5"><IoIosArrowForward /></span>
          </button>
        </form>
      </div>
    )
  }

  return (
    <div id="main-container-navbar" className="">
      <div className="px-3 py-2 d-flex flex-column gap-4">
        <div className="text-end col-12">
          <button type="button" name="boton" className="btn text-white fs-3 p-0" onClick={removeNavBar}><CgClose /></button>
        </div>
        <form onSubmit={() => functionForm(event)} className="d-flex gap-4 mb-2">
          <div className="input-group flex-nowrap bg-transparent rounded-0" style={{ border: "1px solid #E7E7EB" }}>
            <span className="input-group-text bg-transparent rounded-0 border-0" id="addon-wrapping">
              <AiOutlineSearch style={{ color: "#616475" }} />
            </span>
            <input
              style={{ color: "#616475" }}
              type="text"
              name="city"
              className="form-control bg-transparent rounded-0 border-0 py-2 text-white"
              placeholder="search location"
            />
          </div>

          <button
            style={{ backgroundColor: "#3C47E9" }}
            className="btn btn-outline-secondary rounded-0 border-0 text-white"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="d-flex flex-column">
          <ButtonList pais={"London"} />
          <ButtonList pais={"Barcelona"} />
          <ButtonList pais={"Long Beach"} />
        </div>
      </div>


    </div>
  )
}
