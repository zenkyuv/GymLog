export function handleMonthNavBackButtonClick({ component, yearAndMonth, onYearAndMonthChange }) {
    const [year, month] = yearAndMonth;
    console.log(year, month);
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
        nextMonth = 12;
        nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth, 3]);
}
;
export function handleMonthNavForwardButtonClick({ component, yearAndMonth, onYearAndMonthChange }) {
    const today = new Date().toISOString().slice(0, 10).split('-').map(e => Number(e));
    console.log(today);
    console.log(yearAndMonth);
    console.log(component);
    const [year, month, day] = yearAndMonth;
    const daysOfCurrentMonths = new Date(year, month, 0).getDate();
    console.log(day);
    console.log(daysOfCurrentMonths);
    let nextYear = year;
    let nextMonth = month;
    let nextDay = day + 1;
    if (component === "workoutPanel") {
        if (nextDay > daysOfCurrentMonths) {
            nextDay = 1;
            nextMonth += 1;
        }
    }
    else if (component === 'calendar') {
        nextMonth += 1;
    }
    if (nextMonth === 13) {
        nextMonth = 1;
        nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth, nextDay]);
}
;
