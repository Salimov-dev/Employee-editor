import { createAction, createSlice } from "@reduxjs/toolkit";
import educationService from "../services/education.service";

const educationSlice = createSlice({
  name: "education",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    educationsRequested: (state) => {
      state.isLoading = true;
    },
    educationsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    educationsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    educationCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    educationUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((emp) => emp._id === action.payload._id)
      ] = action.payload;
    },
    educationRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

const educationCreateRequested = createAction(
  "education/educationCreateRequested"
);
const educationCreateFailed = createAction("education/educationCreateFailed");
const educationUpdateRequested = createAction(
  "education/educationUpdateRequested"
);
const educationUpdateFailed = createAction("education/educationUpdateFailed");
const educationRemoveRequested = createAction(
  "education/educationRemoveRequested"
);
const educationRemoveFailed = createAction("education/educationRemoveFailed");

const { reducer: educationReducer, actions } = educationSlice;
const {
  educationsRequested,
  educationsReceived,
  educationsRequestFailed,
  educationCreated,
  educationUpdated,
  educationRemoved,
} = actions;

export const loadEducationsList = () => async (dispatch) => {
  dispatch(educationsRequested());
  try {
    const { content } = await educationService.get();
    dispatch(educationsReceived(content));
  } catch (error) {
    dispatch(educationsRequestFailed(error.message));
  }
};

export const createEducation = (payload) => async (dispatch) => {
  dispatch(educationCreateRequested());
  try {
    const { content } = await educationService.create(payload);
    dispatch(educationCreated(content));
    return content;
  } catch (error) {
    educationCreateFailed(error.message);
  }
};

export const removeEducation = (id) => async (dispatch) => {
  dispatch(educationRemoveRequested());
  try {
    const { content } = await educationService.remove(id);
    if (content === null) {
      dispatch(educationRemoved(id));
    }
  } catch (error) {
    dispatch(educationRemoveFailed());
  }
};

export const updateEducation = (id, payload) => async (dispatch) => {
  dispatch(educationUpdateRequested());
  try {
    const { content } = await educationService.update(id, payload);
    dispatch(educationUpdated(content));
    return content;
  } catch (error) {
    educationUpdateFailed(error.message);
  }
};

export const getEducations = () => (state) => state?.educations?.entities;
export const getEducationById = (id) => (state) =>
  state.educations.entities?.find((emp) => emp._id === id);
export const getEducationsLoadingStatus = () => (state) =>
  state.educations.isLoading;

export default educationReducer;
