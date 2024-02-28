//Denna modul sorterar data från api in, skapar element, och visar information till användaren
//Modulen använder data som är skickat från  modulen declare samt tar emot data parametern som skickas från modulen events
import { planetContainer, planetClasses, planetZoomIn } from "./declare.js"
export { sortApiInfo }

//Function that sorts the data from the API, declares variables for information to be displayed for user
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

  //Array for easier handling of planet information
  const planetDataArr = [
    planetNameData,
    planetLNameData,
    planetDescData,
    planetCircData,
    planetDistanceData,
    planetTDayData,
    planetTNightData,
  ];

  //Calls functions with planet information array and also moon and planet name data separate
  displayInfo(planetDataArr, planetMoonsData, planetNameData);
}

//Function that displays planet information
function displayInfo(sortedData, moonData, planetName) {
  let windowWidth = window.innerWidth;
  //Clears div that displays a planet when search or clicked
  planetZoomIn.textContent = "";
  //Divs for when planet is displayed next to planet info
  let planetMoons = document.getElementById('planetMoons');
  let planetView = document.createElement('div');
  let saturnsRing = document.createElement('div');

  //Element for moons is created separately
  let moonInfo = document.createElement('p');
  //Clears element from moon data
  planetMoons.removeChild(planetMoons.lastChild);

  //Styling for planet displayed along side planet information
  planetZoomIn.style.display = 'flex';
  planetView.style.transform = 'translateX(0)';
  planetView.style.margin = '0';
  //If statement to check window size for responsive planets
  if (windowWidth < 768) {
    planetView.style.height = '30rem';
    planetView.style.width = '30rem';
  } else {
    planetView.style.height = '45rem';
    planetView.style.width = '45rem';
  }
  

  //For loop to give correct styling(class) to choosen planet
  //A condition to check if planet is saturn, extra class and element is then displayed
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

  //For loop to create element, add classes and display correct planet information
  for (let i = 0; i < sortedData.length; i++) {
    //Clears planet information before displaying
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


