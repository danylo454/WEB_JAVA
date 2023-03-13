import { combineReducers } from "redux";
import CategoryReducer from "./categoryReducer";
import ProductsReducer from "./productReducer";

export const rootReducer = combineReducers({
  CategoryReducer,
  ProductsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
