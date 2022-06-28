import { useState } from 'react';
import { getData, setDocument } from '../../../firestore-database';
import styles from '../../../../component-styles/control-panel.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowId,
} from '@mui/x-data-grid';
import { ClickAwayListener } from '@mui/material';
import { ControlPanelData } from '../../../../types/interfaces';

function ControlPanel(
	{ userStore, exercise, category, yearAndMonth, databaseTimeEqualsFrontend }:
		ControlPanelData) {
  const [show, setShowEl] = useState(false);
	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
	console.log(userStore, exercise, 4)
  interface State {
    weight: number | string;
    reps: number | string;
  }
  const [values, setValues] = useState<State>({
    weight: 0,
    reps: 0,
  });
  // const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState({
    weight: false,
    reps: false,
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(Number(event.target.value) === 2);
      if (Number(event.target.value) >= 0) {
        setValues({ ...values, [prop]: event.target.value });
      }
    };
  function handleSubmit() {
    console.log('submit');
    const reps = Number(values.reps);
    const weight = Number(values.weight);
    const isEmpty = values.reps === '' || values.weight === '';
    if (weight >= 0 && reps >= 0) {
      console.log('sent');
      setDocument(
        userStore,
        exercise,
        category,
        yearAndMonth,
        reps,
        weight,
        'add',
        selectionModel
      );
    } else {
      setShowEl(true);
      setTimeout(() => {
        setShowEl(false);
      }, 3000);
    }
  }
  console.log(selectionModel);
  function handleReset() {
    setValues({
      weight: 0,
      reps: 0,
    });
    console.log(values);
    console.log('reset');
	}
	

	const loadDatabaseData = () => {
	const dbData = userStore.workoutData;
	console.log(userStore.workoutData)
	const weight = dbData !== undefined ? dbData.weight : null;
	const reps = dbData !== undefined ? dbData.reps : null;
	const index = weight;
	const rows: GridRowsProp =
    index !== undefined
      ? index.map((_e, i) => ({
          id: i + 1,
          weight: weight [i],
          reps: reps[i],
        }))
				: [];
		return {weight, reps, rows}
	}
	const databaseData = loadDatabaseData()
	const isSelected = selectionModel.length > 0;
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Set', width: 180 },
    { field: 'weight', headerName: 'Weight', width: 180 },
    { field: 'reps', headerName: 'Reps', width: 180 },
	];
  function getSelectedRow(row: { row: { weight: number; reps: number; }; }) {
    console.log(row);
    if (row) {
      setValues({
        weight: row.row.weight,
        reps: row.row.reps,
      });
    }
  }

  return (
    <div className={`${styles.row} ${styles["flex-wrap"]}`}>
      {/* {show ? <span className="alert">Set weight or reps</span> : <span className="hidden">Set weight or reps</span>} */}
      <form className={`${styles.column} ${styles["add-panel"]}`} onReset={handleReset} onSubmit={handleSubmit}>
        <h1>{exercise}</h1>
        WEIGHT(kgs):
        <TextField
          type="number"
          id={styles["outlined-start-adornment"]}
          placeholder="kg"
          value={values.weight}
          onChange={handleChange('weight')}
        />
        REPS:
        <TextField
          type="number"
          value={values.reps}
          onChange={handleChange('reps')}
          id={styles["outlined-start-adornment"]}
          placeholder="reps"
        />
        <div className={styles["flex-gap"]}>
          <Button
            type="submit"
            onClick={() => getData(userStore, yearAndMonth)}
            variant="contained"
            color="success"
          >
            {isSelected ? <span>Update</span> : <span>Save</span>}
          </Button>
          <Button
            type="reset"
            color={isSelected ? 'error' : 'primary'}
            onClick={() => getData(userStore, yearAndMonth)}
            variant="contained"
          >
            {isSelected ? (
							<span
								onClick={() =>
									setDocument(
										userStore,
										exercise,
										category,
										yearAndMonth,
										databaseData.reps,
										databaseData.weight,
										'remove',
										selectionModel
									)
                }
              >
                Delete
              </span>
            ) : (
              <span>Clear</span>
            )}
          </Button>
        </div>
      </form>
      
        <div className={`${styles.row} ${styles["info-panel"]}`}>
          <ClickAwayListener
            onClickAway={() => setSelectionModel([])}
            style={{ height: '100%', width: '100%' }}
          >
            <DataGrid
              rows={databaseData.rows}
              pageSize={5}
              columns={columns}
              selectionModel={selectionModel}
              onSelectionModelChange={
                (selectionModel) => setSelectionModel(selectionModel)
                // console.log(selectionModel)
              }
            />
          </ClickAwayListener>
        </div>
      
    </div>
  );
}

export default ControlPanel;
