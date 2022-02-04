var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, makeObservable } from "mobx";
import { observable } from "mobx";
import { createContext } from "react";
export class PageStore {
    dashboardVisible = false;
    constructor() {
        makeObservable(this);
    }
    makeDashboardVisible = () => {
        this.dashboardVisible = true;
    };
    makeDashboardNotVisible = () => {
        this.dashboardVisible = false;
    };
}
__decorate([
    observable
], PageStore.prototype, "dashboardVisible", void 0);
__decorate([
    action
], PageStore.prototype, "makeDashboardVisible", void 0);
__decorate([
    action
], PageStore.prototype, "makeDashboardNotVisible", void 0);
const pageStore = new PageStore();
export default createContext(pageStore);
