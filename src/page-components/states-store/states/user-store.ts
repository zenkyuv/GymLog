import { action, makeObservable } from 'mobx'
import { observable } from 'mobx'
import { createContext } from 'react'
import { WorkoutDataObjects } from '../../../types/interfaces'

export class UserStore {
	@observable selectedDate = []
  @observable userIsLogged = false
  userUID = ''
	@observable workoutData: WorkoutDataObjects[];
	@observable databaseTime: any;
  choosenExercise = []
	@observable dbDataLoading = false
	@observable categoriesAndExercises;

  constructor() {
    makeObservable(this)
  }

  @action
  logoutUser() {
    this.userIsLogged = false
  }

	@action
	setSelectedDate(yearAndMonth) {
		this.selectedDate = yearAndMonth
	}

  @action
	loginUser() {
		this.userIsLogged = true
  }

  @action
  setUserUID(uid: string) {
    this.userUID = uid
  }

  @action
	setWorkoutData(data: any) {
		this.workoutData = data
	}
	
	@action
	setDatabaseTime(time: any) {
		this.databaseTime = time
	}

	@action clearStore() {
		this.userIsLogged = false,
		this.userUID = '',
		this.workoutData = undefined;
  	this.choosenExercise = []
  	this.dbDataLoading = true
	}

	@action setUserStaticCategoriesAndExercises(data) {
		this.categoriesAndExercises = data;
	}

  @action
  isDbDataLoading(boolean: boolean) {
    if (boolean) {
      this.dbDataLoading = true
    } else {
      this.dbDataLoading = false
    }
  }

  @action
  setChoosenExercises = (exercise: string, category: string) => {
    this.choosenExercise.push({
      exercise: exercise,
      category: category,
      isSet: exercise && category ? true : false,
    })
  }
}

export default createContext(new UserStore())
