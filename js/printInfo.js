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
  planetInfo.textContent = "";
  let planetData = data;
  let planetName = planetData.name;
  let planetLName = planetData.latinName;
  let planetDesc = planetData.desc;
  let planetCirc = `CIRCUMFERENCE ${planetData.circumference}`;
  let planetDistance = `KM FROM THE SUN ${planetData.distance}`;
  let planetTDay = `MIN DAY-TIME TEMPERATURE ${planetData.temp.day}`;
  let planetTNight = `MIN NIGHT-TIME TEMPERATURE ${planetData.temp.night}`;
  let planetMoons = `MOONS ${planetData.moons.length}`;

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

  const className = [
    'nameStyle',
    'LnameStyle',
    'descStyle',
    'circStyle',
    'distStyle',
    'tempDStyle',
    'tempNStyle',
    'numMoonStyle',
  ];

  for (let i = 0; i < planetDataArr.length; i++) {
    let newElement = document.createElement('div');
    newElement.textContent = planetDataArr[i];
    newElement.classList.add(className[i]);
    planetInfo.appendChild(newElement);
  }
}


