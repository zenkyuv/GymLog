import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../../../component-styles/calendar.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import { daysOfWeek, createDaysForCurrentMonth, createDaysForNextMonth, createDaysForPreviousMonth, isWeekendDay, getMonthDropdownOptions, getYearDropdownOptions } from "./helpers";
import { handleMonthNavBackButtonClick, handleMonthNavForwardButtonClick } from "./calendar-buttons";
Calendar.propTypes = {
    className: PropTypes.string,
    yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired,
    onYearAndMonthChange: PropTypes.func.isRequired,
    renderDay: PropTypes.func
};
export default function Calendar({ today, className = "", yearAndMonth, onYearAndMonthChange, renderDay = () => null }) {
    const [year, month] = yearAndMonth;
    console.log(year, month);
    console.log(today);
    const [yearNow, monthNow, dayNow] = today;
    console.log(today);
    let currentMonthDays = createDaysForCurrentMonth(year, month);
    let previousMonthDays = createDaysForPreviousMonth(year, month, currentMonthDays);
    let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
    let calendarGridDayObjects = [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays
    ];
    console.log(calendarGridDayObjects.map((day) => day));
    // const handleMonthNavBackButtonClick = () => {
    //   let nextYear = year;
    //   let nextMonth = month - 1;
    //   if (nextMonth === 0) {
    //     nextMonth = 12;
    //     nextYear = year - 1;
    //   }
    //   onYearAndMonthChange([nextYear, nextMonth]);
    // };
    // const handleMonthNavForwardButtonClick = () => {
    //   let nextYear = year;
    // 	let nextMonth = month + 1;
    // 	console.log(nextYear)
    //   if (nextMonth === 13) {
    //     nextMonth = 1;
    //     nextYear = year + 1;
    //   }
    //   onYearAndMonthChange([nextYear, nextMonth]);
    // };
    const handleMonthSelect = (evt) => {
        let nextYear = year;
        let nextMonth = parseInt(evt.target.value, 10);
        onYearAndMonthChange([nextYear, nextMonth]);
    };
    const handleYearSelect = (evt) => {
        let nextMonth = month;
        let nextYear = parseInt(evt.target.value, 10);
        onYearAndMonthChange([nextYear, nextMonth]);
    };
    const component = "calendar";
    return (_jsxs("div", Object.assign({ className: "calendar-root" }, { children: [_jsxs("div", Object.assign({ className: "navigation-header" }, { children: [_jsxs("div", Object.assign({ className: "month-nav-arrow-buttons" }, { children: [_jsx("button", Object.assign({ onClick: () => handleMonthNavBackButtonClick({ component, yearAndMonth, onYearAndMonthChange }) }, { children: " prev " }), void 0), _jsx("button", Object.assign({ onClick: () => handleMonthNavForwardButtonClick({ component, yearAndMonth, onYearAndMonthChange }) }, { children: "next" }), void 0)] }), void 0), _jsx("select", Object.assign({ className: "month-select", value: month, onChange: handleMonthSelect }, { children: getMonthDropdownOptions().map(({ label, value }) => (_jsx("option", Object.assign({ value: value }, { children: label }), value))) }), void 0), _jsx("select", Object.assign({ className: "year-select", value: year, onChange: handleYearSelect }, { children: getYearDropdownOptions(year).map(({ label, value }) => (_jsx("option", Object.assign({ value: value }, { children: label }), value))) }), void 0)] }), void 0), _jsx("div", Object.assign({ className: "days-of-week" }, { children: daysOfWeek.map((day, index) => (_jsx("div", Object.assign({ className: classNames("day-of-week-header-cell", {
                        "weekend-day": [6, 0].includes(index)
                    }) }, { children: day }), day))) }), void 0), _jsx("div", Object.assign({ className: "days-grid" }, { children: calendarGridDayObjects.map((day) => (_jsx("div", Object.assign({ className: classNames("day-grid-item-container", {
                        "weekend-day": isWeekendDay(day.dateString),
                        "current-month": day.isCurrentMonth,
                        "not-current-month": !day.isCurrentMonth
                    }) }, { children: _jsx("div", Object.assign({ className: "day-content-wrapper" }, { children: day.dayOfMonth === dayNow && year === yearNow && month === monthNow && day.isCurrentMonth ? _jsx("span", Object.assign({ className: "today" }, { children: renderDay(day) }), void 0) : renderDay(day) }), void 0) }), day.dateString))) }), void 0)] }), void 0));
}
CalendarDayHeader.propTypes = {
    calendarDayObject: PropTypes.object.isRequired
};
export function CalendarDayHeader({ calendarDayObject }) {
    // console.log(calendarDayObject.map((day:any) => day))
    return (_jsx("div", Object.assign({ className: "day-grid-item-header" }, { children: calendarDayObject.dayOfMonth }), void 0));
}
