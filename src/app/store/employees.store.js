import { createAction, createSlice } from "@reduxjs/toolkit";
import employeeService from "../services/employee.service";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    employeesRequested: (state) => {
      state.isLoading = true;
    },
    employeesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    employeesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    employeeCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    employeeUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((emp) => emp._id === action.payload._id)
      ] = action.payload;
    },
    employeeRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

const employeeCreateRequested = createAction(
  "employee/employeeCreateRequested"
);
const employeeCreateFailed = createAction("employee/employeeCreateFailed");
const employeeUpdateRequested = createAction(
  "employee/employeeUpdateRequested"
);
const employeeUpdateFailed = createAction("employee/employeeUpdateFailed");
const employeeRemoveRequested = createAction(
  "employee/employeeRemoveRequested"
);
const employeeRemoveFailed = createAction("employee/employeeRemoveFailed");

const { reducer: employeesReducer, actions } = employeesSlice;
const {
  employeesRequested,
  employeesReceived,
  employeesRequestFailed,
  employeeCreated,
  employeeUpdated,
  employeeRemoved,
} = actions;

export const loadEmployeesList = () => async (dispatch) => {
  dispatch(employeesRequested());
  try {
    const { content } = await employeeService.get();
    dispatch(employeesReceived(content));
  } catch (error) {
    dispatch(employeesRequestFailed(error.message));
  }
};

export const createEmployee = (payload) => async (dispatch) => {
  dispatch(employeeCreateRequested());
  try {
    await employeeService.create(payload);
    dispatch(employeeCreated(payload));
  } catch (error) {
    dispatch(employeeCreateFailed(error.message));
  }
};

export const removeEmployee = (id) => async (dispatch) => {
  dispatch(employeeRemoveRequested());
  try {
    const { content } = await employeeService.remove(id);
    if (content === null) {
      dispatch(employeeRemoved(id));
    }
  } catch (error) {
    dispatch(employeeRemoveFailed());
  }
};

export const updateEmployee = (id, payload) => async (dispatch) => {
  dispatch(employeeUpdateRequested());
  try {
    const { content } = await employeeService.update(id, payload);
    dispatch(employeeUpdated(content));
    return content;
  } catch (error) {
    employeeUpdateFailed(error.message);
  }
};

export const getEmployees = () => (state) => state.employees.entities;
export const getEmployeeById = (id) => (state) =>
  state.employees.entities?.find((emp) => emp._id === id);
export const getEmployeesLoadingStatus = () => (state) =>
  state.employees.isLoading;

export default employeesReducer;
