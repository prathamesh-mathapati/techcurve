import React, { useState, useRef, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import Sound from "./../../../assets/Image/testIcon.png";
import "./style.scss";

let startTime = 0;

const MicrophoneCheck = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioLength, setAudioLength] = React.useState(0);

  const handleRecordStartStop = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };
  /** Start Recording **/
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream); //using mediarecorder api & web audio api

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const blob = new Blob([event.data], { type: "audio/wav" });
          setAudioBlob(blob);
          const audioUrl = URL.createObjectURL(blob);
          setAudioUrl(audioUrl);
        }
      };
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      let globalAudio = document.getElementById("globalRecord");
      let length = globalAudio.duration;
      // setAudioLength(Math.round(length));
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  /** Stop Recording **/
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      clearInterval(startTime);
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  /** Start Audio Code **/
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const handlePlayPause = () => {
  
      if (isPlaying) {
        handlePause();
      } else {
        handlePlay();
      }
   
  };
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };
  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }
  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
  }, []);
  /**Exit Audio Code */

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <img src={Sound} alt="user" /> Microphone Check
        </Card.Title>
        <Card.Text>
          <h6>
            Put on your microphone and click on the <b> Play sound </b>
            button to play a sample sound.
          </h6>
          <Row>
            <div className="mic-main-wrap">
              <div className="progress-wrap">
                <svg
                  className="audio-img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  variant={isRecording ? "danger" : "success"}
                  onClick={handleRecordStartStop}
                >
                  {!isRecording ? (
                    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 224a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                  ) : (
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
                  )}
                </svg>
                <svg
                  className="audio-img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  onClick={handlePlayPause}
                >
                  {!isPlaying ? (
                    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
                  ) : (
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
                  )}
                </svg>
                <input
                  type="range"
                  style={{ width: "82%" }}
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                />
                <audio ref={audioRef} src={audioUrl} />
                <div className="track-duration">
                  <div> -{formatDuration(duration - currentTime)}</div>
                </div>
              </div>
            </div>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MicrophoneCheck;
