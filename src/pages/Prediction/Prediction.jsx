import React, { Fragment, useEffect, useState } from 'react';
import "./Prediction.css";
import { WiDaySnowThunderstorm } from "react-icons/wi";
import { v4 as uuid } from 'uuid';

const getIndex = (dataApi) => {
   const indexFiltered = [];

   // Conseguir la fecha actual y cortada
   const currentDate = new Date().toString();
   const stringUnitedDate = currentDate.split(" ").join("");
   const onlyCurrentDate = stringUnitedDate.substring(6, 8)

   dataApi.map((obj, index, arr) => {
      const { dt_txt: dateApi } = obj;
      // Conseguir la fecha en cada objeto de la API y cortada
      const stringUnitedApi = dateApi.split(" ").join("");
      const onlyDateApi = stringUnitedApi.substring(8, 10)
      const onlyHourApi = stringUnitedApi.substring(10, 12);

      if (onlyCurrentDate !== onlyDateApi) {
         if (onlyHourApi === "00") {
            indexFiltered.push(index)
         }
      }
   })

   return indexFiltered;
}

export default function Prediction({ nameCity, keyApi }) {
   const [datos, setDatos] = useState(() => []);
   const [index, setIndex] = useState(() => []);

   const getData = async () => {

      try {
         const resForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&appid=${keyApi}&units=metric`);
         const datosForecast = await resForecast.json();
         const { list } = datosForecast;
         const indexObtenido = getIndex(list);
         setIndex(indexObtenido)

         const newData = index.map((i) => {
            const tempMin = list[i].main.temp_min;
            const tempMax = list[i].main.temp_max;
            const dateDay = list[i].dt_txt.substring(0, 10)
            const weatherImage = list[i].weather[0].main;

            return {
               tempMini: tempMin,
               tempMaxi: tempMax,
               fecha: dateDay,
               imagen: weatherImage,
            }
         })

         console.log(newData)
         setDatos(newData);
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getData();
   }, [nameCity])

   const AllPredictions = () => {
      return (
         <Fragment>
            {datos.map((obj) => {
               return (
                  <div key={uuid()} className="each-prediction d-flex flex-column align-items-center justify-content-around px-3 py-2">
                     <p className="m-0">{obj.fecha}</p>
                     <div className="each-div-prediction-image d-flex justify-content-center">
                        <img src={`src/images/${obj.imagen}.png`} className="each-prediction-image posiiton-relative z-3" />
                     </div>
                     <div className="d-flex justify-content-between col-12">
                        <span>{obj.tempMaxi}</span><span style={{ color: "#A09FB1" }}>{obj.tempMini}</span>
                     </div>
                  </div>
               )
            })}
         </Fragment>
      )
   }

   return (
      <div id="main-container-prediction" className="d-flex align-items-center justify-content-center gap-4 flex-colum flex-wrap px-xl-4 gap-xxl-5">
         {/* <div className="d-flex gap-4 flex-wrap align-items-center justify-content-cente col-9 p-2 m-5 flex-xl-nowra"> */}
         <AllPredictions />
         {/* </div> */}
      </div>
   )
}
