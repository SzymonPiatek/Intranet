document.addEventListener('DOMContentLoaded', function() {
    const parkingDataUrl = document.getElementById('parkingData');
    const parkingItemsContainer = document.getElementById('parkingItems');

    function showParkingData () {
        const url = parkingDataUrl.getAttribute('data-url');
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.hasOwnProperty('user_parking_spots')) {
                    const parkingData = data.user_parking_spots;
                    const parkingDataDiv = Object.assign(document.createElement('div'),
                        {className: 'item'});

                    if (Array.isArray(parkingData)) {
                        parkingData.forEach(spot => {
                            const parkingDataElement = Object.assign(document.createElement('div'),
                                {className: 'spot'});
                            parkingDataElement.innerHTML = `Spot ${spot.spot} - ${spot.date} - ${spot.info}`;
                            parkingDataDiv.appendChild(parkingDataElement);
                        });
                        parkingItemsContainer.appendChild(parkingDataDiv);
                    } else if (typeof parkingData === "object") {
                        const parkingDataElement = Object.assign(document.createElement('div'),
                            {className: "spot"});
                        parkingDataElement.innerHTML = `Spot ${parkingData.spot} - ${parkingData.date} - ${parkingData.info}`;
                        parkingDataDiv.appendChild(parkingDataElement);
                        parkingItemsContainer.appendChild(parkingDataDiv);
                    }
                } else if (data.hasOwnProperty('first_info')) {
                    const userParkingSpots = data.first_info;
                    const userParkingSpotDiv = Object.assign(document.createElement('div'),
                        {className: 'item'});

                    const userParkingSpotElement = Object.assign(document.createElement('div'),
                    {className: 'info'});
                    userParkingSpotElement.innerHTML = userParkingSpots;
                    userParkingSpotDiv.appendChild(userParkingSpotElement);
                    parkingItemsContainer.appendChild(userParkingSpotDiv);
                }

                if (data.hasOwnProperty('free_parking_spots')) {
                    const parkingData = data.free_parking_spots;
                    const parkingDataDiv = Object.assign(document.createElement('div'),
                        {className: 'item'});

                    if (Array.isArray(parkingData) && parkingData.length > 1) {
                        parkingData.forEach(spot => {
                            const parkingDataElement = Object.assign(document.createElement('div'),
                                {className: 'spot'});
                            parkingDataElement.innerHTML = `Spot ${spot.spot} - ${spot.date} - ${spot.info}`;
                            parkingDataDiv.appendChild(parkingDataElement);
                        });
                        parkingItemsContainer.appendChild(parkingDataDiv);
                    } else if (typeof parkingData === "object" && Object.keys(parkingData).length > 1) {
                        const parkingDataElement = Object.assign(document.createElement('div'),
                            {className: "spot"});
                        parkingDataElement.innerHTML = `Spot ${parkingData.spot} - ${parkingData.date} - ${parkingData.info}`;
                        parkingDataDiv.appendChild(parkingDataElement);
                        parkingItemsContainer.appendChild(parkingDataDiv);
                    }
                } else if (data.hasOwnProperty('second_info')) {
                    const userParkingSpots = data.second_info;
                    const userParkingSpotDiv = Object.assign(document.createElement('div'),
                        {className: 'item'});

                    const userParkingSpotElement = Object.assign(document.createElement('div'),
                    {className: 'info'});
                    userParkingSpotElement.innerHTML = userParkingSpots;
                    userParkingSpotDiv.appendChild(userParkingSpotElement);
                    parkingItemsContainer.appendChild(userParkingSpotDiv);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }
    showParkingData()
});
