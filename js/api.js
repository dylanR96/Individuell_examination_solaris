export { checkLocal }

//Checks local storage, calls prints info if there is a local storage or call fetchAPiKey is there is none
function checkLocal() {
  let data;
  if (localStorage.getItem("Solar System")) {
    data = JSON.parse(localStorage.getItem('Solar System'));
    // printInfo(data);
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
    console.error("Error: " + error);
    alert("An error has occurred! Please try again later.")
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
    console.error("Error: " + error);
    alert("An error has occurred! Please try again later.")
  }
}