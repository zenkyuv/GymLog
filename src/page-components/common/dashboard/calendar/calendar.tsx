import "../../../../component-styles/calendar.css"

import PropTypes from "prop-types";
import classNames from "classnames";
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  getMonthDropdownOptions,
  getYearDropdownOptions
} from "./helpers";

import {handleMonthNavBackButtonClick, handleMonthNavForwardButtonClick} from "./calendar-buttons"

Calendar.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func
};
export default function Calendar({
	today,
	className = "",
	yearAndMonth,
	onYearAndMonthChange,
	renderDay = () => null
}: {
		today: any,
		className: any,
		yearAndMonth: any,
		onYearAndMonthChange:any,
		renderDay:any
}) {
	const [year, month] = yearAndMonth;
	console.log(year, month)
	console.log(today)
	const [yearNow, monthNow, dayNow]: any = today
	console.log(today)
  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
	);

  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
	];

  const handleMonthSelect = (evt:any) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleYearSelect = (evt:any) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
	};

	const component = "calendar"

  return (
    <div className="calendar-root">
      <div className="navigation-header">
        <div className="month-nav-arrow-buttons">
          <button onClick={() => handleMonthNavBackButtonClick({component,yearAndMonth, onYearAndMonthChange})}> prev </button>
          <button onClick={() => handleMonthNavForwardButtonClick({component, yearAndMonth, onYearAndMonthChange})}>next</button>
        </div>
        <select
          className="month-select"
          value={month}
          onChange={handleMonthSelect}
        >
          {getMonthDropdownOptions().map(({ label, value }:any) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          className="year-select"
          value={year}
          onChange={handleYearSelect}
        >
          {getYearDropdownOptions(year).map(({ label, value }:any) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="days-of-week">
				{daysOfWeek.map((day: any, index: any) => (
          <div
            key={day}
            className={classNames("day-of-week-header-cell", {
              "weekend-day": [6, 0].includes(index)
            })}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
				{calendarGridDayObjects.map((day) => (
          <div
            key={day.dateString}
            className={classNames("day-grid-item-container", {
              "weekend-day": isWeekendDay(day.dateString),
							"current-month": day.isCurrentMonth,
							"not-current-month": !day.isCurrentMonth
							
						})}
          >
						<div className="day-content-wrapper">{day.dayOfMonth === dayNow && year === yearNow && month === monthNow && day.isCurrentMonth ? <span className="today">{renderDay(day)}</span> : renderDay(day)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired
};
export function CalendarDayHeader({ calendarDayObject }: any) {
  return (
    <div className="day-grid-item-header">{calendarDayObject.dayOfMonth}</div>
  );
}

