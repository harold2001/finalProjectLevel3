import React from 'react'
import "./Hightlights.css"
import { FaLocationArrow } from "react-icons/fa"

function ItemHightlight({ paddingBottom = "4", category, number, unit, children }) {
  return (
    <div className={`container-item-hightlight col-12 d-flex flex-column justify-content-center align-items-center pt-3 pb-${paddingBottom} mt-4 mt-xl-0 col-xl-5 col-lg-5 mt-lg-0`}>
      <p className="m-0">{category}</p>
      <p className="p-item-hightlights mb-1">{number}<span>{unit}</span></p>
      {children}
    </div>
  )
}

function ProgressBar({ percentage }) {
  return (
    <div className="col-10 d-flex flex-column align-items-center">
      <div className="col-12 d-flex justify-content-between">
        <div>
          <span style={{ fontSize: "12px" }}>0</span>
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>50</span>
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>100</span>
        </div>
      </div>
      <div className="progress col-12 mb-0 position-relative" role="progressbar" aria-label="Basic example" style={{ height: ".5rem" }}>
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="col-12 text-end"><span style={{ fontSize: "12px" }}>%</span></div>
    </div>
  )
}

function IconTextWindStatus() {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
      <div id="div-icon-location-hightlights" className="d-flex justify-content-center align-items-center">
        <FaLocationArrow />
      </div>
      <small>WSW</small>
    </div>
  )
}

export default function Hightlights({ speedWind, humidityData, visibilityData, pressureData }) {
  return (
    <div id="main-container-hightlights">
      <div className="col-10">
      </div>
        <h1 id="h1-hightlights" className="m-0 mb-lg-3">Today's Hightlights</h1>
      <div className="d-flex flex-column justify-content-center align-items-center pb-5 flex-wrap flex-lg-row gap-lg-3 pb-lg-0 flex-xl-row gap-xl-5 p-xl-0 px-xxl-5">
        <ItemHightlight category={"Wind status"} number={speedWind} unit={"mph"}>
          <IconTextWindStatus />
        </ItemHightlight>
        <ItemHightlight category={"Humidity"} number={humidityData} unit={"%"} paddingBottom={"1"}>
          <ProgressBar percentage={humidityData} />
        </ItemHightlight>
        <ItemHightlight category={"Visibility"} number={isNaN((visibilityData * 0.000621371).toFixed(1)) ? 0 : (visibilityData * 0.000621371).toFixed(1)} unit={" miles"} />
        <ItemHightlight category={"Air Pressure"} number={pressureData} unit={" mb"} />
      </div>

    </div>
  )
}
