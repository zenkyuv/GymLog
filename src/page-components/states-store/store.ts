import React from "react";
import { UserStore } from "./states/user-store";
import { PageStore } from "./states/page-store";

export const stores = Object.freeze({
	userStore: new UserStore(),
	pageStore: new PageStore()
})

export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider