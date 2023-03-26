import { combineReducers } from "redux";
import CategoryReducer from "./categoryReducer";
import ProductsReducer from "./productReducer";
import UserReducer from "./userReducer";

export const rootReducer = combineReducers({
  CategoryReducer,
  ProductsReducer,
  UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
