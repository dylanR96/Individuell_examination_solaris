import { checkLocal } from "./api.js"
export { planets, printInfo }

const button = document.getElementById('btnSubmit');
let star = document.getElementById('sun');
let mercury = document.getElementById('mercury');
let venus = document.getElementById('venus');
let earth = document.getElementById('earth');
let mars = document.getElementById('mars');
let jupiter = document.getElementById('jupiter');
let saturn = document.getElementById('saturn');
let uranus = document.getElementById('uranus');
let neptune = document.getElementById('neptune');
let planetInfo = document.getElementById('planetInfo');
let main = document.querySelector('.main');
let mainSolarSystem = document.querySelector('.main__solar-system');

let planetN = document.getElementById('planetN');
let planetLN = document.getElementById('planetLN');
let planetD = document.getElementById('planetD');
let planetC = document.getElementById('planetC');
let planeKM = document.getElementById('planeKM');
let planetTD = document.getElementById('planetTD');
let planetTN = document.getElementById('planetTN');
let planetM = document.getElementById('planetM');

const planets = [star, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

//Creating eventlisteners for each planet and calls checkLocal function
button.addEventListener('click', () => {
  let data;
  let errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = "";
  data = checkLocal();
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

// Creates element and fills element with planet info depending on index
// Search through object for specific keys to fill element
function printInfo(data) {
  let my2Btn = document.getElementById('my2Btn');

  main.style.alignItems = 'center';
  mainSolarSystem.style.display = 'none';
  planetInfo.style.display = 'flex';

  my2Btn.addEventListener('click', closeWindow);

  let planetData = data;
  let planetName = planetData.name.toUpperCase();
  let planetLName = planetData.latinName.toUpperCase();
  let planetDesc = planetData.desc;
  let planetCirc = `${planetData.circumference} km`;
  let planetDistance = `${planetData.distance} km`;
  let planetTDay = `${planetData.temp.day} C`;
  let planetTNight = `${planetData.temp.night} C`;
  let planetMoons = planetData.moons;

  const planetDataArr = [
    planetName,
    planetLName,
    planetDesc,
    planetCirc,
    planetDistance,
    planetTDay,
    planetTNight,
    planetMoons,
  ];

  const planetDiv = [
    planetN,
    planetLN,
    planetD,
    planetC,
    planeKM,
    planetTD,
    planetTN,
    planetM,
  ];



  for (let i = 0; i < planetDataArr.length; i++) {
    let oldInfo = planetDiv[i].querySelectorAll('.planet-info');
    oldInfo.forEach((p) => {
      p.remove();
    });
    let paragraph = document.createElement('p');
    paragraph.classList.add('planet-info');
    paragraph.textContent = planetDataArr[i];
    planetDiv[i].insertAdjacentElement('beforeend', paragraph);
  }
}


function closeWindow() {
  main.style.alignItems = '';
  mainSolarSystem.style.display = 'flex';
  planetInfo.style.display = 'none';
}