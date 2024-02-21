const planetSearch = document.getElementById('planetSearch');
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
let solarInfo = document.getElementById('solarInfo');
let solarSystem = document.querySelector(".main__solar-system");
let main = document.querySelector(".main");


//Creating eventlisteners for each planet and calling checkLocal function
const planets = [star, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
for (let i = 0; i < planets.length; i++) {
  planets[i].addEventListener('click', () => {
    checkLocal(solarInfo, i);
  })
}

//Eventlistener for searchbar, also creating array for indexes of each planet, then calling checkLocal function
button.addEventListener('click', () => {
  let errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = "";
  let planetIndexMap = {
    "Solen": 0,
    "Merkurius": 1,
    "Venus": 2,
    "Jorden": 3,
    "Mars": 4,
    "Jupiter": 5,
    "Saturnus": 6,
    "Uranus": 7,
    "Neptunus": 8,
  };
  let planetSearch = document.getElementById('planetSearch').value;
  if (planetIndexMap.hasOwnProperty(planetSearch)) {
    let planetIndex = planetIndexMap[planetSearch];
    checkLocal(solarInfo, planetIndex);
  } else {
    errorMessage.textContent = 'This planet does not exist in our solar system! Please try again';
    errorMessage.style.color = "red";
  }

})


//Fetches API and retrieves API queues, then calls fetchAPI function
async function fecthAPIKey(planetDiv, myIndex) {
  try {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    fetchAPi(data, planetDiv, myIndex);
  } catch (error) {
    console.error("Error: " + error);
    alert("An error has occurred! Please try again later.")
  }
}

//Fetches API with the API-key and returns data to variable bodies
async function fetchAPi(data, planetDiv, myIndex) {
  const key = data.key;
  try {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
      method: 'GET',
      headers: { 'x-zocom': `${key}` }
    })
    const { bodies } = await response.json();
    localStorage.setItem("Solar System", JSON.stringify(bodies));
    printInfo(bodies, planetDiv, myIndex);
  } catch (error) {
    console.error("Error: " + error);
    alert("An error has occurred! Please try again later.")
  }
}

//Creates element and fills element with planet info depending on index
//Search through object for specific keys to fill element
function printInfo(data, planetDiv, myIndex) {
  planetDiv.textContent = "";
  let planetIndex = myIndex;
  let planetData = data[planetIndex];
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
    planetDiv.appendChild(newElement);
  }
}


//Checks local storage, calls prints info if there is a local storage or call fetchAPiKey is there is none
function checkLocal(planetDiv, myIndex) {
  if (localStorage.getItem("Solar System")) {
    const data = JSON.parse(localStorage.getItem('Solar System'));
    printInfo(data, planetDiv, myIndex);
  } else {
    fecthAPIKey(planetDiv, myIndex);
  }
}
