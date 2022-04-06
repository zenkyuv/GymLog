import { observer } from 'mobx-react-lite';
import Footer from '../footer';
import Header from '../header';
import { today } from './calendar/helpers';
import WorkoutPanel from './workout-panel/add-workout';
import Calendar, { CalendarDayHeader } from './calendar/calendar';
import '../../../component-styles/dashboard.css';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useContext } from 'react';
import { getData } from '../../firestore-database';
import UserStore from '../../states-store/states/user-store';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import TextField from '@mui/material/TextField';

const Dashboard = observer(() => {
  const [yearAndMonth, setYearAndMonth]: any = useState(today);
  console.log(yearAndMonth);
  const savedComponent = useRef('');
  const userStore = useContext(UserStore);
  const [trainingData, setData] = useState(undefined);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [visible, setVisible] = useState({
    addWorkout: false,
    calendar: false,
  });
  var dt = new Date();
  var month = dt.getMonth();
  var year = dt.getFullYear();
  const weekday = dt.toLocaleString('default', { weekday: 'short' });
  const daysInMonth = new Date(year, month, 0).getDate();
  let component = undefined;
  const [showComponent, setComponent]: any = useReducer(reducer, component);
  function reducer(state: any, action: any) {
    if (action === 'addWorkout' && visible.addWorkout) {
      console.log(state, action);
      savedComponent.current = 'addWorkout';
      return (component = (
        <WorkoutPanel
          component={'workoutPanel'}
          yearAndMonth={yearAndMonth}
          onYearAndMonthChange={setYearAndMonth}
        />
      ));
    } else if (action === 'calendar' && visible.calendar) {
      savedComponent.current = 'calendar';
      return (component = (
        <Calendar
          today={today}
          yearAndMonth={yearAndMonth}
          onYearAndMonthChange={setYearAndMonth}
          renderDay={(calendarDayObject) => (
            <div>
              <CalendarDayHeader calendarDayObject={calendarDayObject} />
            </div>
          )}
        />
      ));
      // return (component = (
      //   <LocalizationProvider dateAdapter={DateAdapter}>
      //     <StaticDatePicker
      //       orientation="portrait"
      //       openTo="day"
      //       value={selectedDate}
      //       // shouldDisableDate={isWeekend}
      //       onChange={(newValue: any) => {
      //         handleDateChange(newValue);
      //       }}
      //       renderInput={(params) => (
      //         <TextField sx={{ width: 100 }} {...params} />
      //       )}
      //     />
      //   </LocalizationProvider>
      // ));
    }
  }
  const data = userStore.workoutData;
  useEffect(() => {
    setComponent(savedComponent.current);
  }, [yearAndMonth]);
  useEffect(() => {
    const data = userStore.workoutData;
    getData(userStore, yearAndMonth);
  }, [userStore, yearAndMonth]);
  const css = 'dashboard-nav';
  return (
    <div className="container">
      <Header css={'dashboard-nav'} />
      <div className="cnt-row">
        <div className="nav-bar">
          <div className="user-avatar">PG</div>
          <ul>
            <li
              onClick={() => {
                setComponent('addWorkout');
                getData(userStore, yearAndMonth);
                visible.addWorkout
                  ? setVisible({ addWorkout: false, calendar: false })
                  : setVisible({ addWorkout: true, calendar: false });
              }}
            >
              Add workout
            </li>
            <li
              onClick={() => {
                setComponent('calendar');
                getData(userStore, yearAndMonth);
                visible.calendar
                  ? setVisible({ addWorkout: false, calendar: false })
                  : setVisible({ addWorkout: false, calendar: true });
              }}
            >
              Calendar
            </li>
            <li>History</li>
            <li>Statistics</li>
          </ul>
        </div>
        {showComponent}
      </div>
      <Footer />
    </div>
  );
});

export default Dashboard;
