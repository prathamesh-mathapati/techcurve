import React, { useEffect } from "react";
import "./style.scss";
import infoRed from "./../../assets/Image/info-red.png";
import Sound from "./../../assets/Image/testIcon.png";
import { useLocation, useNavigate } from "react-router-dom";

const InformationScreen = () => {
  const Ref = React.useRef(null);
  const location = useLocation();
  const navigation = useNavigate();

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (userInfo?.sectionType === "R" || userInfo?.sectionType === "W")
      nextFunction();
  }, []);

  const nextFunction = () => {
    navigation("/ielts/Instructions", location);
  };

  const playFunction = () => {
    Ref.current.play();
  };
  return (
    <div className="test-sound-section">
      <audio
      controls
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        ref={Ref}
      />
      <div className="main-sound-section">
        <div className="main-title">
          <h3>
            <img src={Sound} alt="user" />
            Test sound
          </h3>
        </div>
        <div className="details-wrap">
          <h6>
            Put on your headphones and click on the <span> Play sound</span>{" "}
            button to play a sample sound.
          </h6>
          <button className="play-sound-btn" onClick={playFunction}>
            Play Sound
          </button>
          <p>
            <img src={infoRed} alt="info" />
            If you cannot hear the sound clearly, please tell the invigilator.
          </p>
          <button className="continue-btn" onClick={nextFunction}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationScreen;
