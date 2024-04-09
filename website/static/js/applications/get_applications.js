function fetchDataAndPopulateApplications(url, applicationsDivId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const applicationsDiv = document.getElementById(applicationsDivId);
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
}
