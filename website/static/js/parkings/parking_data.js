document.addEventListener('DOMContentLoaded', function() {
    const parkingDataUrl = document.getElementById('parkingData');
    const parkingItemsContainer = document.getElementById('parkingItems');

    function showParkingData () {
        const url = parkingDataUrl.getAttribute('data-url');
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.hasOwnProperty('user_parking_spot')) {
                    const userParkingSpot = data.user_parking_spot.spot;
                    const userParkingSpotDiv = Object.assign(document.createElement('div'),
                        {className: 'item', id: 'shareParking'});
                    const userParkingSpotElement = Object.assign(document.createElement('div'),
                        {className: 'spot'});

                    userParkingSpotElement.innerHTML = `${userParkingSpot} - Share this parking spot`;
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
