import { daysOfCurrentMonths, isToday } from './helpers.js';
import styles from "../../../../component-styles/workout-panel.module.css"
import { WorkoutOptions } from '../../../../types/interfaces.js';

export function handleMonthNavBackButtonClick({
  setExercisesPanel,
  component,
  yearAndMonth,
	onYearAndMonthChange,
	userStore
}: WorkoutOptions) {
  console.log(yearAndMonth);
  const [year, month, day] = yearAndMonth;
  let prevDay = day - 1;
	userStore.clearWorkoutData()
  let nextYear = year;
  let nextMonth = month;
  if (component === 'workoutPanel') {
    setExercisesPanel({
      showExercise: false,
      category: undefined,
      exercise: undefined,
      controlPanel: false,
    });
    if (prevDay < 1) {
      nextMonth -= 1;
      prevDay = daysOfCurrentMonths;
    }
  } else if (component === 'calendar') {
    nextMonth -= 1;
  }
  if (nextMonth === 0) {
    nextMonth = 12;
    nextYear = year - 1;
  }
  onYearAndMonthChange([nextYear, nextMonth, prevDay]);
}

export function handleMonthNavForwardButtonClick({
  setExercisesPanel,
  component,
  yearAndMonth,
  onYearAndMonthChange,
  userStore,
}: WorkoutOptions) {
  const [year, month, day] = yearAndMonth;
  let nextYear = year;
  let nextMonth = month;
  let nextDay = day + 1;
  userStore.clearWorkoutData()
  if (component === 'workoutPanel') {
    setExercisesPanel({
      showExercise: false,
      category: undefined,
      exercise: undefined,
      controlPanel: false,
    });
    if (nextDay > daysOfCurrentMonths) {
      nextDay = 1;
      nextMonth += 1;
    }
  } else if (component === 'calendar') {
    nextMonth += 1;
  }
  if (nextMonth === 13) {
    nextMonth = 1;
    nextYear = year + 1;
  }
  onYearAndMonthChange([nextYear, nextMonth, nextDay]);
}

export function renderButtons(
  {setExercisesPanel,
  component,
  yearAndMonth,
  onYearAndMonthChange,
  userStore}: Required<WorkoutOptions>
) {
	const [year, month, day] = yearAndMonth;
  return (
    <div className={styles["time-cnt"]}>
      <button
        className={styles["button-margin"]}
        onClick={() =>
          handleMonthNavBackButtonClick({
            setExercisesPanel,
            component,
            yearAndMonth,
            onYearAndMonthChange,
            userStore,
          })
        }
      >
        {'<'}
      </button>
       <h1 className={styles.time}>
        {isToday(year, month, day) ? 'Today' : `${year}-${month}-${day}`}
      </h1>
      <button
        className={styles["button-margin"]}
        onClick={() =>
          handleMonthNavForwardButtonClick({
            setExercisesPanel,
            component,
            yearAndMonth,
            onYearAndMonthChange,
            userStore,
          })
        }
      >
        {'>'}
      </button>
    </div>
  );
}
