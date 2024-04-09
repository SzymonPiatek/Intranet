document.addEventListener('DOMContentLoaded', function() {
    const dropBox = document.getElementById('dropBox');
    const fileInput = document.getElementById('file');

    dropBox.addEventListener('click', function() {
        fileInput.click();
    });

    dropBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropBox.classList.add('dragover');
    });

    dropBox.addEventListener('dragleave', function() {
        dropBox.classList.remove('dragover');
    });

    dropBox.addEventListener('drop', function(e) {
        e.preventDefault();
        dropBox.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        handleFile(file);
    });

    function handleFile(file) {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (!allowedTypes.includes(file.type)) {
            alert('Only PDF, DOC, and DOCX files are allowed.');
            fileInput.value = '';
            return false;
        }

        const fileName = file.name;
        const dropBox = document.getElementById('dropBox');
        dropBox.querySelector('.file_name').textContent = fileName;
    }
});
