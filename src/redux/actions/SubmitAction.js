import axios from "axios";
import { Constants } from "../../utilities/ApiConstant";
import { ACTION_TYPE } from "./Type";

// Get question data
export const postAllQuestionsList =
  ({ dataList, header, onSuccess, onFailure }) =>
  async (dispatch) => {
    dispatch({ type: ACTION_TYPE.POST_SUBMIT_ANSWER_REQUEST });

    try {
      await axios
        .post(
          Constants.apiBaseUrl + Constants.ApiAction.submit_answer,
          dataList,
          {
            headers: header,
          }
        )
        .then((response) => {
          dispatch({
            type: ACTION_TYPE.POST_SUBMIT_ANSWER_SUCCESS,
            payload: response.data,
            statusCode: response.statusCode,
          });

          onSuccess(response);
        });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.POST_SUBMIT_ANSWER_FAILURE,
        error: error,
      });

      onFailure(error);
    }
  };
