const planetSearch = document.getElementById('planetSearch');
const button = document.getElementById('btnSubmit');




button.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => fetchAPi(data, planetSearch.value))
.catch((error) => console.error('Error:', error));
})

async function fetchAPi(data, value) {
  const key = data.key;
  try {
   const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
     method: 'GET',
     headers: {'x-zocom': `${key}`}
   })
   const data = await response.json();
   const bodies = data.bodies;
   console.log(bodies);
   for(let i = 0; i < bodies.length; i++){
    if(bodies[i].name == value) {
      console.log("You found it!");
     } else {
      console.log("No dice!");
     }
   }
   
   
   
 } catch (error) {
   console.error("Error: " + error);
   alert("An error has occurred! Please try again later!")
 }
 }

