document.addEventListener('DOMContentLoaded', function() {
    function handleResize(elementId, minWidth) {
        var block = document.getElementById(elementId);
        var item = block.querySelector('.item');

        function updateGrid() {
            if (block.offsetWidth < minWidth) {
                item.classList.add('grid');
            } else {
                item.classList.remove('grid');
            }
        }

        window.addEventListener('resize', updateGrid);
        updateGrid();

        return updateGrid;
    }

    var updateApplicationsGrid = handleResize('applicationsBlock', 760);
    var updateReportsGrid = handleResize('reportsBlock', 760);
});
