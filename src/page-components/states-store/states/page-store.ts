import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';

export class PageStore {
  @observable dashboardVisible = false;

  constructor() {
    makeObservable(this);
  }

  @action makeDashboardVisible = () => {
    this.dashboardVisible = true;
  };

  @action makeDashboardNotVisible = () => {
    this.dashboardVisible = false;
  };
}
const pageStore = new PageStore();

export default createContext(pageStore);
