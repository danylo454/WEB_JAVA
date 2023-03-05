import { CategoryState, CategoryesActions, CategoryActionTypes } from "./types";

const initialState: CategoryState = {
  categories: [],
  message: null,
  loading: false,
  categoryForUpdate: { id: 0, name: "", image: "", description: "" },
};

const CategoryReducer = (
  state = initialState,
  action: CategoryesActions
): CategoryState => {
  switch (action.type) {
    case CategoryActionTypes.SUCCESSFUL_REQUEST_CREATE_CATEGORY: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        categoryForUpdate: { id: 0, name: "", image: "", description: "" },
        categories: [],
      };
    }
    case CategoryActionTypes.SET_ID_CATEGORY_FOR_UPDATE: {
      return {
        ...state,
        loading: true,
      };
    }
    case CategoryActionTypes.REMOVE_CATEGORY_SUCCESSFUL: {
      const { categories } = state;
      return {
        ...state,
        loading: false,
        message: action.payload,
        categories: categories.filter((item) => item.id != action.payload),
      };
    }
    case CategoryActionTypes.START_REQUEST: {
      return { ...state, loading: true, message: "" };
    }
    case CategoryActionTypes.SUCCESSFUL_REQUEST_LIST_CATEGORYES: {
      return { ...state, loading: false, categories: action.payload };
    }
    case CategoryActionTypes.SERVER_CATEGORY_ERROR: {
      return { ...state, loading: false, message: action.payload.message };
    }
    case CategoryActionTypes.SUCCESSFUL_REQUEST_CATEGORY_BY_ID: {
      return { ...state, loading: false, categoryForUpdate: action.payload };
    }
    case CategoryActionTypes.SUCCESSFUL_REQUEST_UPDATE_CATEGORY: {
      return {
        ...state,
        loading: false,
        categoryForUpdate: {
          id: 0,
          name: "",
          image: "",
          description: "",
        },
        message: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default CategoryReducer;
