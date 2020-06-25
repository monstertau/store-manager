import { customerService } from "../_services";
import { alertActions } from "./alert.actions";
import { customerConstants } from "../_constants/customer.constants";
export const customerActions = {
  addCustomer,
};
function addCustomer(customer) {
  return (dispatch) => {
    if (customer) {
      customerService.addCustomer(customer).then((data) => {
        if (data.success === true) {
          dispatch(alertActions.success("Add Customer Success!"));
          dispatch(success(customer, data.id));
        } else {
          dispatch(alertActions.error("Add Customer Failed: " + data.message));
          dispatch(failure(data.message));
        }
      });
    }
  };
  function success(customer, id) {
    return { type: customerConstants.ADD_CUSTOMER_SUCCESS, customer, id };
  }
  function failure(error) {
    return { type: customerConstants.ADD_CUSTOMER_ERROR, error };
  }
}
