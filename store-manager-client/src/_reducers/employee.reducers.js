import { employeeConstants } from "../_constants";

const initialState = { auth: false, data: [] };
export const employee = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.GET_EMPLOYEE_SUCESS:
      return { auth: true, data: action.users };
    case employeeConstants.GET_EMPLOYEE_FAIL:
      return {};
    default:
      return state;
  }
};
