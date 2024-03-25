document.addEventListener('DOMContentLoaded', function() {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const daysContainer = document.querySelector('.calendar .days');

    let currentDate = new Date();

    function renderCalendar() {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let firstDayOfMonth = new Date(year, month, 0).getDay();
        currentMonthDisplay.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        // Clear previous days
        daysContainer.innerHTML = '';

        // Fill in days
        for (let i = 0; i < firstDayOfMonth; i++) {
            let emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty');
            daysContainer.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let day = document.createElement('div');
            day.textContent = i;
            day.classList.add('day');
            if (year === new Date().getFullYear() && month === new Date().getMonth() && i === new Date().getDate()) {
                day.classList.add('today');
            }
            if ([6, 0].includes(new Date(year, month, i).getDay())) {
                day.classList.add('weekend');
            }
            daysContainer.appendChild(day);
        }
    }

    prevMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
