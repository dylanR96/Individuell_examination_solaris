import { planetContainer, planetClasses, planetZoomIn } from "./declare.js"
export { sortApiInfo }

function sortApiInfo(data) {
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

  displayInfo(planetDataArr, planetMoonsData, planetNameData);
}

function displayInfo(sortedData, moonData, planetName) {
  planetZoomIn.textContent = "";
  let planetMoons = document.getElementById('planetMoons');
  let planetView = document.createElement('div');
  let saturnsRing = document.createElement('div');
  let moonInfo = document.createElement('p');
  planetMoons.removeChild(planetMoons.lastChild);
  planetZoomIn.style.display = 'flex';
  planetView.style.height = '45rem';
  planetView.style.width = '45rem';
  planetView.style.transform = 'translateX(0)';
  planetView.style.margin = '0';

  for (let i = 0; i < planetClasses.length; i++) {
    planetName = planetName.toLowerCase();
    let isPlanetInClasses = planetClasses.includes(`.main__${planetName}`);
    if (isPlanetInClasses && planetName == 'saturnus') {
      saturnsRing.classList.add('main__saturn-ring--big');
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
    planetName == "solen" ?
      moonInfo.innerHTML = 'Denna stjärna har ingen måne.' :
      moonInfo.innerHTML = 'Denna planet har ingen måne.';
  } else {
    moonInfo.innerHTML += moonData.join(', ');
  }

  planetMoons.insertAdjacentElement('beforeend', moonInfo);
}


