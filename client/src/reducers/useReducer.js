// const intialState = {
//   userData: {},
//   isLoggedIn: false,
// };

// export default function userReducer(state = null, action) {
//   console.log(state, "statetete", action.payload, "REDUCER");
//   switch (action.type) {
//     case "LOGGED_IN_USER":
//       return { ...state, isLoggedIn: true, userData: action.payload };
//     case "LOGOUT":
//       return { ...state, isLoggedIn: false, userData: {} };
//     default:
//       return state;
//   }
// }

export default function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
}
