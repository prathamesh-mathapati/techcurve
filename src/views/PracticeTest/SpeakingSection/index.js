import React, { useState } from "react";
import Task1 from "../../../components/SpeakingQuestionType/Task1";
import Task2 from "../../../components/SpeakingQuestionType/Task2";
import Task3 from "../../../components/SpeakingQuestionType/Task3";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContextApl } from "../../../AppContextApl";
import Header from "../../../components/Header";
import ActionNavButton from "../../../components/ActionNavButton";
import Button from "react-bootstrap/Button";

export default function SpeakingSection() {
  const navigation = useNavigate();
  const { setSpakingPart } = React.useContext(AppContextApl);
  const [highlightedPart, setHighlightedPart] = useState(1);
  const location = useLocation();
  const [flag, setFlag] = useState(true);

  const handleHighlight = (part) => {
    setHighlightedPart(part);
    setSpakingPart(part);
  };
  const renderCurrentPartComponent = () => {
    switch (highlightedPart) {
      case 1:
        // return <Task2 setHighlightedPart={setHighlightedPart} />;
        return <Task1 setHighlightedPart={setHighlightedPart} />;
      case 2:
        return <Task2 setHighlightedPart={setHighlightedPart} />;
      case 3:
        return <Task3 />;
      default:
        return null;
    }
  };
  const handleNextSection = () => {
    // navigation("/ielts/")
  };

  return (
    <>
      <Header handleNextSection={handleNextSection} />
      <ActionNavButton
        selectedIndex={highlightedPart}
        // setShowAlert={setShowAlert}
        // showAlert={showAlert}
        // setMessageAlert={setMessageAlert}
        // handleNextSection={handleNextSection}
        // showQuationPart={showQuationPart}
        // selectedIndex={selectedIndex}
        // format={
        //   questionData.length !== 0 &&
        //   questionData?.reading?.format &&
        //   JSON.parse(
        //     questionData?.reading?.format && questionData?.reading?.format
        //   )
        // }
      />
      <div className="main-speaking-section">
        {renderCurrentPartComponent()}
        <div className="main-part-container">
          <div className="main-part-section">
            <Button
              disabled={flag}
              className={`part ${highlightedPart === 1 ? "highlighted" : ""}`}
              onClick={() => handleHighlight(1)}
              variant={`part ${
                highlightedPart === 1 ? "outline-dark" : ""
              }`}
            >
              Part 1
            </Button>
            <Button
              disabled={flag}
              className={`part ${highlightedPart === 2 ? "highlighted" : ""}`}
              onClick={() => handleHighlight(2)}
              variant={`part ${
                highlightedPart === 2 ? "outline-dark" : ""
              }`}
            >
              Part 2
            </Button>
            <Button
              disabled={flag}
              className={`part ${highlightedPart === 3 ? "highlighted" : ""}`}
              onClick={() => handleHighlight(3)}
              variant={`part ${
                highlightedPart === 3 ? "outline-dark" : ""
              }`}
            >
              Part 3
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
