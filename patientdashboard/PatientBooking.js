/*When the user clicks on book appointment button on patient appointment.html */

document.addEventListener("DOMContentLoaded", function () {

    const bookButton = document.getElementById("bookbtn");

    bookButton.addEventListener("click", function () {
        window.location.href = "PatientAppointment.html";
    });

});

//calendar, booking summary table
document.addEventListener('DOMContentLoaded', function() {
    // Booking summary elements
    const specialistSum=document.querySelector('.sum-options .sum-option:nth-child(1) .value');
    const dateSum=document.querySelector('.sum-options .sum-option:nth-child(2) .value');
    const timeSum =document.querySelector('.sum-options .sum-option:nth-child(3) .value');
    const appointmentTypeSum =document.querySelector('.sum-options .sum-option:nth-child(4) .value');

    // Select inputs
    const specialistSelect =document.getElementById('specialist-types');
    const appointmentSelect =document.getElementById('appointment-type'); 
    const timeSec=document.querySelector('.time-section');

    // Available time slots
    const morningTimes =['08:30', '09:15', '09:45', '10:30', '11:00'];
    const afternoonTimes =['14:00', '14:30', '15:00','15:00','15:30', '16:00', '16:30'];
    let selectedDate=null;

    // Update summary when specialist changes
    specialistSelect.addEventListener('change', function() {
        specialistSum.textContent = specialistSelect.value || '-';
    });
    // Update summary when appointment type changes
    appointmentSelect.addEventListener('change', function() {
        appointmentTypeSum.textContent = appointmentSelect.value || '-';
    });

   // Initialize FullCalendar
    const calendarEl = document.getElementById('booking-calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: { left: 'prev', center: 'title', right: 'next' },
        selectable: false,
        validRange: { start: new Date() }, // disable past dates
        dateClick: function(info) {
            // Deselect if same date clicked
            if (selectedDate === info.dateStr) {
                selectedDate = null;
                dateSum.textContent = '-';
                timeSum.textContent = '-';
                timeSec.innerHTML = ''; // remove time buttons
                return;
            }

            // Select new date
            selectedDate = info.dateStr;
            dateSum.textContent = selectedDate;

            timeSec.innerHTML = ''; // clearing previous content

            // Create headings (Morning & Afternoon headings for time)
            const morningHeading =document.createElement('p');
            morningHeading.textContent ='Morning Times:';
            morningHeading.classList.add('subtitle');
            timeSec.appendChild(morningHeading);

            const morningContainer =document.createElement('div');
            morningContainer.classList.add('time-group');
            timeSec.appendChild(morningContainer);

            const afternoonHeading =document.createElement('p');
            afternoonHeading.textContent ='Afternoon Times:';
            afternoonHeading.classList.add('subtitle');
            timeSec.appendChild(afternoonHeading);

            const afternoonContainer=document.createElement('div');
            afternoonContainer.classList.add('time-group');
            timeSec.appendChild(afternoonContainer);

            // Helper function to create buttons
            function createTimeButton(time, container) {
                const btn =document.createElement('button');  //creaing the elements
                btn.classList.add('time-btn');  //adding class
                btn.textContent =time;

                btn.onclick = function() {
                    timeSum.textContent=time;
                    // Highlight selected time
                    timeSec.querySelectorAll('button').forEach(b =>b.classList.remove('selected'));
                    btn.classList.add('selected');
                };

                container.appendChild(btn);
            }

            // Addiding the morning buttons
            morningTimes.forEach(time => createTimeButton(time, morningContainer));

            // Adding the afternoon buttons
            afternoonTimes.forEach(time => createTimeButton(time, afternoonContainer));
        }
            });
        calendar.render(); //rendering calender

        //popup section after clicking confirm button
        const confirmBtn = document.getElementById('confirmbtn');
        const popup = document.getElementById('booking-popup');

        confirmBtn.addEventListener('click', function() {
            //fetcing values from booking summary
            const specialist=document.querySelector('.sum-options .sum-option:nth-child(1) .value').textContent;
            const date =document.querySelector('.sum-options .sum-option:nth-child(2) .value').textContent;
            const time=document.querySelector('.sum-options .sum-option:nth-child(3) .value').textContent;

            if(specialist === '-'|| date === '-'||time === '-') {
                alert('Please select a specialist, date, and time before confirming.');
                return;
            }

            popup.querySelector('p').textContent = ` Appointment booked for ${date} at ${time}`;
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
                window.location.href = 'ViewAppointments.html';
            }, 2000);
});
});