import { authentication,userInfomation } from "./user.reducers";
import { alert } from "./alert.reducers";
import { combineReducers } from "redux";
import { employee } from "./employee.reducers";
const rootReducer = combineReducers({
  authentication,
  alert,
  employee,
  userInfomation
});

export default rootReducer;
