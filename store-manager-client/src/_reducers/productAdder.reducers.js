import { ProductAdderConstants } from "../_constants";
export const productAdder = (state = {}, action) => {
  switch (action.type) {
    case ProductAdderConstants.ADD_PRODUCT_SUCCESS:
      return {
        success: true,
        product: action.product,
      };
    case ProductAdderConstants.ADD_PRODUCT_FAILURE:
      return {
        success: false,
      };
    case ProductAdderConstants.ADDED_PRODUCT_CLEAR:
      return {};
    default:
      return state;
  }
};
