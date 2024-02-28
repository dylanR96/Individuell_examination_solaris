//Denna modul skapar alla eventlisteners samt skickar vidare data variabeln till sortAndDisplay modulen
//Denna modul får data variabeln från modulen main
import { checkLocalStorage } from "./api.js"
import { sortApiInfo } from "./sortAndDisplay.js"
import { planets, submitBtn, planetSearch, errorMessage, closeInfoBtn, planetInfo, planetsWrapper, planetZoomIn } from "./declare.js"
//planetContainer, planetClasses, planetZoomIn
export { createPlanetEvents }

//Event listener for search bar button
submitBtn.addEventListener('click', () => {
  let data;
  //Retrives infromation from checkLocalStorage function
  data = checkLocalStorage();
  //Event listener for search bar to remove error message if key is pressed
  planetSearch.addEventListener('keydown', () => {
    errorMessage.textContent = '';
    errorMessage.style.color = '';
    planetSearch.style.border = '';
  })

  let planetSearchValue;
  //Checks if user tried to submit an empty search bar
  if (planetSearch.value == "") {
    errorMessage.textContent = 'Sökrutan är tom, vänligen skriv in en planet.';
    errorMessage.style.color = 'red';
    planetSearch.style.border = '1px solid red';
  } else {
    //Allows user to write any combination of uppercase or lowercase letters for planet name
    planetSearchValue = planetSearch.value[0].toUpperCase() + planetSearch.value.substring(1).toLowerCase();
    //Filter data variable for searched planet
    const myPlanet = data.filter((planet) =>
      planet.name == planetSearchValue
    );
    //Checks if myPlanet variable has value, removes error message and calls sortApiInfo with search value as a parameter
    if (myPlanet.length > 0) {
      sortApiInfo(myPlanet[0]);
      planetsWrapper.style.display = 'none';
      planetInfo.style.display = 'flex';
      errorMessage.textContent = '';
      errorMessage.style.color = '';
      planetSearch.style.border = '';
      planetSearch.value = '';

    } else {
      errorMessage.textContent = 'Denna planet existerar inte i detta solsystem. Försök igen!';
      errorMessage.style.color = 'red';
      planetSearch.style.border = '1px solid red';
    }
  }

})
//Creates event listeners for planets and calls sortApiInfo function with clicked planet as a parameter
function createPlanetEvents(data) {
  for (let i = 0; i < planets.length; i++) {
    planets[i].addEventListener('click', () => {
      sortApiInfo(data[i]);
      planetInfo.style.display = 'flex';
      planetsWrapper.style.display = 'none';
      planetSearch.value = '';
      errorMessage.textContent = '';
      errorMessage.style.color = '';
      planetSearch.style.border = '';
    })
    planets[i].addEventListener('mouseover', () => {
      planets[i].style.boxShadow = '0px 0px 50px 25px rgb(255, 255, 255)';
    })
    planets[i].addEventListener('mouseout', () => {
      planets[i].style.boxShadow = '';
    })
  }
}

//Event listener to close planet information, resets style to hide information and display planets
closeInfoBtn.addEventListener('click', () => {
  planetsWrapper.style.display = 'flex';
  planetInfo.style.display = 'none';
  planetZoomIn.textContent = "";
  planetZoomIn.style.display = 'none';
  planetSearch.value = '';
  errorMessage.textContent = '';
  errorMessage.style.color = '';
  planetSearch.style.border = '';
})