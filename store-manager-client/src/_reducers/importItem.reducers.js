import { importItemConstants } from "../_constants";
export const importItem = (state = {}, action) => {
  switch (action.type) {
    case importItemConstants.IMPORT_ITEM_SUCCESS:
      return {
        success: true,
        importItem: action.importItem,
      };
    case importItemConstants.IMPORT_ITEM_FAILURE:
      return {
        success: false,
      };
    case importItemConstants.IMPORT_ITEM_CLEAR:
      return {};
    default:
      return state;
  }
};
