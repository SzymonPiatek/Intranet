document.addEventListener('DOMContentLoaded', function() {
    const parkingDataUrl = document.getElementById('parkingData');
    const parkingItemsContainer = document.getElementById('parkingItems');

    function createSpotElement(spot) {
        const parkingDataElement = Object.assign(document.createElement('div'), {className: 'spot'});
        parkingDataElement.innerHTML = `Spot ${spot.spot} - ${spot.date} - ${spot.info}`;
        return parkingDataElement;
    }

    function createInfoElement(info) {
        const infoElement = Object.assign(document.createElement('div'), {className: 'info'});
        infoElement.innerHTML = info;
        return infoElement;
    }

    function createItemElement(content) {
        const itemElement = Object.assign(document.createElement('div'), {className: 'item'});
        itemElement.appendChild(content);
        return itemElement;
    }

    function showParkingData () {
        const url = parkingDataUrl.getAttribute('data-url');
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.user_parking_spots) {
                    const parkingData = Array.isArray(data.user_parking_spots) ? data.user_parking_spots : [data.user_parking_spots];
                    const parkingContainer = Object.assign(document.createElement('div'), {className: 'item'});
                    parkingData.forEach(spot => {
                        parkingContainer.appendChild(createSpotElement(spot));
                    });
                    parkingItemsContainer.appendChild(parkingContainer);
                } else if (data.first_info) {
                    parkingItemsContainer.appendChild(createItemElement(createInfoElement(data.first_info)));
                }

                if (data.free_parking_spots) {
                    const parkingData = Array.isArray(data.free_parking_spots) ? data.free_parking_spots : [data.free_parking_spots];
                    const parkingContainer = Object.assign(document.createElement('div'), {className: 'item'});
                    parkingData.forEach(spot => {
                        parkingContainer.appendChild(createSpotElement(spot));
                    });
                    parkingItemsContainer.appendChild(parkingContainer);
                } else if (data.second_info) {
                    parkingItemsContainer.appendChild(createItemElement(createInfoElement(data.second_info)));
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }
    showParkingData()
});
