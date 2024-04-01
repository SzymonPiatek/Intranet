document.addEventListener('DOMContentLoaded', function() {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const daysContainer = document.querySelector('.calendar .days');
    const parkingBookingContainer = document.getElementById('eventParkingBooking');

    let currentDate = new Date();

    const holidays = [
        "01-01", // New Year
        "01-06", // Epiphany
        "11-11", // National Independence Day
        "12-24", // Christmas Eve
        "12-25", // 1st Christmas Day
        "12-26", // 2st Christmas Day
        "12-31", // New Year's Eye
    ]

    const relaxedHolidays = [
        "02-14", // Valentine's Day
        "02-16", // Fat Thursday
        "03-08", // Women's Day
        "05-01", // Working Day
        "05-26", // Mother's Day
        "06-01", // Children's Day
        "06-23", // Father's Day
        "12-06", // Saint Nicholas' Day
    ]

    function addHolidaysToCalendar(year) {
        holidays.forEach(holiday => {
            const [month, day] = holiday.split('-');
            const holidayDate = new Date(year, month - 1, day);
            const holidayDateString = holidayDate.toISOString().split('T')[0];
            const holidayDiv = daysContainer.querySelector(`.day[data-date="${holidayDateString}"]`);
            if (holidayDiv) {
                holidayDiv.classList.add('holiday');
            }
        });
    }

    function addRelaxedHolidaysToCalendar(year) {
        relaxedHolidays.forEach(holiday => {
            const [month, day] = holiday.split('-');
            const holidayDate = new Date(year, month - 1, day);
            const holidayDateString = holidayDate.toISOString().split('T')[0];
            const holidayDiv = daysContainer.querySelector(`.day[data-date="${holidayDateString}"]`);
            if (holidayDiv) {
                holidayDiv.classList.add('relaxed');
            }
        });
    }

    function renderCalendar() {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let firstDayOfMonth = new Date(year, month, 0).getDay();
        currentMonthDisplay.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        daysContainer.innerHTML = '';

        for (let i = 0; i < firstDayOfMonth; i++) {
            let emptyDay = Object.assign(document.createElement('div'), {className: 'day empty'});
            daysContainer.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let day = Object.assign(document.createElement('div'), {className: 'day'});
            day.textContent = i;
            day.setAttribute('data-date', new Date(year, month, i).toISOString().split('T')[0]);
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
        addHolidaysToCalendar(year);
        addRelaxedHolidaysToCalendar(year);
    }

    function showParkingBookings(date) {
        const url = parkingBookingContainer.getAttribute('data-url') + '?date=' + date;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const eventsContainer = document.getElementById('eventsContainer');
                eventsContainer.innerHTML = '';
                const dateDiv = Object.assign(document.createElement('div'), {className: 'date'});
                const dateText = document.createElement('h2');
                dateText.textContent = date;
                dateDiv.appendChild(dateText);
                eventsContainer.appendChild(dateDiv);

                const labelDiv = Object.assign(document.createElement('div'), {className: 'label'});
                labelDiv.innerHTML = "Parking";
                eventsContainer.appendChild(labelDiv);

                if (data.hasOwnProperty('parking_booking')) {
                    const booking = data.parking_booking;
                    const bookingDiv = Object.assign(document.createElement('div'), {className: 'spot'});
                    bookingDiv.innerHTML = `<i class="fa-solid fa-car"></i>Spot ${booking.spot} - ${booking.type}`;
                    eventsContainer.appendChild(bookingDiv);
                } else if (data.hasOwnProperty('info')) {
                    const info = data.info;
                    const infoDiv = Object.assign(document.createElement('div'), {className: 'info'});
                    const infoElement = document.createElement('h2');
                    infoElement.innerHTML = (info);
                    infoDiv.appendChild(infoElement);
                    eventsContainer.appendChild(infoDiv);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
            const allDays = daysContainer.querySelectorAll('.day');
            allDays.forEach(day => day.classList.remove('selected'));

            clickedDay.classList.add('selected')
            let date = new Date(clickedDay.getAttribute('data-date'));
            date.setDate(date.getDate() + 1);
            const formattedDate = date.toISOString().split('T')[0];
            showParkingBookings(formattedDate);
    }
    });

    renderCalendar();

    const todayDate = currentDate.toISOString().split('T')[0];
    showParkingBookings(todayDate);
});
