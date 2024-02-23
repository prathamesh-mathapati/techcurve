import React from "react";
import "./style.scss";
import userIcon from "./../../assets/Image/userinfo.png";
import info from "./../../assets/Image/info.png";
import { useLocation, useNavigate } from "react-router-dom";
const InformationScreen = () => {
  const location = useLocation();
  const navigation = useNavigate();

  // user info
  const useInfo = JSON.parse(localStorage.getItem("userInfo"));
  const nextFunction = () => {
    navigation("/ielts/TestSound", location);
  };
  return (
    <div className="info-main-section">
      <div className="confirm-details-wrap">
        <div className="main-title">
          <h3>
            <img src={userIcon} alt="user" />
            Confirm your details
          </h3>
        </div>
        <div className="details-wrap">
          <ul>
            <li>Name: {useInfo?.name}</li>
            <li>Date of birth: {useInfo?.birthday}</li>
            <li>Candidate number: {useInfo?.candidateNo}</li>
          </ul>
          <p>
            <img src={info} alt="info" />
            If your details are not correct, please inform the invigilator.
          </p>
          <button className="correct-detail-btn" onClick={nextFunction}>
            My details are correct
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationScreen;
