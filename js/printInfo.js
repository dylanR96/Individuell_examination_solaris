import { planetContainer, planets } from "./declare.js"
export { planets, printInfo }


let mainWrapper = document.querySelector('.main');
let planetInfo = document.getElementById('planetInfo');
let planetsWrapper = document.querySelector('.main__planets-wrapper');
let closeInfoBtn = document.getElementById('closeInfoBtn');
closeInfoBtn.addEventListener('click', closeWindow);



// Creates element and fills element with planet info depending on index
// Search through object for specific keys to fill element
function printInfo(data) {
  let planetMoons = document.getElementById('planetMoons');

  let moonsss = document.createElement('p');
  planetMoons.removeChild(planetMoons.lastChild);
  mainWrapper.style.alignItems = 'center';
  planetsWrapper.style.display = 'none';
  planetInfo.style.display = 'flex';

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


  for (let i = 0; i < planetDataArr.length; i++) {
    let oldPlanetInfo = planetContainer[i].querySelectorAll('.planet-info');
    oldPlanetInfo.forEach((p) => {
      p.remove();
    });
    let paragraph = document.createElement('p');
    paragraph.classList.add('planet-info');
    paragraph.textContent = planetDataArr[i];
    planetContainer[i].insertAdjacentElement('beforeend', paragraph);
  }
  
  if (planetMoonsData.length == 0) {
    planetNameData == "SOLEN" ?
      moonsss.innerHTML = 'This star has no moons.' :
      moonsss.innerHTML = 'This planet has no moons.';
  } else {
    moonsss.innerHTML += planetMoonsData.join(', ');
  }

  planetMoons.insertAdjacentElement('beforeend', moonsss);
}

function closeWindow() {
  mainWrapper.style.alignItems = '';
  planetsWrapper.style.display = 'flex';
  planetInfo.style.display = 'none';
}