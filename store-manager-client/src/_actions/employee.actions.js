import { employeeConstants } from "../_constants";
import { employeeService } from "../_services/employee.service";
import { alertActions } from "./alert.actions";
export const employeeActions = {
  getAll,
};
function getAll(page, size) {
  return (dispatch) => {
    employeeService.getAll().then((data) => {
      if (data.success === true) {
        dispatch(
          success({
            data: data.users,
          })
        );
      } else {
        dispatch(failure(data.code));
        dispatch(alertActions.error(data.message));
      }
    });
  };
  function success(data) {
    return {
      type: employeeConstants.GET_EMPLOYEE_SUCESS,
      data: data,
    };
  }
  function failure(error) {
    return {
      type: employeeConstants.GET_EMPLOYEE_FAIL,
      error,
    };
  }
}
