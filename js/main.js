import { checkLocalStorage } from "./api.js"
import { planets, printInfo } from "./printInfo.js"

(async function pageLoad() {
  const bodies = await checkLocalStorage();
  for (let i = 0; i < planets.length; i++) {
    planets[i].addEventListener('click', () => {
      printInfo(bodies[i]);
    })
  }
})();







