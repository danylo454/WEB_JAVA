import * as UserActionCreators from "./categoryActions";
import * as ProductsActionCreators from "./productsActions";

export default {
  ...UserActionCreators,
  ...ProductsActionCreators,
};
