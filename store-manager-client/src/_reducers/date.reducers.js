import { dateConstants } from "../_constants";

export const dateFilter = (state = {}, action) => {
  switch (action.type) {
    case dateConstants.START_DATE_SUCCESS:
      return Object.assign({}, state, {
        success: true,
        startDate: action.startDate,
      });
    case dateConstants.END_DATE_SUCCESS:
      return Object.assign({}, state, {
        success: true,
        endDate: action.endDate,
      });
    case dateConstants.START_DATE_INVALID:
      return Object.assign({}, state, {
        success: false,
      });
    case dateConstants.END_DATE_INVALID:
      return Object.assign({}, state, {
        success: false,
      });
    case dateConstants.CLEAR_DATE:
      return {};
    default:
      return state;
  }
};
