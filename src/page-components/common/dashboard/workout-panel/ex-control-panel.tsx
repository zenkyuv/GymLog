import { useState } from 'react';
import { getData, setDocument } from '../../../firestore-database';
import '../../../../component-styles/control-panel.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridSelectionModel,
} from '@mui/x-data-grid';
// import useDemoData from '@mui/material/Grid';
import useDemoData from '@mui/material/Grid';
import { ClickAwayListener } from '@mui/material';
function ControlPanel(data: any) {
  const [show, setShowEl] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
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
  function handleSubmit(e: any) {
    console.log(e);
    console.log('submit');
    e.preventDefault();
    const reps = Number(values.reps);
    const weight = Number(values.weight);
    const isEmpty = values.reps === '' || values.weight === '';
    if (weight >= 0 && reps >= 0) {
      console.log('sent');
      setDocument(
        data.userStore,
        data.exercise,
        data.category,
        data.yearAndMonth,
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
  function handleReset(e: any) {
    setValues({
      weight: 0,
      reps: 0,
    });
    console.log(values);
    console.log('reset');
  }
  const dbData = data.userStore.workoutData;
  // const weight = dbData !== undefined ? dbData.sets.map((s: any) => s.split('-')[3]) : null
  // const reps = dbData !== undefined ? dbData.sets.map((s: any) => s.split('-')[2]) : null
  const weight = dbData !== undefined ? dbData.weight : null;
  const reps = dbData !== undefined ? dbData.reps : null;
  console.log(weight, reps);
  const index = weight;
  const isSelected = selectionModel.length > 0;
  console.log(isSelected);
  console.log(index);
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
  function getSelectedRow(row: any) {
    console.log(row);
    if (row) {
      setValues({
        weight: row.row.weight,
        reps: row.row.reps,
      });
    }
  }
  console.log(rows, columns);
  console.log(dbData.yearAndMonth);
  console.log(data.databaseTimeEqualsFrontend);
  return (
    <div className="row">
      {/* {show ? <span className="alert">Set weight or reps</span> : <span className="hidden">Set weight or reps</span>} */}
      <form className="row" onReset={handleReset} onSubmit={handleSubmit}>
        <h1>{data.exercise}</h1>
        WEIGHT(kgs):
        <TextField
          type="number"
          id="outlined-start-adornment"
          placeholder="kg"
          value={values.weight}
          onChange={handleChange('weight')}
        />
        REPS:
        <TextField
          type="number"
          value={values.reps}
          onChange={handleChange('reps')}
          id="outlined-start-adornment"
          placeholder="reps"
        />
        <div className="flex-gap">
          <Button
            type="submit"
            onClick={() => getData(data.userStore, data.yearAndMonth)}
            variant="contained"
            color="success"
          >
            {isSelected ? <span>Update</span> : <span>Save</span>}
          </Button>
          <Button
            type="reset"
            color={isSelected ? 'error' : 'primary'}
            onClick={() => getData(data.userStore, data.yearAndMonth)}
            variant="contained"
          >
            {isSelected ? (
              <span
                onClick={() =>
                  setDocument(
                    data.userStore,
                    data.exercise,
                    data.category,
                    data.yearAndMonth,
                    reps,
                    weight,
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
      {data.databaseTimeEqualsFrontend ? (
        <div className="column">
          <ClickAwayListener
            onClickAway={() => setSelectionModel([])}
            style={{ height: '100%', width: '100%' }}
          >
            <DataGrid
              rows={rows}
              pageSize={5}
              columns={columns}
              selectionModel={selectionModel}
              onSelectionModelChange={
                (selectionModel: any) => setSelectionModel(selectionModel)
                // console.log(selectionModel)
              }
            />
          </ClickAwayListener>
          {/* <div>
            {weight
              ? index.map((_: any, i: any) => (
                  <p>
                    {i}
                    {reps[i]} {weight[i]}{' '}
                  </p>
                ))
              : null}
          </div> */}
          {/* <div>{weight ?
					weight.map((e: any, i: any) => <p>{e} kgs</p>) :
								null}</div> */}
          {/* <div>{reps ? reps.map((e: any, i:any) => <p>{e} reps</p>) :
								null}</div> */}
        </div>
      ) : null}
    </div>
  );
}

export default ControlPanel;
