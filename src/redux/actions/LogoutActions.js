import axios from "axios";
import { ACTION_TYPE } from "./Type";
import { Constants } from "../../utilities/ApiConstant";

// User logout
export const userLogoutAPI =
  ({ dataList, header, onSuccess, onFailure }) =>
  async (dispatch) => {
    dispatch({ type: ACTION_TYPE.LOGOUT_USER_REQUEST });
    try {
      await axios
        .post(Constants.apiBaseUrl + Constants.ApiAction.logout, dataList, {
          headers: header,
        })
        .then((response) => {
          dispatch({
            type: ACTION_TYPE.LOGOUT_USER_SUCCESS,
            payload: response.data,
            statusCode: response.statusCode,
          });
          onSuccess(response);
        });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.LOGOUT_USER_FAILURE,
        error: error,
      });
      onFailure(error);
    }
  };
