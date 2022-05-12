import { daysOfCurrentMonths } from './helpers.js';
import styles from "../../../../component-styles/workout-panel.module.css"

export function handleMonthNavBackButtonClick({
  setExercisesPanel,
  component,
  yearAndMonth,
  onYearAndMonthChange,
  userStore,
}: {
  setExercisesPanel?: any;
  component: string;
  yearAndMonth: any;
  onYearAndMonthChange: any;
  userStore: any;
}) {
  console.log(yearAndMonth);
  const [year, month, day] = yearAndMonth;
  let prevDay = day - 1;
  userStore.workoutData = [];
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
}: {
  setExercisesPanel?: any;
  component: any;
  yearAndMonth: any;
  onYearAndMonthChange: any;
  userStore: any;
}) {
  const [year, month, day] = yearAndMonth;
  let nextYear = year;
  let nextMonth = month;
  let nextDay = day + 1;
  userStore.workoutData = [];
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
  setExercisesPanel: any,
  componentBetween: any,
  component: any,
  yearAndMonth: any,
  onYearAndMonthChange: any,
  userStore: any
) {
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
      {componentBetween}
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
