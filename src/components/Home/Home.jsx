import "./Home.css"
import React, { Fragment, useState } from 'react';
import { WiDayRain } from "react-icons/wi";
import { MdLocationOn } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";

export default function Home({ children, temperature, typeWeather, cityName, getLocation }) {

  function GetImage() {
    return (
      <Fragment>
        <img src={`src/images/${typeWeather}.png`} className="posiiton-relative z-3 ps-xxl-4" />
      </Fragment>
    )
  }

  const setNavbar = () => {
    const navBar = document.getElementById("main-container-navbar");
    navBar.classList.add("active")
  }
  

  return (
    // <div id="background">
    <div id="main-container-home" className="d-flex flex-column gap-4 p-3 col-12 col-xl-4 justify-content-xl-around align-items-xl-center gap-xl-5 p-xl-4 position-relative">
      {children}
      <div className="d-flex justify-content-between justify-content-xl-between col-xl-12 position-relative z-3" >
        <button className="btn btn-secondary rounded-0" onClick={setNavbar}>Search for places</button>
        <button className="btn btn-secondary d-flex justify-content-center align-items-center p-2" type="submit" style={{ width: "38px", height: "100%", borderRadius: "50%" }} onClick={() => navigator.geolocation.getCurrentPosition(getLocation, console.log())}><BiCurrentLocation style={{ width: "100%", height: "100%" }} /></button>
      </div>

      <div id="div-icon-home" className="col-12 text-center d-flex ps-4 ps-xl-2 position-relative z-3 ps-xxl-5">
        <GetImage />
      </div>

      <div className="d-flex flex-column gap-4 position-relative z-3">
        <div className="text-white text-center d-flex flex-column gap-2">
          <h1 id="h1-temperature-home" className="d-flex justify-content-center align-items-end">{temperature}<span>°C</span></h1>
          <h4 id="h4-temperature-home">{typeWeather}</h4>
        </div>

        <div className="text-center d-flex flex-column justify-content-center gap-4" style={{ color: "#A09FB1", fontSize: "1.2rem" }}>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <span>Today</span><BsDot /><span>{new Date().toLocaleDateString()}</span>
          </div>

          <div className="d-flex justify-content-center align-items-center gap-1">
            <MdLocationOn /><span>{cityName}</span>
          </div>
        </div>

      </div>

    </div>
    // </div>

  )
}
