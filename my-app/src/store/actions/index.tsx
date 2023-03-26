import * as UserActionCreators from "./userActions";
import * as CaregoryActionCreators from "./categoryActions";
import * as ProductsActionCreators from "./productsActions";

export default {
  ...CaregoryActionCreators,
  ...ProductsActionCreators,
  ...UserActionCreators,
};
