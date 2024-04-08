document.addEventListener('DOMContentLoaded', function() {
    const dropBox = document.getElementById('dropBox');
    const fileInput = document.getElementById('file');

    dropBox.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const file = fileInput.files[0];

    if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, DOC, and DOCX files are allowed.');
        fileInput.value = '';
        return false;
    }

    const fileName = file.name;
    const dropBox = document.getElementById('dropBox');
    dropBox.querySelector('.file_name').textContent = fileName;
    });
});
