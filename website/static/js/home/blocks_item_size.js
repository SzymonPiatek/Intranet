$(document).ready(function() {
    function updateGrid(block, minWidth) {
        let item = block.querySelector('.item');

        if (block.offsetWidth <= minWidth) {

            item.classList.add('grid');
        } else {
            item.classList.remove('grid');
        }
    }

    function handleResize(elementId, minWidth) {
        let block = document.getElementById(elementId);
        console.log("Szerokość początkowa bloku:", block.offsetWidth);

        window.addEventListener('resize', function() {
            updateGrid(block, minWidth);
        });

        updateGrid(block, minWidth);

        return updateGrid;
    }

    handleResize('applicationsBlock', 760);
    handleResize('reportsBlock', 760);
});