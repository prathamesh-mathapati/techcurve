import React, { useState, useRef, useEffect } from "react";
import { ReactMic } from "react-mic";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "react-bootstrap/Button";
import "./style.scss";
import CustomAlert from "../../Alert";
import Q0 from "../../../assets/Video/Examiners' intro.mp4";
import { defaultMessages } from "../../../utilities/messege";
import { Col, Row } from "react-bootstrap";

const Task2 = ({ setHighlightedPart }) => {
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let mic = new SpeechRecognition();

  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = "en-US";

  const queue_arr = [
    {
      video: Q0,
    },
  ];
  let timeLeftForAinext = 0;
  let time = 0;

  const videoRef = useRef(null);
  const currentVideoIndexRef = useRef(0);
  const [record, setRecord] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [flag, setFlag] = useState(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [pauseArray, setPauseArray] = useState([]);
  const [tiktik, setTiktik] = useState(10);
  let timeTiktik = 10;
  let arr = [...queue_arr];

  const [micOnOffStatus, setMicOnOffStatus] = React.useState(false);
  let transcription = "";
  let progressInterval;
  let interval;

  const initializeSpeechRecognition = () => {
    if (!record) {
      mic.start();
      mic.onstart = () => {
        // console.log('Mics on');
      };
      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        transcription = transcript;
        pauseArray.push(transcript);
        console.log(transcription, "transcription");

        time = 0;

        mic.onerror = (event) => {
          let audioToTextString = pauseArray && pauseArray.join(" ");
          if (
            audioToTextString &&
            audioToTextString.includes("network error") === false
          ) {
            pauseArray.push(`${event.error} error`);
          }
        };
      };
      mic.onend = () => {
        // console.log('continue..');
        // mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
        mic.stop();
        setMicOnOffStatus(false);
      };
    }
  };
  // Checking mic stop status and transcript is complete
  React.useEffect(() => {
    if (micOnOffStatus === false) {
      // Get user speech to text
      let audioToTextString = pauseArray && pauseArray.join(" ");
      pauseArray &&
        pauseArray.forEach((item, index) => {
          if (
            audioToTextString &&
            audioToTextString.includes("network error") === true
          ) {
            let getIndex = pauseArray && pauseArray.indexOf("network error");
            if (pauseArray && pauseArray?.length - 1 > getIndex) {
              transcription =
                pauseArray[getIndex - 1] +
                " " +
                pauseArray[getIndex] +
                " " +
                pauseArray[getIndex + 1];
            } else {
              transcription =
                pauseArray[getIndex - 1] + " " + pauseArray[getIndex];
            }
          } else {
            // let newString = "";

            transcription = pauseArray[pauseArray.length - 1];
          }
        });
    }
  }, [micOnOffStatus]);
  // if speech not detected
  const resetSpeechDetectionTimer = () => {
    console.log("resetSpeechDetectionTimer");
    setShowAlert(false);

    if (currentVideoIndexRef.current < arr.length - 1) {
      startRecording();
      setFlag(false);
    }
  };
  //reset recording
  const stopRecording = () => {
    console.log("recording stop");
    clearInterval(progressInterval);
    setRecord(false);
    setProgress(0);
    setTimeLeft(0);
    timeLeftForAinext = 0;
  };
  //for recording start
  const startRecording = () => {
    if(tiktik === 0)
    {
      setTiktik(0)
      // clearInterval(interval);
    }
    console.log("recording start");
    setTiktik(0)
    clearInterval(interval);
    setRecord(true);
    initializeSpeechRecognition();
    startCircularProgress();
  };
  //for circular progressbar
  const startCircularProgress = () => {
    console.log("circular progress start");
    progressInterval = setInterval(() => {
      time += 1; //for transcript
      setTimeLeft((prevTimeLeft) => prevTimeLeft + 1); //for formatting time
      timeLeftForAinext += 1; //for starting time
      setProgress((prevProgress) => prevProgress + (1 / 60) * 100); // for circular
      console.log(timeLeftForAinext, "trans", time);

      if (timeLeftForAinext === 4 && transcription === "") {
        console.log("1");
        setShowAlert(true);
        stopRecording();
        setRecord(false);
      }
      if (timeLeftForAinext >= 60) {
        console.log("2");
        handleVideoStart();
      }
      if (time >= 5) {
        console.log("3");
        handleVideoStart();
      }
    }, 1000);
  };
  //for time-format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  //for playing video
  const handleVideoStart = () => {
    console.log("video start");
    setFlag(true);
    stopRecording();

    if (currentVideoIndexRef.current < arr.length - 1) {
      currentVideoIndexRef.current += 1;
      const nextVideoSrc = arr[currentVideoIndexRef.current].video;
      if (videoRef.current) {
        videoRef.current.src = nextVideoSrc;
        videoRef.current.load();
        let playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {})
            .catch((error) => {
              console.log("hello", error);
            });
        }
      }
    }
    if (currentVideoIndexRef.current === arr.length - 1) {
      setHighlightedPart(2);
    }
  };
  console.log(timeTiktik,'tiktik',tiktik)
  //for stop video
  const handleVideoEnd = () => {
    console.log(timeTiktik, "timeTiktik");
    if (currentVideoIndexRef.current <= arr.length - 1) {
      interval = setInterval(() => {
        timeTiktik -= 1;
        setTiktik((prev) => prev - 1);

        if (timeTiktik === 0) {
          setTiktik(0);
          startRecording();
          setFlag(false);
        }
      }, 1000);
    }
  };

  return (
    <>
      <div className="main-speaking-section-task2">
        <h4 className="main-header">Topic</h4>
        <CustomAlert
          showAlert={showAlert}
          handleCloseAlert={resetSpeechDetectionTimer}
          title={defaultMessages.queTimeOutTitle}
          status={defaultMessages.queTimeOutStatus}
          message={defaultMessages.questionTimeOut}
          setResponseForSubmitLoading={""}
        />
        <div className="main-grid">
          <Row>
            <Col>
              <video
                ref={videoRef}
                onEnded={handleVideoEnd}
                width="80%"
                height="100%"
                autoPlay
                controls
                muted={false}
              >
                <source
                  src={arr[currentVideoIndexRef.current].video}
                  type="video/mp4"
                />
              </video>
            </Col>
            <Col>
              <p>hello</p>
              <p>hello</p>
              <p>hello</p>
              <p>hello</p>
            </Col>
          </Row>
        </div>

        <div style={{ textAlign: "center" }} className="react-mic-main">
          <ReactMic
            visualSetting="sinewave"
            record={record}
            className="sound-wave react-mic"
            strokeColor="#000000"
          />
          <div className="circular-img-container">
            <CircularProgressbar
              value={progress}
              strokeWidth={3}
              className="circular-progress-container"
              styles={{
                textSize: "10px",
                pathColor: `rgba(62, 152, 199, ${progress / 100})`,
                textColor: "#f88",
                backgroundColor: "white",
              }}
            />
            <svg
              alt="Record"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
              }}
              xmlns="http://www.w3.org/2000/svg"
              height="6"
              width="9"
              viewBox="0 0 384 512"
              fill="blue"
            >
              <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" />
            </svg>
          </div>
        </div>
        <p>{formatTime(timeLeft)}</p>
        {/* <p>
          0{progress >= 100 ? 1 : 0}:{progress >= 10 ? null : 0}
          {progress >= 100 ? "00" : progress}
        </p> */}
        <Button variant="outline-primary" onClick={startRecording}>Time to think {tiktik}s</Button>
      </div>
    </>
  );
};

export default Task2;
