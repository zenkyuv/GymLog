import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../../../component-styles/workout-panel.css";
import { handleMonthNavBackButtonClick, handleMonthNavForwardButtonClick } from "../calendar/calendar-buttons";
function WorkoutPanel({ component, yearAndMonth, onYearAndMonthChange }) {
    const [year, month, day] = yearAndMonth;
    const today = new Date().toISOString().slice(0, 10).split('-').map(e => Number(e));
    const [yearNow, monthNow, dayNow] = today;
    return (_jsxs("div", Object.assign({ className: "workout-cnt" }, { children: [_jsxs("div", Object.assign({ className: "time-cnt" }, { children: [_jsx("button", Object.assign({ onClick: () => handleMonthNavBackButtonClick({ component, yearAndMonth, onYearAndMonthChange }) }, { children: "<" }), void 0), _jsx("h1", Object.assign({ className: "time" }, { children: day === dayNow && month === monthNow && year === yearNow ? "Today" : `${year}-${month}-${day}` }), void 0), _jsx("button", Object.assign({ onClick: () => handleMonthNavForwardButtonClick({ component, yearAndMonth, onYearAndMonthChange }) }, { children: ">" }), void 0)] }), void 0), _jsx("div", Object.assign({ className: "add-button" }, { children: "+" }), void 0)] }), void 0));
}
export default WorkoutPanel;
