import React from 'react'
import { TiWeatherSunny } from "react-icons/ti";

export default function SpinnerLoadingHome() {
  return (
    <div style={{ height: "50%" }} className="col-12 text-center d-flex justify-content-center position-relative z-3">
      <div className="col-5 col-xl-6">
        <TiWeatherSunny style={{ color: "white", width: "100%", height: "100%" }} id="loadingIcon" />
      </div>
    </div>
  )
}
