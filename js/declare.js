//Denna modul hämtar  id och klasser som används på sidan samt skapar arrays för enklare hantering av data
export { planetContainer, planetSearch, errorMessage, planets, planetClasses, submitBtn, closeInfoBtn, planetInfo, planetsWrapper, planetZoomIn }

//Id's for planet divs
let sun = document.getElementById('sun');
let mercury = document.getElementById('mercury');
let venus = document.getElementById('venus');
let earth = document.getElementById('earth');
let mars = document.getElementById('mars');
let jupiter = document.getElementById('jupiter');
let saturn = document.getElementById('saturn');
let uranus = document.getElementById('uranus');
let neptune = document.getElementById('neptune');

//Id's for planet information
let planetName = document.getElementById('planetName');
let planetLatinName = document.getElementById('planetLatinName');
let planetDesc = document.getElementById('planetDesc');
let planetCircum = document.getElementById('planetCircum');
let planetKm = document.getElementById('planetKm');
let planetTempDay = document.getElementById('planetTempDay');
let planetTempNight = document.getElementById('planetTempNight');

//Id's for search bar value, span for error message and submit btn
let planetSearch = document.getElementById('planetSearch');
let errorMessage = document.getElementById('errorMessage');
const submitBtn = document.getElementById('btnSubmit');
const closeInfoBtn = document.getElementById('closeInfoBtn');


let planetInfo = document.getElementById('planetInfo');
let planetsWrapper = document.querySelector('.main__planets-wrapper');
let planetZoomIn = document.querySelector('.main__planet-zoomed-view');

//Array for planet containers
const planets = [
  sun,
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
];

//Array for planet information containers
const planetContainer = [
  planetName,
  planetLatinName,
  planetDesc,
  planetCircum,
  planetKm,
  planetTempDay,
  planetTempNight,
];

//Array for planet container classes
const planetClasses = [
  '.main__solen',
  '.main__merkurius',
  '.main__venus',
  '.main__jorden',
  '.main__mars',
  '.main__jupiter',
  '.main__saturnus',
  '.main__uranus',
  '.main__neptunus',
];