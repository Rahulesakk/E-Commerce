import { combineReducers } from "redux";
import userReducer from "./useReducer";

console.log(userReducer, "userReducer");
//  const rootReducer = combineReducers({
//     user : userReducer,
// })

export const rootReducer = combineReducers({
  user: userReducer,
});

// export default rootReducer
