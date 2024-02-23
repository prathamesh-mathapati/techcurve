import React, { useState, useRef, useEffect } from "react";
import { ReactMic } from "react-mic";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "react-bootstrap/Button";
import Header from "../../Header";
import "./style.scss";
import CustomAlert from "../../Alert";
import Q0 from "../../../assets/Video/Intro.mp4";
import Q1 from "../../../assets/Video/Place.mp4";
import Q2 from "../../../assets/Video/Do you work or study.mp4";
import { defaultMessages } from "../../../utilities/messege";
import Q3 from "../../../assets/Video/robots/1.mp4";
import Q4 from "../../../assets/Video/robots/2.mp4";
import Q5 from "../../../assets/Video/robots/3.mp4";
import Q6 from "../../../assets/Video/robots/4.mp4";
import Q7 from "../../../assets/Video/clothes/5.mp4";
import Q8 from "../../../assets/Video/clothes/6.mp4";
import Q9 from "../../../assets/Video/clothes/7.mp4";
import Q10 from "../../../assets/Video/clothes/8.mp4";
import P1 from "../../../assets/Video/Home_accomodation/1.mp4";
import P2 from "../../../assets/Video/Home_accomodation/2.mp4";
import P3 from "../../../assets/Video/Home_accomodation/3.mp4";
import P4 from "../../../assets/Video/Home_accomodation/4.mp4";
import P5 from "../../../assets/Video/Home_accomodation/5.mp4";
import P6 from "../../../assets/Video/Home_accomodation/6.mp4";
import P7 from "../../../assets/Video/Home_accomodation/7.mp4";
import P8 from "../../../assets/Video/Home_accomodation/8.mp4";
import P9 from "../../../assets/Video/Home_accomodation/9.mp4";
import P10 from "../../../assets/Video/Home_accomodation/10.mp4";
import tubble from '../../../assets/Image/Screenshot from 2024-02-23 01-36-21.png'
import ReactPlayer from "react-player";

const Task1 = ({ setHighlightedPart }) => {
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let mic = new SpeechRecognition();

  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = "en-US";

  const topic_arr = [
    {
      video: P1,
    },
    {
      video: P2,
    },
    {
      video: P3,
    },
    {
      video: P4,
    },
    {
      video: P5,
    },
    {
      video: P6,
    },
    {
      video: P7,
    },
    {
      video: P8,
    },
    {
      video: P9,
    },
    {
      video: P10,
    },
  ];
  const combined_arr = [
    {
      video: Q2,
    },
    {
      video: Q3,
    },
    {
      video: Q4,
    },
    {
      video: Q5,
    },
    {
      video: Q6,
    },
    {
      video: Q7,
    },
    {
      video: Q8,
    },
    {
      video: Q9,
    },
    {
      video: Q10,
    },
  ];
  const intro_arr = [
    {
      video: Q0,
    },
    {
      video: Q1,
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

  let arr = [...intro_arr, ...topic_arr, ...combined_arr];

  const [micOnOffStatus, setMicOnOffStatus] = React.useState(false);
  let transcription = "";
  let progressInterval;

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
        // console.log(transcription, "transcription");

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
        // console.log("Stopped Mic on Click");
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
    // console.log("resetSpeechDetectionTimer");
    setShowAlert(false);

    if (currentVideoIndexRef.current < arr.length - 1) {
      startRecording();
      setFlag(false);
    }
  };
  //reset recording
  const stopRecording = () => {
    // console.log("recording stop");
    clearInterval(progressInterval);
    setRecord(false);
    setProgress(0);
    setTimeLeft(0);
    timeLeftForAinext = 0;
    // if (timeLeftForAinext >= 60 || time >= 10) {
    //   pauseArray.push({
    //     time: timeLeftForAinext,
    //     transcript: transcription,
    //     indexOfVideo: currentVideoIndexRef.current,
    //   });
    //   localStorage.setItem("pauseArray", pauseArray);
    // }
  };
  //for recording start
  const startRecording = () => {
    // console.log("recording start");
    setRecord(true);
    initializeSpeechRecognition();
    startCircularProgress();
  };
  //for circular progressbar
  const startCircularProgress = () => {
    progressInterval = setInterval(() => {
      time += 1; //for transcript
      setTimeLeft((prevTimeLeft) => prevTimeLeft + 1); //for formatting time
      timeLeftForAinext += 1; //for starting time
      setProgress((prevProgress) => prevProgress + (1 / 60) * 100); // for circular
      // console.log(timeLeftForAinext, "trans", time);

      if (timeLeftForAinext === 4 && transcription === "") {
        // console.log("1");
        setShowAlert(true);
        stopRecording();
        setRecord(false);
      }
      if (timeLeftForAinext >= 60) {
        // console.log("2");
        handleVideoStart();
      }
      if (time >= 5) {
        // console.log("3");
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
    // console.log("video start");
    setFlag(true);
    stopRecording();

    if (currentVideoIndexRef.current < arr.length - 1) {
      setTimeout(()=>{
        currentVideoIndexRef.current += 1;
      },2000)

      const nextVideoSrc = arr[currentVideoIndexRef.current].video;
      if (videoRef.current) {
        videoRef.current.src = nextVideoSrc;
        videoRef.current.load();
        let playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {})
            .catch((error) => {
              // console.log("hello", error);
            });
        }
      }
    }
    if (currentVideoIndexRef.current === arr.length - 1) {
      setHighlightedPart(2);
    }
  };
  //for stop video
  const handleVideoEnd = () => {
    // console.log("video end");
    if (currentVideoIndexRef.current < arr.length - 1) {
      startRecording();
      setFlag(false);
    }
  };

  const handandleLoder=()=>{
    // if (currentVideoIndexRef.current < arr.length - 1) {
    //   console.log("llll")
    // }
    
  }
  console.log(videoRef.current);
  return (
    <>
      <div className="main-speaking-section-task1">
        <h4 className="main-header"> Introduction and Interview</h4>
        <CustomAlert
          showAlert={showAlert}
          handleCloseAlert={resetSpeechDetectionTimer}
          title={defaultMessages.queTimeOutTitle}
          status={defaultMessages.queTimeOutStatus}
          message={defaultMessages.questionTimeOut}
          setResponseForSubmitLoading={""}
        />
        {arr[currentVideoIndexRef.current].video && (
          <video
            className="video"
            ref={videoRef}
            onEnded={handleVideoEnd}
            autoPlay
            controls
            muted={false}
            style={{transition: 'all 0.6s ease-in-out;'}}
            onLoad={handandleLoder}
            poster={tubble}

          >
            <source
              style={{transition: 'all 0.6s ease;'}}
              src={arr[currentVideoIndexRef.current].video}
              type="video/mp4"
            />
          </video>
        )}

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
      </div>
    </>
  );
};

export default Task1;



