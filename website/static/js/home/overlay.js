document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const blocks = overlay.querySelectorAll('.block');
    const closeOverlayButtons = document.querySelectorAll('#closeOverlay');
    // Applications
    const createApplication = document.getElementById('createApplication');
    const createApplicationButton = document.getElementById('createApplicationButton');
    const showMyApplications = document.getElementById('showMyApplications');
    const showMyApplicationsButton = document.getElementById('showMyApplicationsButton');
    const showAllApplications = document.getElementById('showAllApplications');
    const showAllApplicationsButton = document.getElementById('showAllApplicationsButton');
    // Parkings
    const


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


    createApplicationButton.addEventListener('click', function() {
        changeBlockDisplay(createApplication);
        addOverlayDisplay();
    });

    showMyApplicationsButton.addEventListener('click', function(event) {
        const linkDiv = document.getElementById('showMyApplicationsUrl');
        const url = linkDiv.getAttribute('data-url');

        fetchDataAndPopulateApplications(url, "myApplications");
        changeBlockDisplay(showMyApplications);
        addOverlayDisplay(event);
    });

    showAllApplicationsButton.addEventListener('click', function(event) {
        const linkDiv = document.getElementById('showAllApplicationsUrl');
        const url = linkDiv.getAttribute('data-url');

        fetchDataAndPopulateApplications(url, "allApplications");
        changeBlockDisplay(showAllApplications);
        addOverlayDisplay(event);
    });

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
