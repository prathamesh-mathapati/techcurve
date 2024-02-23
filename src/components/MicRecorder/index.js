import React from "react";
import MicrophoneCheck from "./MicrophoneCheck";
import SoundCheck from "./SoundCheck";
import WaitingRoom from "./WaitingRoom";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
// import SyncLoader from "react-spinners/SyncLoader";

const MicRecorder = () => {
  const navigation = useNavigate();
  const handleClick = () => {
    navigation("/ielts/SpeakingSection", {
      state: true,
    });
  };

  return (
    <div className="mic-sound-section">
      <div className="main-sound-section">
        <SoundCheck className="sound-check" />

        <MicrophoneCheck className="microphone-check" />

        <WaitingRoom />
      </div>
    </div>
  );
};

export default MicRecorder;
