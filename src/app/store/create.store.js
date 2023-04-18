import educationReducer from "./education.store";
import employeesReducer from "./employees.store";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  employees: employeesReducer,
  educations: educationReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
