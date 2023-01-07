import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Hightlights from './pages/Hightlights/Hightlights';
import Home from './pages/Home/Home';
import Prediction from "./pages/Prediction/Prediction"

function App() {
  const [searchData, setSearchData] = useState({});
  const apiKey = "b01abd7f6abe6069e072265a6d553f33";
  const cityName = "callao";

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
      <Home temperature={searchData.temp} typeWeather={searchData.weather} cityName={searchData.city} />
      <div style={{ backgroundColor: "#100e1d" }} className="p-4 d-flex flex-column gap-4 d-xl-flex flex-xl-column col-xl-8 justify-content-xl-center align-items-xl-center position-relative z-3 p-xl-5">
        <Prediction nameCity={cityName} keyApi={apiKey} />
        <Hightlights speedWind={searchData.speed} humidityData={searchData.humidity} visibilityData={searchData.visibility} pressureData={searchData.pressure} />

      </div>
    </div>
  )
}

export default App
