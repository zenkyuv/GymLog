import { action, makeObservable } from "mobx";
import { observable } from "mobx"
import { createContext } from "react";
import { useState } from "react";

export class UserStore {
	@observable
	userLogged = false;
	userUID = ""

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

	@action
	setUserUID(uid:any) {
		this.userUID = uid
	}
}

export default createContext(new UserStore())