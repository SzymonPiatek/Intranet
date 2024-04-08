document.addEventListener('DOMContentLoaded', function() {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const daysContainer = document.querySelector('.calendar .days');
    const parkingBookingContainer = document.getElementById('eventParkingBooking');
    const eventsContainer = document.getElementById('eventsContainer');

    let currentDate = new Date();


    const holidays = [
        { date: "01-01", name: "New Year", value: "important" },
        { date: "01-06", name: "Epiphany", value: "important" },
        { date: "02-14", name: "Valentine's Day", value: "not-important" },
        { date: "02-16", name: "Fat Thursday", value: "not-important" },
        { date: "03-08", name: "Women's Day", value: "not-important" },
        { date: "05-01", name: "Working Day", value: "not-important" },
        { date: "05-26", name: "Mother's Day", value: "not-important" },
        { date: "06-01", name: "Children's Day", value: "not-important" },
        { date: "06-23", name: "Father's Day", value: "not-important" },
        { date: "11-11", name: "National Independence Day", value: "important" },
        { date: "12-06", name: "Saint Nicholas' Day", value: "not-important" },
        { date: "12-24", name: "Christmas Eve", value: "important" },
        { date: "12-25", name: "1st Christmas Day", value: "important" },
        { date: "12-26", name: "2nd Christmas Day", value: "important" },
        { date: "12-31", name: "New Year's Eve", value: "important" },
    ];

    function addHolidaysToCalendar(year) {
        holidays.forEach(holiday => {
            const [month, day] = holiday.date.split('-');
            const holidayDate = new Date(year, month - 1, day);
            const holidayDateString = holidayDate.toISOString().split('T')[0];
            const holidayDiv = daysContainer.querySelector(`.day[data-date="${holidayDateString}"]`);

            if (holidayDiv) {
                if (holiday.value === 'important') {
                    holidayDiv.classList.add('holiday');
                } else if (holiday.value === 'not-important') {
                    holidayDiv.classList.add('relaxed');
                }
            }
        });
    }

    function getHolidayName(date) {
        const formattedDate = date.toISOString().split('T')[0].substring(5);
        const holiday = holidays.find(holiday => holiday.date === formattedDate);
        return holiday ? holiday.name : null;
    }

    function addHolidayInfo(date, eventsContainer) {
        const holidayName = getHolidayName(date);
        if (holidayName) {
            const holidayLabelDiv = Object.assign(document.createElement('div'),
                {className: "label", textContent: "Holiday"});
            eventsContainer.appendChild(holidayLabelDiv);

            const holidayInfoDiv = Object.assign(document.createElement('div'),
                {className: "info"});
            const holidayInfoH2 = Object.assign(document.createElement('h2'),
                {textContent: holidayName});
            holidayInfoDiv.appendChild(holidayInfoH2);
            eventsContainer.appendChild(holidayInfoDiv);
        }
    }

    function renderCalendar() {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let firstDayOfMonth = new Date(year, month, 0).getDay();
        currentMonthDisplay.textContent = new Date(year, month).toLocaleDateString('en-US',
            { month: 'long', year: 'numeric' });

        daysContainer.innerHTML = '';

        for (let i = 0; i < firstDayOfMonth; i++) {
            let emptyDay = Object.assign(document.createElement('div'),
                {className: 'day empty'});
            daysContainer.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let day = Object.assign(document.createElement('div'),
                {className: 'day', textContent: i});
            day.setAttribute('data-date', new Date(year, month, i).toISOString().split('T')[0]);

            if ([6, 0].includes(new Date(year, month, i).getDay())) {
                day.classList.add('weekend');
            }
            if (new Date(year, month, i+1) < new Date()) {
                day.classList.add('past');
            }
            if (year === new Date().getFullYear() && month === new Date().getMonth() && i === new Date().getDate()) {
                day.classList.add('today');
            }
            daysContainer.appendChild(day);
        }
        addHolidaysToCalendar(year);
    }

    function showDateEvent(date, eventsContainer) {
        const dateDiv = Object.assign(document.createElement('div'),
            {className: 'date'});
        const dateText = Object.assign(document.createElement('h2'),
            {textContent: date});
        dateDiv.appendChild(dateText);
        eventsContainer.appendChild(dateDiv);
    }

    function showEvents(date) {
    eventsContainer.innerHTML = '';

    showDateEvent(date, eventsContainer);
    showParkingBookings(date, eventsContainer)
        .then(() => {
            addHolidayInfo(new Date(date), eventsContainer);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

    function showParkingBookings(date, eventsContainer) {
        return new Promise((resolve, reject) => {
            const url = parkingBookingContainer.getAttribute('data-url') + '?date=' + date;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("Parking data fetched");
                    const labelDiv = Object.assign(document.createElement('div'),
                        {className: 'label', textContent: "Parking"});
                    eventsContainer.appendChild(labelDiv);

                    if (data.hasOwnProperty('parking_booking')) {
                        const booking = data.parking_booking;
                        const bookingDiv = Object.assign(document.createElement('div'),
                            {className: 'spot',
                                innerHTML: `<i class="fa-solid fa-car"></i>Spot ${booking.spot} - ${booking.type}`});
                        eventsContainer.appendChild(bookingDiv);
                    } else if (data.hasOwnProperty('info')) {
                        const info = data.info;
                        const infoDiv = Object.assign(document.createElement('div'),
                            {className: 'info'});
                        const infoElement = Object.assign(document.createElement('h2'),
                            {textContent: info});
                        infoDiv.appendChild(infoElement);
                        eventsContainer.appendChild(infoDiv);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
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
