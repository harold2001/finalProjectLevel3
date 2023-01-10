import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Hightlights from './components/Hightlights/Hightlights';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Prediction from "./components/Prediction/Prediction";
import SpinnerLoading from "./components/SpinnerLoading/SpinnerLoading";
import Clouds from "./assets/Clouds.png";
import Clear from "./assets/Clear.png";
import Drizzle from "./assets/Drizzle.png";
import Fog from "./assets/Fog.png";
import Hail from "./assets/Hail.png";
import LightCloud from "./assets/LightCloud.png";
import Mist from "./assets/Mist.png";
import Rain from "./assets/Rain.png";
import Shower from "./assets/Shower.png";
import Sleet from "./assets/Sleet.png";
import Snow from "./assets/Snow.png";
import Thunderstorm from "./assets/Thunderstorm.png";

const removeNavBar = () => {
  const navBar = document.getElementById("main-container-navbar");
  navBar.classList.remove("active");
}

export default function App() {
  const apiKey = "b01abd7f6abe6069e072265a6d553f33";
  const [finalData, setFinalData] = useState({});
  let apiData;
  // let finalData;
  let latitudeData;
  let longitudeData;
  // let nameCity;
  const [nameCity, setNameCity] = useState();

  const getCurrentLocation = (position) => {
    const { latitude, longitude } = position.coords;
    latitudeData = latitude;
    longitudeData = longitude;
    getDataHome();
  }


  async function getDataHome(e) {
    try {
      if (latitudeData && longitudeData !== undefined) {
        const resCoords = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudeData}&lon=${longitudeData}&appid=${apiKey}&units=metric`);
        const datosCoords = await resCoords.json();
        apiData = datosCoords;
        setNameCity(apiData.name);
      } else {
        e.preventDefault();
        const { city } = e.target.elements;
        const cityName = city.value;
        setNameCity(cityName);
        const resCity = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        const datosCity = await resCity.json();
        apiData = datosCity;
      }

      const { temp, humidity, pressure } = apiData.main;
      const { main: weather } = apiData.weather[0]
      const { speed } = apiData.wind
      const { name: city } = apiData;
      const { visibility } = apiData;

      setFinalData({
        temp,
        weather,
        city,
        speed,
        humidity,
        visibility,
        pressure,
      });
      removeNavBar();
    } catch (error) {
      console.log(error)
    }
  }

  const [image, setImage] = useState();
  useEffect(() => {
    if (finalData.weather === "Clouds") {
      setImage(Clouds);
    } else if (finalData.weather === "Clear") {
      setImage(Clear);
    } else if (finalData.weather === "Drizzle") {
      setImage(Drizzle)
    } else if (finalData.weather === "Fog") {
      setImage(Fog)
    } else if (finalData.weather === "Hail") {
      setImage(Hail)
    } else if (finalData.weather === "LightCloud") {
      setImage(LightCloud)
    } else if (finalData.weather === "Mist") {
      setImage(Mist)
    } else if (finalData.weather === "Rain") {
      setImage(Rain)
    } else if (finalData.weather === "Shower") {
      setImage(Shower)
    } else if (finalData.weather === "Sleet") {
      setImage(Sleet)
    } else if (finalData.weather === "Snow") {
      setImage(Snow)
    } else if (finalData.weather === "Thunderstorm") {
      setImage(Thunderstorm)
    }
  }, [finalData])

  return (
    <div className="App d-lg-flex" style={{ width: "100vw" }}>
      <Home temperature={finalData.temp} typeWeather={finalData.weather} cityName={finalData.city} getLocation={getCurrentLocation} imagen={image}>
        <Navbar functionForm={getDataHome}></Navbar>
      </Home>
      {nameCity!== undefined ?
          <div style={{ backgroundColor: "#100e1d" }} className="p-4 d-flex flex-column gap-4 p-lg-4 d-xl-flex flex-xl-column col justify-content-xl-center align-items-xl-center position-relative z-3 p-xl-5">
            <Prediction nameCity={nameCity} keyApi={apiKey} />
            <Hightlights speedWind={finalData.speed} humidityData={finalData.humidity} visibilityData={finalData.visibility} pressureData={finalData.pressure} />
          </div>
          :
          <SpinnerLoading />}
    </div>
  )
}
