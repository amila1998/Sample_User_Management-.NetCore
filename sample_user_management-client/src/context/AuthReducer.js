const AuthReducer = (state, action) => {
    switch (action.type) {
      case "SIGNING":
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload
        };
      case "GET_USER":
        return {
          ...state,
          user: action.payload,
        };
      case "SIGNOUT":
        return {
          ...state,
          isLoggedIn: false,
          token: "",
          user: '',
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;