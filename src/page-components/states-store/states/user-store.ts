import { action, makeObservable } from 'mobx'
import { observable } from 'mobx'
import { createContext } from 'react'
import { WorkoutDataObjects } from '../../../types/interfaces'

export class UserStore {
	@observable selectedDate = []
  @observable userLogged = false
  userUID = ''
	@observable workoutData: WorkoutDataObjects[];
	@observable databaseTime: any;
  choosenExercise = []
	@observable dbDataLoading = false
	@observable categoriesAndExercises;
	@observable categoriesDependableOnDay;

  constructor() {
    makeObservable(this)
  }

  @action
  NotLogged() {
    this.userLogged = false
  }

	@action
	setSelectedDate(yearAndMonth) {
		this.selectedDate = yearAndMonth
	}

  @action
	Logged() {
			this.userLogged = true
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
		this.userLogged = false,
		this.userUID = '',
		this.workoutData = undefined;
  	this.choosenExercise = []
  	this.dbDataLoading = true
	}

	@action setUserStaticCategoriesAndExercises(data) {
		this.categoriesAndExercises = data;
	}

	@action setCategoriesDependableOnDay(categories: any[]) {
		this.categoriesDependableOnDay = categories
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
