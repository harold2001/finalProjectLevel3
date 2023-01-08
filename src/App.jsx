import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Hightlights from './components/Hightlights/Hightlights';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Prediction from "./components/Prediction/Prediction";
import { AiOutlineSearch } from "react-icons/ai";

const getNewCountry = () => {
  const inputValue = document.getElementById("inputNewCountry").value;
  useEffect(() => {
    App(inputValue)
  }, [])
}

function App({city}) {
  const [searchData, setSearchData] = useState({});
  const apiKey = "b01abd7f6abe6069e072265a6d553f33";
  const cityName = {city};

  const getDataHome = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
      const datos = await res.json();
      const { temp, humidity, pressure, temp_max, temp_min } = datos.main;
      const { main: weather } = datos.weather[0]
      const { speed } = datos.wind
      const { name: city } = datos;
      const { visibility } = datos;

      const allData = {
        temp,
        weather,
        city,
        speed,
        humidity,
        visibility,
        pressure,
      }
      setSearchData(allData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataHome()
  }, [cityName]);

  
  return (
    <div className="App d-xl-flex">
      <Home temperature={searchData.temp} typeWeather={searchData.weather} cityName={searchData.city}>
        <Navbar>
          <div className="d-flex gap-4 mb-2">
            <div className="input-group flex-nowrap bg-transparent rounded-0" style={{ border: "1px solid #E7E7EB" }}>
              <span className="input-group-text bg-transparent rounded-0 border-0" id="addon-wrapping">
                <AiOutlineSearch style={{ color: "#616475" }} />
              </span>
              <input
                style={{ color: "#616475" }}
                type="text"
                className="form-control bg-transparent rounded-0 border-0 py-2 text-white"
                id="inputNewCountry"
                placeholder="search location"
                aria-label="search_location"
                aria-describedby="addon-wrapping"
              />
            </div>

            <button
              style={{ backgroundColor: "#3C47E9" }}
              className="btn btn-outline-secondary rounded-0 border-0 text-white"
              type="button"
              id="button-addon1"
              onClick={getNewCountry}
            >
              Search
            </button>
          </div>
        </Navbar>
      </Home>
      <div style={{ backgroundColor: "#100e1d" }} className="p-4 d-flex flex-column gap-4 d-xl-flex flex-xl-column col-xl-8 justify-content-xl-center align-items-xl-center position-relative z-3 p-xl-5">
        <Prediction nameCity={cityName} keyApi={apiKey} />
        <Hightlights speedWind={searchData.speed} humidityData={searchData.humidity} visibilityData={searchData.visibility} pressureData={searchData.pressure} />

      </div>
    </div>
  )
}

export default App
