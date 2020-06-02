import { alertConstants } from "../_constants";
export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        alertPopUp: true,
        type: "success",
        message: action.message,
      };
    case alertConstants.ERROR:
      return {
        alertPopUp: true,
        type: "error",
        message: action.message,
      };
    case alertConstants.CLEAR:
      return {
      };
    default:
      return state;
  }
}
