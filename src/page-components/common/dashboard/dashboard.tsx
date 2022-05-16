import { observer } from 'mobx-react-lite';
import { today } from './calendar/helpers.js';
import WorkoutPanel from './workout-panel/add-workout.js';
import Calendar, { CalendarDayHeader } from './calendar/calendar.js';
import styles from '../../../component-styles/dashboard.module.css';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useContext } from 'react';
import { getData } from '../../firestore-database.js';
import UserStore from '../../states-store/states/user-store.js';
import homeIcon from '../../../images/home-icon.svg';
import calendarIcon from '../../../images/calendar-icon.svg';
import historyIcon from '../../../images/history-icon.svg';
import statisticsIcon from '../../../images/statistics-icon.svg';
import logoutIcon from '../../../images/logout-icon.svg';
import { logout } from '../../auth.js';
import PageStore from '../../states-store/states/page-store.js';
import { style } from '@mui/system';

const Dashboard = observer(() => {
  const [yearAndMonth, setYearAndMonth]: any = useState(today);
  const savedComponent = useRef('home');
  const userStore = useContext(UserStore);
  const pageStore = useContext(PageStore);
  const [trainingData, setData] = useState(undefined);
  const [selectedDate, handleDateChange] = useState(new Date());
  console.log(today);
  var dt = new Date();
  var month = dt.getMonth();
  var year = dt.getFullYear();
  const weekday = dt.toLocaleString('default', { weekday: 'short' });
  const daysInMonth = new Date(year, month, 0).getDate();
  let component = undefined;
  const [showComponent, setComponent]: any = useReducer(reducer, component);
  function reducer(state: any, action: any) {
    if (action === 'home') {
      savedComponent.current = 'home';
      return (component = (
        <WorkoutPanel
          component={'workoutPanel'}
          yearAndMonth={yearAndMonth}
          onYearAndMonthChange={setYearAndMonth}
        />
      ));
    } else if (action === 'calendar') {
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
  const css = styles["dashboard-nav"];
  return (
		<div className={styles.container}>
			<div className={styles["cnt-row"]}>
        <div className={styles["nav-bar"]}>
          <a href="index.html" className={styles.logo}>
            Gym<br></br>
            <span className={styles.text}>Log</span>
          </a>
          <ul>
            <li
              className={
                savedComponent.current === 'home' ? styles.clicked : undefined
              }
              onClick={() => {
                setComponent('home');
                getData(userStore, yearAndMonth);
              }}
            >
              <img className={styles["nav-icon"]} alt="home icon" src={homeIcon} />
            </li>
            <li
              className={
                savedComponent.current === 'calendar' ? styles.clicked : undefined
              }
              onClick={() => {
                setComponent('calendar');
                getData(userStore, yearAndMonth);
              }}
            >
              <img
                className={styles["nav-icon"]}
                src={calendarIcon}
                alt="calendar icon"
              />
            </li>
						<li>
              <img className={styles["nav-icon"]} src={historyIcon} alt="history icon" />
            </li>
            <li>
              <img
                className={styles["nav-icon"]}
                src={statisticsIcon}
                alt="statistics icon"
              />
            </li>
            <li>
              <img
                onClick={() => {
                  logout(userStore, pageStore);
                }}
                className={styles["nav-icon"]}
                src={logoutIcon}
                alt="logout icon"
              />
            </li>
          </ul>
        </div>
				<div className={styles.middle}>
					<div className={styles.name}>
						<h1>Hi, nazwa</h1>
						<p>Plan your days to be more productive.</p>
					</div>
					{showComponent}
				</div>
        <div className={styles["user-info-bar"]}>
          <h3>
            <span> My Profile</span> <span>..</span>
          </h3>
          <div className={styles["user-avatar"]}>PG</div>
          <h3>Przemek Galezki</h3>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
