import React from "react";
import "./style.scss";
import InfoIcon from "./../../assets/Image/info.png";
import { useLocation, useNavigate } from "react-router-dom";
const Instructions = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const userlocalInfo = localStorage.getItem("userlocalInfo");
  const nextFunction = () => {
    console.log(location?.state?.sectionType, "location?.state?.sectionType");
    if (location?.state?.sectionType === "Listening") {
      navigation("/ielts/ListeningSection", {
        state: {
          sectionType: "Reading",
          redirect: "no",
        },
      });
    } else if (location?.state?.sectionType === "Reading") {
      navigation("/ielts/ReadingSection", {
        state: {
          sectionType: "writing",
        },
      });
    } else if (location?.state?.sectionType === "writing") {
      navigation("/ielts/WritingSection", {
        state: {
          sectionType: "writing",
        },
      });
    }
  };
  return (
    <div className="instruction-main-wrapper">
      {location?.state?.sectionType === "Listening" ? (
        <div className="instruction-main-content">
          <div className="section-title">
            <h1>IELTS Listening</h1>
            <p>Time: Approximately 30 minutes</p>
          </div>
          <div className="instruction-candidate-wrap">
            <h2>INSTRUCTIONS TO CANDIDATES</h2>
            <ul>
              <li>
                Answer <b>all</b> the questions.
              </li>
              <li>You can change your answers at any time during the test.</li>
            </ul>
          </div>
          <div className="information-candidate-wrap">
            <h2>INFORMATION FOR CANDIDATES</h2>
            <ul>
              <li>There are 40 questions in this test.</li>
              <li>Each question carries one mark.</li>
              <li>There are four parts to the test.</li>
              <li>
                Please note you will only hear each part once in your actual
                test. However for familiarisation and practice purposes, this
                familiarisation test will allow you to listen to each recording
                multiple times.
              </li>
              <li>
                For each part of the test there will be time for you to look
                through the questions and time for you to check your answers.
              </li>
            </ul>
          </div>
          <div className="start-test-sec-wrap">
            <p>
              <img src={InfoIcon} />
              Do not click 'Start test' until you are told to do so.
            </p>
            <button className="start-test-btn" onClick={nextFunction}>
              {userlocalInfo ? "Next" : " Start test"}
            </button>
          </div>
        </div>
      ) : location?.state?.sectionType === "Reading" ? (
        <div className="instruction-main-content">
          <div className="section-title">
            <h1>IELTS Academic Reading</h1>
            <p>Time: 1 hour</p>
          </div>
          <div className="instruction-candidate-wrap">
            <h2>INSTRUCTIONS TO CANDIDATES</h2>
            <ul>
              <li>
                Answer <b>all</b> the questions.
              </li>
              <li>You can change your answers at any time during the test.</li>
            </ul>
          </div>
          <div className="information-candidate-wrap">
            <h2>INFORMATION FOR CANDIDATES</h2>
            <ul>
              <li>There are 40 questions in this test.</li>
              <li>Each question carries one mark.</li>
              <li>
                The test clock will show you when there are 10 minutes and 5
                minutes remaining..
              </li>
            </ul>
          </div>
          <div className="start-test-sec-wrap">
            <p>
              <img src={InfoIcon} />
              Do not click 'Start test' until you are told to do so.
            </p>
            <button className="start-test-btn" onClick={nextFunction}>
              {userlocalInfo ? "Next" : " Start test"}
            </button>
          </div>
        </div>
      ) : location?.state?.sectionType === "writing" ? (
        <div className="instruction-main-content">
          <div className="section-title">
            <h1>IELTS Academic Writing</h1>
            <p>Time: 1 hour</p>
          </div>
          <div className="instruction-candidate-wrap">
            <h2>INSTRUCTIONS TO CANDIDATES</h2>
            <ul>
              <li>Answer both parts.</li>
              <li>You can change your answers at any time during the test.</li>
            </ul>
          </div>
          <div className="information-candidate-wrap">
            <h2>INFORMATION FOR CANDIDATES</h2>
            <ul>
              <li>There are two parts in this test.</li>
              <li>
                Part 2 contributes twice as much as Part 1 to the writing score.
              </li>
              <li>
                The test clock will show you when there are 10 minutes and 5
                minutes remaining.
              </li>
            </ul>
          </div>
          <div className="start-test-sec-wrap">
            <p>
              <img src={InfoIcon} />
              Do not click 'Start test' until you are told to do so.
            </p>
            <button className="start-test-btn" onClick={nextFunction}>
              {userlocalInfo ? "Next" : " Start test"}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Instructions;
