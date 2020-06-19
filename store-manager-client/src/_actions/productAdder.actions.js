import { ProductAdderConstants } from "../_constants/productAdder.constants";
import { alertActions } from "./alert.actions";

export const productAdderActions = {
  addProduct,
};
function addProduct(product) {
  return (dispatch) => {
    if (product) {
      dispatch(alertActions.success("Added " + product.name + " to cart."));
      dispatch(success(product));
    } else {
      dispatch(alertActions.error("Product Error."));
      dispatch(failure(product));
    }
  };
  function success(product) {
    return {
      type: ProductAdderConstants.ADD_PRODUCT_SUCCESS,
      product: product,
    };
  }
  function failure() {
    return {
      type: ProductAdderConstants.ADD_PRODUCT_FAILURE,
    };
  }
}
function addedProductClear() {
  return { type: ProductAdderConstants.ADDED_PRODUCT_CLEAR };
}
