"use strict";

export const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=30d4f5b2038a8b73139044f69026e30c';

const kelvinToF = (kelvin) => {
  return Math.round((kelvin - 273.15) * 1.8 +32) + ' ˚F';
};

export function Api(latitude, longitude) {
  const url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
  return fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
      return {
        city: json.name,
        temperature: kelvinToF(json.main.temp),
        description: json.weather[0].description
      }
    }
  )
  .catch((err) => console.log("Api", err));
}

//export {rootURI};
//export {kelvinToF};
//export default {Api};
