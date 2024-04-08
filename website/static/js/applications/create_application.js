document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const createApplicationButton = document.getElementById('createApplicationButton');
    const closeOverlayButton = document.getElementById('closeOverlay');

    function removeOverlayDisplay() {
        if (overlay.classList.contains('show')) {
            overlay.classList.remove('show');
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
        addOverlayDisplay()
    });

    closeOverlayButton.addEventListener('click', function() {
        removeOverlayDisplay()
    })

     document.addEventListener('click', function(event) {
        if (!event.target.closest('#createApplication')) {
            removeOverlayDisplay()
        }
    });
});
