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

let mainWrapper = document.querySelector('.main');
let planetInfo = document.getElementById('planetInfo');
let planetsWrapper = document.querySelector('.main__planets-wrapper');
let planetZoomIn = document.querySelector('.main__planet-zoomed-view');
let closeInfoBtn = document.getElementById('closeInfoBtn');
closeInfoBtn.addEventListener('click', closeWindow);

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

(async function pageLoad() {
  const bodies = await checkLocalStorage();
  createPlanetEvents(bodies);
})();

function checkLocalStorage() {
  let data;
  if (localStorage.getItem("Solar System")) {
    data = JSON.parse(localStorage.getItem('Solar System'));
  } else {
   data = fetchhAPIKey();
  }
  return data;
}


//Fetches API and retrieves API queues, then calls fetchAPI function
async function fetchhAPIKey() {
  try {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    return fetchAPi(data);
  } catch (error) {
    console.error(`Error: ${error}`);
    alert("Error: ${error} has occurred! Please try again later.")
  }
}

//Fetches API with the API-key and returns data to variable bodies
async function fetchAPi(data) {
  const key = data.key;
  try {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
      method: 'GET',
      headers: { 'x-zocom': `${key}` }
    })
    const { bodies } = await response.json();
    localStorage.setItem("Solar System", JSON.stringify(bodies));
    return bodies;
  } catch (error) {
    console.error(`Error: ${error}`);
    alert("Error: ${error} has occurred! Please try again later.")
  }
}


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


function sortInfo(data) {
  let planetData = data;
  let planetNameData = planetData.name.toUpperCase();
  let planetLNameData = planetData.latinName.toUpperCase();
  let planetDescData = planetData.desc;
  let planetCircData = `${planetData.circumference} km`;
  let planetDistanceData = `${planetData.distance} km`;
  let planetTDayData = `${planetData.temp.day} C`;
  let planetTNightData = `${planetData.temp.night} C`;
  let planetMoonsData = planetData.moons;

  const planetDataArr = [
    planetNameData,
    planetLNameData,
    planetDescData,
    planetCircData,
    planetDistanceData,
    planetTDayData,
    planetTNightData,
  ];

  printInfo(planetDataArr, planetMoonsData, planetNameData);
}

// Creates element and fills element with planet info depending on index
// Search through object for specific keys to fill element
function printInfo(sortedData, moonData, planetName) {
  let planetMoons = document.getElementById('planetMoons');
  let planetView = document.createElement('div');
  let saturnsRing = document.createElement('div');
  let moonInfo = document.createElement('p');
  planetMoons.removeChild(planetMoons.lastChild);
  planetInfo.style.display = 'flex';
  planetsWrapper.style.display = 'none';
  planetZoomIn.style.display = 'flex';
  planetView.style.height = '50rem';
  planetView.style.width = '50rem';
  planetView.style.transform = 'translateX(0)';

  for (let i = 0; i < planetClasses.length; i++) {
    planetName = planetName.toLowerCase();
    let isPlanetInClasses = planetClasses.includes(`.main__${planetName}`);
    if (isPlanetInClasses && planetName == 'saturnus') {
      saturnsRing.classList.add('main__saturn__ring--big');
      planetView.appendChild(saturnsRing);
    }
    planetView.classList.add(`main__${planetName}`);
    planetZoomIn.appendChild(planetView);
  }

  for (let i = 0; i < sortedData.length; i++) {
    let oldPlanetInfo = planetContainer[i].querySelectorAll('.planet-info');
    oldPlanetInfo.forEach((p) => {
      p.remove();
    });
    let newPlanetInfo = document.createElement('p');
    newPlanetInfo.classList.add('planet-info');
    newPlanetInfo.textContent = sortedData[i];
    planetContainer[i].insertAdjacentElement('beforeend', newPlanetInfo);
  }

  if (moonData.length == 0) {
    planetName == "SOLEN" ?
      moonInfo.innerHTML = 'Denna stjärna har ingen måne.' :
      moonInfo.innerHTML = 'Denna planet har ingen måne.';
  } else {
    moonInfo.innerHTML += moonData.join(', ');
  }

  planetMoons.insertAdjacentElement('beforeend', moonInfo);
}

function closeWindow() {
  mainWrapper.style.alignItems = '';
  planetsWrapper.style.display = 'flex';
  planetInfo.style.display = 'none';
  planetZoomIn.textContent = "";
  planetZoomIn.style.display = 'none';
  planetSearch.value = '';
  errorMessage.textContent = '';
  errorMessage.style.color = '';
  planetSearch.style.border = '';
}
