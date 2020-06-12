import { dateConstants } from "../_constants";

export const dateActions = {
  getStartDateSuccess,
  getEndDateSuccess,
  startDateError,
  endDateError,
  clearDate,
};
function getStartDateSuccess(startDate) {
  return { type: dateConstants.START_DATE_SUCCESS, startDate: startDate };
}
function getEndDateSuccess(endDate) {
  return { type: dateConstants.END_DATE_SUCCESS, endDate: endDate };
}
function startDateError() {
  return { type: dateConstants.START_DATE_INVALID };
}

function endDateError() {
  return { type: dateConstants.END_DATE_INVALID };
}
function clearDate() {
  return { type: dateConstants.CLEAR_DATE };
}
