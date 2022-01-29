import { action, makeObservable } from "mobx";
import { observable } from "mobx"
import { createContext } from "react";


export class UserStore {
	@observable
	userLogged = false;

	constructor() {
	makeObservable(this)
}

	@action
	NotLogged() {
		this.userLogged = false;
	}

	@action
	Logged() {
		this.userLogged = true;
	}
	

}

export default createContext(new UserStore())