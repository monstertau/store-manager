import { authentication, userInfomation } from "./user.reducers";
import { alert } from "./alert.reducers";
import { combineReducers } from "redux";
import { employee } from "./employee.reducers";
import { dateFilter } from "./date.reducers";
import { productAdder } from "./productAdder.reducers";
import { customer } from "./customer.reducers";
const rootReducer = combineReducers({
  authentication,
  alert,
  employee,
  userInfomation,
  dateFilter,
  productAdder,
  customer,
});

export default rootReducer;
