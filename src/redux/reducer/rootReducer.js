import { combineReducers } from "redux";
import { QuestionReducer } from "./QuestionReducer";
import { LogoutReducer } from "./Logoutreducer";
const rootReducer = combineReducers({
  QuestionReducer: QuestionReducer,
  LogoutReducer: LogoutReducer,
});

export default rootReducer;
