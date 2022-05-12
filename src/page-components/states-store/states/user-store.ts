import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';
import { useState } from 'react';

export class UserStore {
  @observable userLogged:boolean = false;
  userUID:string = '';
  @observable workoutData: any = [];
  choosenExercise:any[] = [];
  @observable dbDataLoading: boolean = true;

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
  setUserUID(uid: any) {
    this.userUID = uid;
  }

  @action
  setWorkoutData(data: any) {
    this.workoutData = data;
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
