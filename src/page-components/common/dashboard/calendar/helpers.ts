import { range } from "ramda";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export function getYearDropdownOptions(currentYear: any) {
  let minYear = currentYear - 4;
  let maxYear = currentYear + 5;
  return range(minYear, maxYear + 1).map((y) => ({ label: `${y}`, value: y }));
}

export function getMonthDropdownOptions() {
  return range(1, 13).map((m) => ({
    value: m,
    label: dayjs()
      .month(m - 1)
      .format("MMMM")
  }));
}

export function getNumberOfDaysInMonth(year:any, month:any) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}

export function createDaysForCurrentMonth(year:any, month:any) {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
    return {
      dateString: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true
    };
  });
}

export function createDaysForPreviousMonth(year: any, month: any, currentMonthDays: any) {
	const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString);
	const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
	const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;
  const previousMonthLastMondayDayOfMonth = dayjs(
    currentMonthDays[0].dateString
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();
  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
    return {
      dateString: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
      isPreviousMonth: true
    };
  });
}

export function createDaysForNextMonth(year:any, month:any, currentMonthDays:any) {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
	);
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      dateString: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
      isNextMonth: true
    };
  });
}

// sunday === 0, saturday === 6
export function getWeekday(dateString:any) {
  return dayjs(dateString).weekday();
}

export function isWeekendDay(dateString:any) {
  return [6, 0].includes(getWeekday(dateString));
}


export const today = new Date().toISOString().slice(0, 10).split('-').map(e => Number(e))
export const [yearNow, monthNow, dayNow]: any = today
export const daysOfCurrentMonths = new Date(yearNow, monthNow, 0).getDate()
export const isToday = (year: any, month:any, day:any) => {
	return day === dayNow && month === monthNow && year === yearNow
}