import { customerConstants } from "../_constants/customer.constants";
export const customer = (state = {}, action) => {
  switch (action.type) {
    case customerConstants.ADD_CUSTOMER_SUCCESS:
      return {
        success: true,
        customerInfo: action.customer,
        customerId: action.id,
      };
    case customerConstants.ADD_CUSTOMER_ERROR:
      return {
        success: false,
        error: action.error,
      };
    case customerConstants.ADD_CUSTOMER_CLEAR:
      return {};
    default:
      return state;
  }
};
