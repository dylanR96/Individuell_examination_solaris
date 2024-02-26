import { checkLocalStorage } from "./api.js"
import { sortInfo } from "./sortPrintClose.js"
export { planetContainer, planetSearch, errorMessage, planets, createPlanetEvents, planetClasses }

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

let planetSearch = document.getElementById('planetSearch');
let errorMessage = document.getElementById('errorMessage');

const submitBtn = document.getElementById('btnSubmit');

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
  neptune,
];

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


submitBtn.addEventListener('click', () => {
  let data;
  data = checkLocalStorage();
  planetSearch.addEventListener('keydown', () => {
    errorMessage.textContent = '';
    errorMessage.style.color = '';
    planetSearch.style.border = '';
  })
  let planetSearchValue = planetSearch.value[0].toUpperCase() + planetSearch.value.substring(1);
  const myPlanet = data.filter((planet) =>
    planet.name == planetSearchValue
  );
  if (myPlanet.length > 0) {
    errorMessage.textContent = '';
    errorMessage.style.color = '';
    planetSearch.style.border = '';
    sortInfo(myPlanet[0]);
    planetSearch.value = '';
  } else {
    errorMessage.textContent = 'Denna planet existerar inte i detta solsystem. Försök igen!';
    errorMessage.style.color = 'red';
    planetSearch.style.border = '1px solid red';
  }

})

function createPlanetEvents(data) {
  for (let i = 0; i < planets.length; i++) {
    planets[i].addEventListener('click', () => {
      sortInfo(data[i]);
      planetSearch.value = '';
      errorMessage.textContent = '';
      errorMessage.style.color = '';
      planetSearch.style.border = '';
    })
    planets[i].addEventListener('mouseover', () => {
      // planets[i].classList.add('main__neptune');
    })
    planets[i].addEventListener('mouseout', () => {
      // planets[i].classList.remove('main__neptune');
    })
  }
}




// if (planetsWrapper.classList.contains('main__planets--hidden')) {
//   planetsWrapper.classList.remove('main__planets--hidden');
//   setTimeout(function () {
//     planetsWrapper.classList.remove('main__planets--visuallyhidden');
//   }, 20);
// } else {
//   planetsWrapper.classList.add('main__planets--visuallyhidden');
//   planetsWrapper.addEventListener('transitionend', function (e) {
//     planetsWrapper.classList.add('main__planets--hidden');
//   }, {
//     capture: false,
//     once: true,
//     passive: false
//   });
// }

// }, false);



// let star = document.querySelector('.main__sun');
// let mercury = document.querySelector('.main__mercury');
// let venus = document.querySelector('.main__venus');
// let earth = document.querySelector('.main__earth');
// let mars = document.querySelector('.main__mars');
// let jupiter = document.querySelector('.main__jupiter');
// let saturn = document.querySelector('.main__saturn');
// let uranus = document.querySelector('.main__uranus');
// let neptune = document.querySelector('.main__neptune');