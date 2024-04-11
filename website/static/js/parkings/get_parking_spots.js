function fetchDataAndPopulateParkingSpots(url, parkingsDivId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const parkingsDiv = document.getElementById(parkingsDivId);
            parkingsDiv.innerHTML = '';

            data.forEach(parking => {
                const parkingDiv = Object.assign(document.createElement('div'),
                    {className: "parking",
                        innerHTML:`
                                  <div class="top">
                                      <h2 class="title">${parking.name}</h2>
                                  </div>
                                  <div class="info">
                                      <h4>Owner: ${parking.owner}</h4>
                                  </div>
                                  `});
                parkingsDiv.appendChild(parkingDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
