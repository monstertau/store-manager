import { alertConstants } from "../_constants";

export const alertActions = {
  success,
  error,
  clear,
};
function success(message) {
  return (dispatch) => {
    dispatch(clear());
    dispatch(success(message));
  };
  function success() {
    return { type: alertConstants.SUCCESS, message };
  }
  function clear() {
    return { type: alertConstants.CLEAR };
  }
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
