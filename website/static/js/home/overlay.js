document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const blocks = overlay.querySelectorAll('.block');
    const closeOverlayButtons = document.querySelectorAll('#closeOverlay');
    // Applications
    const createApplicationBlock = document.getElementById('createApplicationBlock');
    const createApplicationButton = document.getElementById('createApplicationButton');
    const showMyApplicationsBlock = document.getElementById('showMyApplicationsBlock');
    const showMyApplicationsButton = document.getElementById('showMyApplicationsButton');
    const showAllApplicationsBlock = document.getElementById('showAllApplicationsBlock');
    const showAllApplicationsButton = document.getElementById('showAllApplicationsButton');
    // Parkings
    const showAllParkingSpotsBlock = document.getElementById('showAllParkingSpotsBlock');
    const showAllParkingSpotsButton = document.getElementById('showAllParkingSpotsButton');
    const shareMyParkingSpotBlock = document.getElementById('shareMyParkingSpotBlock');
    const shareMyParkingSpotButton = document.getElementById('shareMyParkingSpotButton');


    function changeBlockDisplay(block) {
        if (block.style.display === 'none') {
            block.style.display = 'flex';
        } else {
            block.style.display = 'none';
        }
    }

    function removeOverlayDisplay() {
        if (overlay.classList.contains('show')) {
            overlay.classList.remove('show');
            blocks.forEach(blockDiv => {
                blockDiv.style.display = 'none';
            });
        }
        event.stopPropagation();
    }

    function addOverlayDisplay() {
        if (!overlay.classList.contains('show')) {
            overlay.classList.add('show');
        }
        event.stopPropagation();
    }

    // Applications
    createApplicationButton.addEventListener('click', function() {
        changeBlockDisplay(createApplicationBlock);
        addOverlayDisplay();
    });

    showMyApplicationsButton.addEventListener('click', function(event) {
        const linkDiv = document.getElementById('showMyApplicationsUrl');
        const url = linkDiv.getAttribute('data-url');

        fetchDataAndPopulateApplications(url, "myApplications");
        changeBlockDisplay(showMyApplicationsBlock);
        addOverlayDisplay(event);
    });

    showAllApplicationsButton.addEventListener('click', function(event) {
        const linkDiv = document.getElementById('showAllApplicationsUrl');
        const url = linkDiv.getAttribute('data-url');

        fetchDataAndPopulateApplications(url, "allApplications");
        changeBlockDisplay(showAllApplicationsBlock);
        addOverlayDisplay(event);
    });

    // Parkings
    showAllParkingSpotsButton.addEventListener('click', function(event) {
        const linkDiv = document.getElementById('showAllParkingSpotsUrl');
        const url = linkDiv.getAttribute('data-url');

        fetchDataAndPopulateParkingSpots(url, "allParkingSpots");
        changeBlockDisplay(showAllParkingSpotsBlock);
        addOverlayDisplay(event);
    });

    shareMyParkingSpotButton.addEventListener('click', function(event) {
        changeBlockDisplay(shareMyParkingSpotBlock);
        addOverlayDisplay(event);
    });

    // Other

    closeOverlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            removeOverlayDisplay();
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (overlay.style.display !== 'none') {
                removeOverlayDisplay();
            }
        }
    });
});
