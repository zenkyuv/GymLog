import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import Footer from "../footer";
import Header from "../header";
import WorkoutPanel from "./workout-panel/add-workout";
import "../../../component-styles/dashboard.css";
import { useEffect, useReducer, useRef, useState } from "react";
const Dashboard = observer(() => {
    const today = new Date().toISOString().slice(0, 10).split('-').map(e => Number(e));
    console.log(today);
    const [year, month, day] = today;
    const daysOfCurrentMonths = new Date(year, month, 0).getDate();
    console.log(daysOfCurrentMonths);
    console.log(year, month, day);
    const [yearAndMonth, setYearAndMonth] = useState([year, month, day]);
    console.log(yearAndMonth);
    let component = undefined;
    const savedComponent = useRef('');
    const [showComponent, setComponent] = useReducer(reducer, component);
    console.log(component);
    function reducer(state, action) {
        switch (action) {
            case 'addWorkout':
                console.log(action);
                savedComponent.current = "addWorkout";
                return component = _jsx(WorkoutPanel, { component: "workoutPanel", yearAndMonth: yearAndMonth, onYearAndMonthChange: setYearAndMonth }, void 0);
            // 	return component = <Calendar
            // 	today={today}
            //   yearAndMonth={yearAndMonth}
            //   onYearAndMonthChange={setYearAndMonth}
            //   renderDay={(calendarDayObject) => (
            //     <div>
            //       <CalendarDayHeader calendarDayObject={calendarDayObject} />
            //     </div>
            //   )}
            // />
        }
    }
    useEffect(() => {
        setComponent(savedComponent.current);
    }, [yearAndMonth]);
    return (_jsxs("div", Object.assign({ className: "container" }, { children: [_jsx(Header, {}, void 0), _jsxs("div", Object.assign({ className: "cnt-row" }, { children: [_jsxs("div", Object.assign({ className: "nav-bar" }, { children: [_jsx("div", Object.assign({ className: "user-avatar" }, { children: "PG" }), void 0), _jsxs("ul", { children: [_jsx("li", Object.assign({ onClick: () => setComponent('addWorkout') }, { children: "Add workout" }), void 0), _jsx("li", { children: "History" }, void 0), _jsx("li", { children: "Statistics" }, void 0), _jsx("li", { children: "cos" }, void 0)] }, void 0)] }), void 0), showComponent] }), void 0), _jsx(Footer, {}, void 0)] }), void 0));
});
export default Dashboard;
