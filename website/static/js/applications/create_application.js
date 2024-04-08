document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const createApplicationButton = document.getElementById('createApplicationButton');

    createApplicationButton.addEventListener('click', function() {
        if (overlay.style.display !== 'flex') {
            overlay.style.display = 'flex';
            event.stopPropagation();
        }
    });

     document.addEventListener('click', function(event) {
        if (!event.target.closest('#createApplication') && overlay.style.display !== 'none') {
            overlay.style.display = 'none';
        }
    });
});
