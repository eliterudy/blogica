import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {logger} from 'redux-logger';
import thunk from "redux-thunk";

import rootActionReducer from "../actionReducers/rootReducer";

const middleware = [thunk];
const enhancers = [...middleware];
export const store = configureStore({
  reducer: combineReducers({
    rootActionReducer,
  }),
  middleware: enhancers,
});
