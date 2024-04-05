document.addEventListener('DOMContentLoaded', function() {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const daysContainer = document.querySelector('.calendar .days');
    const parkingBookingContainer = document.getElementById('eventParkingBooking');
    const eventsContainer = document.getElementById('eventsContainer');


    let currentDate = new Date();

    const holidays = [
        { date: "01-01", name: "New Year" },
        { date: "01-06", name: "Epiphany" },
        { date: "11-11", name: "National Independence Day" },
        { date: "12-24", name: "Christmas Eve" },
        { date: "12-25", name: "1st Christmas Day" },
        { date: "12-26", name: "2nd Christmas Day" },
        { date: "12-31", name: "New Year's Eve" },
    ];

    const relaxedHolidays = [
        { date: "02-14", name: "Valentine's Day" },
        { date: "02-16", name: "Fat Thursday" },
        { date: "03-08", name: "Women's Day" },
        { date: "05-01", name: "Working Day" },
        { date: "05-26", name: "Mother's Day" },
        { date: "06-01", name: "Children's Day" },
        { date: "06-23", name: "Father's Day" },
        { date: "12-06", name: "Saint Nicholas' Day" },
    ];

    function addHolidaysToCalendar(year) {
        holidays.forEach(holiday => {
            const [month, day] = holiday.date.split('-');
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
            const [month, day] = holiday.date.split('-');
            const holidayDate = new Date(year, month - 1, day);
            const holidayDateString = holidayDate.toISOString().split('T')[0];
            const holidayDiv = daysContainer.querySelector(`.day[data-date="${holidayDateString}"]`);
            if (holidayDiv) {
                holidayDiv.classList.add('relaxed');
            }
        });
    }

    function getHolidayName(date) {
        const formattedDate = date.toISOString().split('T')[0].substring(5); // Formatted as MM-DD
        const allHolidays = holidays.concat(relaxedHolidays);
        const holiday = allHolidays.find(holiday => holiday.date === formattedDate);
        return holiday ? holiday.name : null;
    }

    function addHolidayInfo(date, eventsContainer) {
        const holidayName = getHolidayName(date);
        if (holidayName) {
            const holidayLabelDiv = document.createElement('div');
            holidayLabelDiv.classList.add("label");
            holidayLabelDiv.textContent = `Holiday`;
            eventsContainer.appendChild(holidayLabelDiv);

            const holidayInfoDiv = document.createElement('div');
            holidayInfoDiv.classList.add("info");
            holidayInfoH2 = document.createElement("h2");
            holidayInfoH2.textContent = holidayName;
            holidayInfoDiv.appendChild(holidayInfoH2);
            eventsContainer.appendChild(holidayInfoDiv);
        }
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

    function showDateEvent(date, eventsContainer) {
        const dateDiv = Object.assign(document.createElement('div'), {className: 'date'});
        const dateText = document.createElement('h2');
        dateText.textContent = date;
        dateDiv.appendChild(dateText);
        eventsContainer.appendChild(dateDiv);
    }

    function showEvents(date) {
        eventsContainer.innerHTML = '';

        showDateEvent(date, eventsContainer);
        addHolidayInfo(new Date(date), eventsContainer);
        showParkingBookings(date, eventsContainer);
    }

    function showParkingBookings(date, eventsContainer) {
        const url = parkingBookingContainer.getAttribute('data-url') + '?date=' + date;
        fetch(url)
            .then(response => response.json())
            .then(data => {
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

            clickedDay.classList.add('selected');
            let date = new Date(clickedDay.getAttribute('data-date'));
            date.setDate(date.getDate() + 1);
            const formattedDate = date.toISOString().split('T')[0];
            showEvents(formattedDate);
        }
    });

    renderCalendar();

    const todayDate = currentDate.toISOString().split('T')[0];
    showEvents(todayDate);
});
