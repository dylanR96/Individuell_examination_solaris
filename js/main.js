//Main module that calls a function on page load that checks local storage or fetches API
import { checkLocalStorage } from "./api.js"
import { createPlanetEvents } from "./events.js"

//Main function that loads on page load
//Calls funtion checkLocalStorage to check local storage
//Returns data from api and calls createPlanetEvents with apiData as a parameter
(async function pageLoad() {
  const apiData = await checkLocalStorage();
  createPlanetEvents(apiData);
})();







