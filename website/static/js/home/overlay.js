document.addEventListener('DOMContentLoaded', function() {
    const blocks = document.querySelectorAll('.overlay .container .content .block');
    const overlay = document.getElementById('overlay');
    const createApplicationButton = document.getElementById('createApplicationButton');
    const closeOverlayButton = document.getElementById('closeOverlay');
    const createApplication = document.getElementById('createApplication');

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

    closeOverlayButton.addEventListener('click', function() {
        removeOverlayDisplay();
    })
});
