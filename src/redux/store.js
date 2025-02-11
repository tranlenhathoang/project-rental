import { createStore } from "redux";
import { rootReducer } from "./reducer";

export const store = createStore(rootReducer);
console.log("check store", store.getState());


