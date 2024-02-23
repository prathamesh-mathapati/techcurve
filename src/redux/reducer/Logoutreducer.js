import { ACTION_TYPE } from "../actions/Type";

const initialState = {
  logoutDetails: [],
  loading: false,
};

export const LogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPE.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        logoutDetails: action.payload,
        loading: false,
      };
    case ACTION_TYPE.LOGOUT_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
