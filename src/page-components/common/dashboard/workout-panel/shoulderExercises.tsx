import ControlPanel from './ex-control-panel';

function shoulderExercises(
  category: any,
  userStore: any,
  yearAndMonth: any,
  setExercisesPanel: any
) {
  const exercises = ['Overhead press'];

  return (
    <div className="categories">
      {exercises.map((e, i) => (
        <div
          className="category"
          key={i}
          onClick={() => {
            <ControlPanel
              exercise={e}
              category={category}
              yearAndMonth={yearAndMonth}
              userStore={userStore}
            />;
            setExercisesPanel({
              showExercise: false,
              category: category,
              exercise: e,
              controlPanel: true,
            });
          }}
        >
          {e}
        </div>
      ))}
    </div>
  );
}

export default shoulderExercises;

// setChoosenExercises(e, category)
