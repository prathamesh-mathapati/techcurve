import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import logo from "../../assets/Image/prep27-logo.png";
import { RiTimerLine } from "react-icons/ri";
import { AppContextApl } from "../../AppContextApl";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  const { handleNextSection } = props;
  const { contextState, setContextState, speakingpart, setSpakingPart } =
    React.useContext(AppContextApl);

  const userlocalInfo = JSON.parse(localStorage.getItem("userlocalInfo"));
  const Ref = useRef(null);
  const location = useLocation();

  // user info for local store
  const useInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [timerMin, setTimerMin] = useState("");
  const [pathName, setPathName] = useState(location?.pathname);
  const [logoPage, setLogoPage] = useState(logo);

  React.useEffect(() => {
    if (timerMin === "00:00:01") {
      handleNextSection("loader");
    }
    if (timerMin) {
      if (location?.pathname === "/ielts/ListeningSection") {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...useInfo, session_time: `L|${timerMin}` })
        );
      } else if (location?.pathname === "/ielts/ReadingSection") {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...useInfo, session_time: `R|${timerMin}` })
        );
      } else if (location?.pathname === "/ielts/WritingSection") {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...useInfo, session_time: `W|${timerMin}` })
        );
      }
    }
  }, [timerMin]);

  React.useEffect(() => {
    if (
      (useInfo?.testStatus === "P" || useInfo?.testStatus === "M") &&
      useInfo?.session_time
    ) {
      let timeArry = useInfo?.session_time.split("|");
      if (
        timeArry[0] === "L" &&
        location?.pathname === "/ielts/ListeningSection"
      ) {
        setTimerMin(timeArry[1]);
      } else if (
        timeArry[0] === "R" &&
        location?.pathname === "/ielts/ReadingSection"
      ) {
        setTimerMin(timeArry[1]);
      } else if (
        timeArry[0] === "W" &&
        location?.pathname === "/ielts/WritingSection"
      ) {
        setTimerMin(timeArry[1]);
      } else {
        if (location?.pathname === "/ielts/ListeningSection") {
          setTimerMin(contextState.listeningSectionTime.timeWithMin);
        } else if (location?.pathname === "/ielts/WritingSection") {
          setTimerMin(contextState.writingSectionTime.timeWithMin);
        } else if (location?.pathname === "/ielts/ReadingSection") {
          setTimerMin(contextState.readingSectionTime.timeWithMin);
        }
      }
    } else {
      if (location?.pathname === "/ielts/ListeningSection") {
        setTimerMin(contextState.listeningSectionTime.timeWithMin);
      } else if (location?.pathname === "/ielts/WritingSection") {
        setTimerMin(contextState.writingSectionTime.timeWithMin);
      } else if (location?.pathname === "/ielts/ReadingSection") {
        setTimerMin(contextState.readingSectionTime.timeWithMin);
        // } else if (
        //   location?.pathname === "/ielts/SpeakingSection" &&
        //   speakingpart === 1
        // ) {
        //   setTimerMin(contextState.speakingSection.part1);
        // } else if (
        //   location?.pathname === "/ielts/SpeakingSection" &&
        //   speakingpart === 2
        // ) {
        //   setTimerMin(contextState.speakingSection.part2);
        // } else if (
        //   location?.pathname === "/ielts/SpeakingSection" &&
        //   speakingpart === 3
        // ) {
        //   setTimerMin(contextState.speakingSection.part3);
      } else if (location?.pathname === "/ielts/SpeakingSection") {
        setTimerMin(contextState.speakingSectionTime.timeWithMin);
      }
    }
  }, [pathName]);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimerMin(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    let arryFortimerCut = timerMin.split(":");

    deadline.setHours(
      deadline.getHours() +
        (arryFortimerCut[0] === "00" ? 0 : Number(arryFortimerCut[0]))
    );
    deadline.setMinutes(
      deadline.getMinutes() +
        (arryFortimerCut[1] === "00" ? 0 : Number(arryFortimerCut[1]))
    );
    deadline.setSeconds(
      deadline.getSeconds() +
        (arryFortimerCut[2] === "00" ? 0 : Number(arryFortimerCut[2]))
    );

    return deadline;
  };

  React.useEffect(() => {
    clearTimer(getDeadTime());
  }, [timerMin]);

  // set logo logic
  useEffect(() => {
    // if(useInfo?.logo){
    //   setLogoPage(useInfo?.logo)
    // }else{
    //   setLogoPage(logo)
    // }
  }, []);
  return (
    <Container fluid>
      <Row className="main-header-wrap">
        <Col sm={12} md={4} lg={4} xl={4} className="header-left-side">
          {/* <img src={logoPage} alt="test logo" className="header-img-logo" /> */}
        </Col>
        <Col sm={12} md={4} lg={4} xl={4} className="header-center-side">
          <span className="timer-time-wrep">
            <RiTimerLine />
            <>
              <span className="timer-time-min-wrep">
                {timerMin.split(":")[1]} minutes left
              </span>
              <span className="timer-time-sec-wrep">
                {timerMin} minutes left
              </span>
            </>
          </span>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4} className="header-right-side">
          <Button onClick={() => handleNextSection("save_and_exit")}>
            Save & Exit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
