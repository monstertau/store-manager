import { authentication } from "./user.reducers";
import { alert } from "./alert.reducers";
import { combineReducers } from "redux";
import { employee } from "./employee.reducers";
const rootReducer = combineReducers({
  authentication,
  alert,
  employee,
});

export default rootReducer;
