document.addEventListener('DOMContentLoaded', function() {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const daysContainer = document.querySelector('.calendar .days');
    const parkingBookingContainer = document.querySelector('.events');

    let currentDate = new Date();

    function renderCalendar() {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let firstDayOfMonth = new Date(year, month, 0).getDay();
        currentMonthDisplay.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        daysContainer.innerHTML = '';

        for (let i = 0; i < firstDayOfMonth; i++) {
            let emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty');
            daysContainer.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let day = document.createElement('div');
            day.textContent = i;
            day.classList.add('day');
            day.setAttribute('data-date', new Date(year, month, i+1).toISOString().split('T')[0]);
            if (year === new Date().getFullYear() && month === new Date().getMonth() && i === new Date().getDate()) {
                day.classList.add('today');
            }
            if ([6, 0].includes(new Date(year, month, i).getDay())) {
                day.classList.add('weekend');
            }
            if (new Date(year, month, i+1) < new Date()) {
                day.classList.add('past');
            }
            daysContainer.appendChild(day);
        }
    }

    function showParkingBookings(date) {
        parkingBookingContainer.textContent = date;
    }

    prevMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    daysContainer.addEventListener('click', function(event) {
        const clickedDay = event.target.closest('.day');
        if (clickedDay && !clickedDay.classList.contains('empty')) {
            const date = clickedDay.getAttribute('data-date');
            showParkingBookings(date);
        }
    });

    renderCalendar();
});
