import { planetContainer, planetSearch, errorMessage, planetClasses } from "./declare.js"
export { sortInfo }

let mainWrapper = document.querySelector('.main');
let planetInfo = document.getElementById('planetInfo');
let planetsWrapper = document.querySelector('.main__planets-wrapper');
let planetZoomIn = document.querySelector('.main__planet-zoomed-view');
let closeInfoBtn = document.getElementById('closeInfoBtn');
closeInfoBtn.addEventListener('click', closeWindow);

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
