import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import  baseApiSliceReducer, {baseApiSlice} from "./baseApiSlice"

export default configureStore({
  reducer: {
    [baseApiSlice.reducerPath]:baseApiSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApiSlice.middleware)
      .concat(logger),
});