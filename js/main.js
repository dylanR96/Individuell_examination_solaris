import { checkLocal } from "./api.js"
import { planets, printInfo } from "./printInfo.js"

//Eventlistener for searchbar, also creating array for indexes of each planet, then calling checkLocal function
(async function pageLoad() {
  const bodies = await checkLocal();
  for (let i = 0; i < planets.length; i++) {
    planets[i].addEventListener('click', () => {
      printInfo(bodies[i]);
    })
  }
})();







