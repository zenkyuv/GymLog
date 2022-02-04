import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../../component-styles/calendar.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import { daysOfWeek, createDaysForCurrentMonth, createDaysForNextMonth, createDaysForPreviousMonth, isWeekendDay, getMonthDropdownOptions, getYearDropdownOptions } from "./helpers";
Calendar.propTypes = {
    className: PropTypes.string,
    yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired,
    onYearAndMonthChange: PropTypes.func.isRequired,
    renderDay: PropTypes.func
};
export default function Calendar({ className = "", yearAndMonth = [2021, 6], onYearAndMonthChange, renderDay = () => null }) {
    const [year, month] = yearAndMonth;
    let currentMonthDays = createDaysForCurrentMonth(year, month);
    let previousMonthDays = createDaysForPreviousMonth(year, month, currentMonthDays);
    let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
    let calendarGridDayObjects = [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays
    ];
    const handleMonthNavBackButtonClick = () => {
        let nextYear = year;
        let nextMonth = month - 1;
        if (nextMonth === 0) {
            nextMonth = 12;
            nextYear = year - 1;
        }
        onYearAndMonthChange([nextYear, nextMonth]);
    };
    const handleMonthNavForwardButtonClick = () => {
        let nextYear = year;
        let nextMonth = month + 1;
        console.log(nextYear);
        if (nextMonth === 13) {
            nextMonth = 1;
            nextYear = year + 1;
        }
        onYearAndMonthChange([nextYear, nextMonth]);
    };
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
    return (_jsxs("div", Object.assign({ className: "calendar-root" }, { children: [_jsxs("div", Object.assign({ className: "navigation-header" }, { children: [_jsxs("div", Object.assign({ className: "month-nav-arrow-buttons" }, { children: [_jsx("button", Object.assign({ onClick: handleMonthNavBackButtonClick }, { children: " prev " }), void 0), _jsx("button", Object.assign({ onClick: handleMonthNavForwardButtonClick }, { children: "next" }), void 0)] }), void 0), _jsx("select", Object.assign({ className: "month-select", value: month, onChange: handleMonthSelect }, { children: getMonthDropdownOptions().map(({ label, value }) => (_jsx("option", Object.assign({ value: value }, { children: label }), value))) }), void 0), _jsx("select", Object.assign({ className: "year-select", value: year, onChange: handleYearSelect }, { children: getYearDropdownOptions(year).map(({ label, value }) => (_jsx("option", Object.assign({ value: value }, { children: label }), value))) }), void 0)] }), void 0), _jsx("div", Object.assign({ className: "days-of-week" }, { children: daysOfWeek.map((day, index) => (_jsx("div", Object.assign({ className: classNames("day-of-week-header-cell", {
                        "weekend-day": [6, 0].includes(index)
                    }) }, { children: day }), day))) }), void 0), _jsx("div", Object.assign({ className: "days-grid" }, { children: calendarGridDayObjects.map((day) => (_jsx("div", Object.assign({ className: classNames("day-grid-item-container", {
                        "weekend-day": isWeekendDay(day.dateString),
                        "current-month": day.isCurrentMonth
                    }) }, { children: _jsx("div", Object.assign({ className: "day-content-wrapper" }, { children: renderDay(day) }), void 0) }), day.dateString))) }), void 0)] }), void 0));
}
CalendarDayHeader.propTypes = {
    calendarDayObject: PropTypes.object.isRequired
};
export function CalendarDayHeader({ calendarDayObject }) {
    return (_jsx("div", Object.assign({ className: "day-grid-item-header" }, { children: calendarDayObject.dayOfMonth }), void 0));
}
