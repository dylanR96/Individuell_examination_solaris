import { checkLocalStorage } from "./api.js"
import { printInfo } from "./printInfo.js"
export { planetContainer, planets }

let star = document.getElementById('sun');
let mercury = document.getElementById('mercury');
let venus = document.getElementById('venus');
let earth = document.getElementById('earth');
let mars = document.getElementById('mars');
let jupiter = document.getElementById('jupiter');
let saturn = document.getElementById('saturn');
let uranus = document.getElementById('uranus');
let neptune = document.getElementById('neptune');

let planetName = document.getElementById('planetName');
let planetLatinName = document.getElementById('planetLatinName');
let planetDesc = document.getElementById('planetDesc');
let planetCircum = document.getElementById('planetCircum');
let planetKm = document.getElementById('planetKm');
let planetTempDay = document.getElementById('planetTempDay');
let planetTempNight = document.getElementById('planetTempNight');

const submitBtn = document.getElementById('btnSubmit');


submitBtn.addEventListener('click', () => {
  let data;
  let errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = "";
  data = checkLocalStorage();
  let planetSearch = document.getElementById('planetSearch').value;
  const myPlanet = data.filter((planet) =>
    planet.name == planetSearch
  );
  if (myPlanet.length > 0) {
    printInfo(myPlanet[0]);
  } else {
    errorMessage.textContent = 'This planet does not exist in our solar system! Please try again';
    errorMessage.style.color = "red";
  }

})

const planetContainer = [
  planetName,
  planetLatinName,
  planetDesc,
  planetCircum,
  planetKm,
  planetTempDay,
  planetTempNight,
];

const planets = [
  star,
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune
];