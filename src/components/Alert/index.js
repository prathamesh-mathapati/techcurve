import React, { useState } from "react";
import "./style.scss";
import { Modal, Button } from "react-bootstrap";
import { defaultMessages } from "../../utilities/messege";
import { useDispatch } from "react-redux";
import { userLogoutAPI } from "../../redux/actions/LogoutActions";
import AppLoader from "../CustomLoader";

// Api and DefaultMessages

const CustomAlert = (props) => {
  const {
    title,
    message,
    showAlert,
    handleCloseAlert,
    handleNextSection,
    apiType,
    getQuestionsApi,
    setShowAlert,
    setLoaderStatus,
  } = props;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let encodeURLQuery = encodeURIComponent("?sessionTimeOut=true");
  const [reDirectLoading, setReDirectLoading] = useState();
  // get user Data
  const dispatch = useDispatch();

  const handleAlertModalAndData = () => {
    let arrryofapiType = apiType && apiType.split("|");
    if ("your exam will start..." === message) {
      handleCloseAlert("start");
    } else if (
      "Are you sure you want to move on next section" === message ||
      defaultMessages?.testDoneMsg === message
    ) {
      handleCloseAlert("");
    }
    if (
      arrryofapiType &&
      defaultMessages?.getQuestionAPI === arrryofapiType[0]
    ) {
      getQuestionsApi(arrryofapiType[1], arrryofapiType[2]);
      setShowAlert(false);
    } else if (defaultMessages?.submitAnswerAPI === apiType) {
      handleNextSection("loader");
    } else if (defaultMessages?.logoutApicall === apiType) {
      setLoaderStatus(false);
      setShowAlert(false);
      setReDirectLoading(true);
    }else{
      handleCloseAlert("");
    }
  };

  // UserLogout API integration
  const handleUserLogout = () => {
    const header = {
      Accept: "application/json",
      "user-id": userInfo?.id,
      "api-token": userInfo?.api_token,
    };
    const formData = new FormData();
    formData.append("user_id", userInfo?.id);
    dispatch(
      userLogoutAPI({
        dataList: formData,
        header: header,
        onSuccess: (response) => {
          setTimeout(() => {
            window.location.replace(
              `${window.origin + "/Student/dashboard/?" + encodeURLQuery}`
            );
            localStorage.removeItem("userInfo");
          }, 1000);
        },
        onFailure: (error) => {
          // console.log("error", error);
        },
      })
    );
  };

  return (
    <div className="help-dialog ">
      {showAlert && (
        <Modal
          className="prevent-select"
          show={showAlert}
          onHide={handleAlertModalAndData}
          backdrop="static"
          keyboard={true}
        >
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message === "Network Error"
              ? "Please connect to the internet."
              : message}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleAlertModalAndData()}>OK</Button>
          </Modal.Footer>
        </Modal>
      )}

      {reDirectLoading && (
        <AppLoader title={`${defaultMessages?.sessionTimeOut}`} />
      )}
    </div>
  );
};

export default CustomAlert;
