import { combineReducers } from "redux";
import CategoryReducer from "./categoryReducer";

export const rootReducer = combineReducers({
  CategoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
