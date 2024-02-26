import { checkLocalStorage } from "./api.js"
import { createPlanetEvents } from "./declare.js"

(async function pageLoad() {
  const bodies = await checkLocalStorage();
  createPlanetEvents(bodies);
})();







