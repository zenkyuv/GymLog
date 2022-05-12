import styles from  '../../../../component-styles/workout-panel.module.css';
import { isToday } from '../calendar/helpers.js';
import { renderButtons } from '../calendar/calendar-buttons.js';
import { useContext, useEffect, useState } from 'react';
import shoulderExercises from './shoulderExercises.js';
import UserStore from '../../../states-store/states/user-store.js';
import ControlPanel from './ex-control-panel.js';
import { observer } from 'mobx-react';
import loadingIndicator from '../../../../images/loading-indicator-2.svg';
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowsProp,
} from '@mui/x-data-grid';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const WorkoutPanel = observer(
  ({ component, yearAndMonth, onYearAndMonthChange }: any) => {
    const userStore = useContext(UserStore);
    const [year, month, day] = yearAndMonth;
    const [showExercises, setExercisesPanel]: any = useState({
      showExercise: false,
      category: undefined,
      exercise: undefined,
      controlPanel: false,
    });
    const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
    type addButton = 'add-button top' | 'add-button';
    const [category, setCategory]: any = useState(undefined);
    const categories = [
      'Shoulders',
      'Triceps',
      'Biceps',
      'Chest',
      'Back',
      'Legs',
      'Abs',
    ];
    const componentBetween = (
      <h1 className={styles.time}>
        {isToday(year, month, day) ? 'Today' : `${year}-${month}-${day}`}
      </h1>
    );
    function exercises() {
      return (
        <div className={styles.categories}>
          {category === undefined
            ? categories.map((category, i) => (
                <div
                  key={i}
                  onClick={() => setCategory(category)}
                  className={styles.category}
                >
                  {category}
                </div>
              ))
            : category === 'Shoulders'
            ? shoulderExercises(
                category,
                userStore,
                yearAndMonth,
                setExercisesPanel
              )
            : null}
        </div>
      );
    }
    const changeTimeBtns = renderButtons(
      setExercisesPanel,
      componentBetween,
      component,
      yearAndMonth,
      onYearAndMonthChange,
      userStore
    );
    const addExerciseBtn = (css: addButton) => {
      return (
        <div
          className={css}
          onClick={() => {
            setExercisesPanel({ showExercise: true });
            setCategory(undefined);
          }}
        >
          +
        </div>
      );
    };
    const data = userStore.workoutData;
    const [databaseYear, databaseMonth, databaseDay] = data.yearAndMonth
      ? data.yearAndMonth
      : [0, 0, 0];
    const databaseTimeEqualsFrontend =
      databaseYear === year && databaseMonth === month && databaseDay === day;
    useEffect(() => {}, [data, userStore.workoutData]);
    console.log(databaseDay, day);
    const weight = data.weight ? data.weight : undefined;
    const reps = data.reps ? data.reps : undefined;
    const index = weight;
    const rows: GridRowsProp =
      index !== undefined
        ? index.map((e: any, i: any) => ({
            id: i + 1,
            weight: weight[i],
            reps: reps[i],
          }))
        : [];
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Set', width: 180 },
      { field: 'weight', headerName: 'Weight', width: 180 },
      { field: 'reps', headerName: 'Reps', width: 180 },
    ];
    return (
      <div className={styles["workout-cnt"]}>
        {databaseTimeEqualsFrontend && !showExercises.controlPanel ? (
          <div className={styles["flex-row time-center"]}>
            {changeTimeBtns}
            {addExerciseBtn(styles['add-button top'])}
          </div>
        ) : (
          <div className={styles["flex-row time-center"]}>{changeTimeBtns}</div>
        )}
        {userStore.dbDataLoading && !showExercises.controlPanel ? (
          <div>
            <img
              alt="loading"
              className={styles["loading-indicator"]}
              src={loadingIndicator}
            />
          </div>
        ) : showExercises.showExercise ? (
          exercises()
        ) : databaseTimeEqualsFrontend && !showExercises.controlPanel ? (
          <div className={styles.exercise}>
            <h3>{data.exercise}</h3>

            <ClickAwayListener
              onClickAway={() => setSelectionModel([])}
              style={{ height: '100%', width: '100%' }}
            >
              <DataGrid
                selectionModel={selectionModel}
                onSelectionModelChange={({ selectionModel }: any) =>
                  setSelectionModel(selectionModel)
                }
                rows={rows}
                pageSize={5}
                columns={columns}
              />
            </ClickAwayListener>
            {/* <div>{weight ? weight.map((e: any) => <p>{e}kgs</p>) : null}</div>
              <div>{reps ? reps.map((e: any) => <p>{e}reps</p>) : null}</div> */}
          </div>
        ) : !showExercises.controlPanel ? (
          <div className={styles.center}>{addExerciseBtn(styles['add-button'])}</div>
        ) : (
          <ControlPanel
            databaseTimeEqualsFrontend={databaseTimeEqualsFrontend}
            exercise={showExercises.exercise}
            category={showExercises.category}
            yearAndMonth={yearAndMonth}
            userStore={userStore}
          />
        )}
      </div>
    );
  }
);

export default WorkoutPanel;

// ControlPanel(showExercises.exercise, showExercises.category, yearAndMonth, userStore)
