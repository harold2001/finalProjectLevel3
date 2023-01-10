import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./SpinnerLoading.css";

export default function SpinnerLoading() {
  return (
    <div style={{ backgroundColor: "#100e1d", height: "100vh", width: "100%" }} className="col d-flex flex-column justify-content-center align-items-center gap-3 px-4 p-xl-5">
      <h1 className="text-white text-center">Escribe el nombre de una ciudad o utiliza tu ubicación actual...</h1>
      <div className="col-3 col-xl-2">
        <AiOutlineLoading3Quarters style={{ color: "white", width:"100%", height:"100%" }} id="loadingIcon"/>
      </div>
    </div>
  )
}
