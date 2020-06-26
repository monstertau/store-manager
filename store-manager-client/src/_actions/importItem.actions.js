import { importItemConstants } from "../_constants";
import { alertActions } from "./alert.actions";
export const importItemActions = {
  addProduct,
  addedProductClear,
};
function addProduct(product) {
  return (dispatch) => {
    if (product) {
      dispatch(alertActions.success("Import Item Successfully."));
      dispatch(success(product));
    } else {
      dispatch(alertActions.error("Product Error."));
      dispatch(failure(product));
    }
  };
  function success(product) {
    return {
      type: importItemConstants.IMPORT_ITEM_SUCCESS,
      importItem: product,
    };
  }
  function failure() {
    return {
      type: importItemConstants.IMPORT_ITEM_FAILURE,
    };
  }
}
function addedProductClear() {
  return { type: importItemConstants.IMPORT_ITEM_CLEAR };
}
