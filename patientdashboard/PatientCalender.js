// PatientCalendar.js

// Initialize calendar - availableDates can be passed to highlight
function initBookingCalendar(highlightedDates = []) {

    const calendarWrapper = document.getElementById("booking-calendar");
    if (!calendarWrapper) return;

    // Build calendar HTML
    calendarWrapper.innerHTML = `
        <p class="calendar-header" id="calendar-current-month"></p>
        <ul class="calendar-weekdays">
            <li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li>
            <li>Fri</li><li>Sat</li><li>Sun</li>
        </ul>
        <ul class="calendar-days" id="calendar-days"></ul>
        <div class="calendar-nav">
            <button class="calendar-nav-btn" id="calendar-prev">&lt;</button>
            <button class="calendar-nav-btn" id="calendar-next">&gt;</button>
        </div>
    `;

    const calendarHeader=calendarWrapper.querySelector("#calendar-current-month");
    const daysContainer=calendarWrapper.querySelector("#calendar-days");
    const navButtons=calendarWrapper.querySelectorAll(".calendar-nav-btn");

    const monthNames = [
        "January","February","March","April","May","June","July",
        "August","September","October","November","December"
    ];

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    function renderCalendar() {
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
        const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        const lastWeekDayOfMonth = new Date(currentYear, currentMonth, lastDayOfMonth).getDay();

        let dayHTML = "";

        // Previous month days
        for (let i = firstDayIndex; i > 0; i--) {
            dayHTML += `<li class="calendar-day calendar-day-prev">${lastDayOfPrevMonth - i + 1}</li>`;
        }

        // Current month days
        for (let i = 1; i <= lastDayOfMonth; i++) {
            const fullDate = new Date(currentYear, currentMonth, i).toDateString();
            let dayClass = "calendar-day";
            if (highlightedDates.includes(fullDate)) {
                dayClass += " calendar-day-highlight"; // highlighted for available/period dates
            }
            dayHTML += `<li class="${dayClass}" data-date="${fullDate}">${i}</li>`;
        }
        // Next month days
        for (let i = lastWeekDayOfMonth; i < 6; i++) {
            dayHTML += `<li class="calendar-day calendar-day-next">${i - lastWeekDayOfMonth + 1}</li>`;
        }
        calendarHeader.innerText = `${monthNames[currentMonth]} ${currentYear}`;
        daysContainer.innerHTML = dayHTML;
    }

    renderCalendar();

    // Navigation buttons
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentMonth = btn.id === "calendar-prev" ? currentMonth - 1 : currentMonth + 1;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            } else if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    });

    // Optional: click on a day to select it (can be extended)
    daysContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("calendar-day") && !e.target.classList.contains("calendar-day-prev") && !e.target.classList.contains("calendar-day-next")) {
            const selectedDate = e.target.getAttribute("data-date");
            console.log("Selected date:", selectedDate);
            // You can now show available times for this date
        }
    });
}
// Auto-init on page load
document.addEventListener("DOMContentLoaded", () => {
    initBookingCalendar(); // Pass available dates array later if needed
});