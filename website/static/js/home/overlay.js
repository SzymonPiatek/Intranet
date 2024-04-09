document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const blocks = overlay.querySelectorAll('.block');
    const closeOverlayButtons = document.querySelectorAll('#closeOverlay');
    const createApplication = document.getElementById('createApplication');
    const createApplicationButton = document.getElementById('createApplicationButton');
    const showMyApplications = document.getElementById('showMyApplications');
    const showMyApplicationsButton = document.getElementById('showMyApplicationsButton');


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
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const applicationsDiv = document.getElementById('myApplications');
                applicationsDiv.innerHTML = '';

                data.forEach(application => {
                    const applicationDiv = Object.assign(document.createElement('div'),
                        {className: "application",
                            innerHTML:`
                                      <div class="top">
                                          <h2 class="title">${application.name}</h2>
                                          <h2 class="id">ID: ${application.id}</h2>
                                      </div>
                                      <div class="info">
                                          <h4>Created by ${application.user}</h4>
                                          <h4>Status: ${application.status}</h4> 
                                      </div>
                                      `});
                    applicationsDiv.appendChild(applicationDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });

        changeBlockDisplay(showMyApplications);
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
