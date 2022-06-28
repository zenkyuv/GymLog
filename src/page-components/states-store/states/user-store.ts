import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';
import { WorkoutData } from '../../../types/interfaces';
export class UserStore {
  @observable userLogged = false;
  userUID = '';
	@observable workoutData:WorkoutData = {
		category: undefined,
		exercise: undefined,
		reps: [],
		weight: [],
		yearAndMonth: []
	};
  choosenExercise = [];
  @observable dbDataLoading = true;

  constructor() {
    makeObservable(this);
  }

  @action
  NotLogged() {
    this.userLogged = false;
  }

  @action
  Logged() {
    this.userLogged = true;
  }

  @action
  setUserUID(uid: string) {
    this.userUID = uid;
  }

  @action
  setWorkoutData(data: WorkoutData) {
    this.workoutData = data;
  }

	@action clearWorkoutData() {
		this.workoutData = {
		category: undefined,
		exercise: undefined,
		reps: [],
		weight: [],
		yearAndMonth: []
		}
	}

  @action
  isDbDataLoading(boolean: boolean) {
    if (boolean) {
      this.dbDataLoading = true;
    } else {
      this.dbDataLoading = false;
    }
  }

  @action
  setChoosenExercises = (exercise: string, category: string) => {
    this.choosenExercise.push({
      exercise: exercise,
      category: category,
      isSet: exercise && category ? true : false,
    });
  };
}

export default createContext(new UserStore());
