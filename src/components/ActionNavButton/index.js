import React from "react";
import "./style.scss";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { RiTimerLine } from "react-icons/ri";
import { AppContextApl } from "../../AppContextApl";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SoundImg from "../../assets/Image/sound.png";

import closeIcon from "./../../assets/Image/close.png";

import HelpAlter from "../HelpAlter";
import { defaultMessages } from "../../utilities/messege";

const ActionNavButton = (props) => {
  const {
    setShowAlert,
    showAlert,
    setMessageAlert,
    handleNextSection,
    showQuationPart,
    selectedIndex,
    volumeHandel,
    audioVolume,
    format,
  } = props;

  const [showHelpAlter, setShowHelpAlter] = React.useState(false);
  const location = useLocation();

  // user info for local store
  const useInfo = JSON.parse(localStorage.getItem("userInfo"));

  const endTest = () => {
    setShowAlert(true);
    if (
      location?.pathname === "/ielts/WritingSection" ||
      useInfo?.type === "P"
    ) {
      setMessageAlert(defaultMessages?.testDoneMsg);
    } else {
      setMessageAlert(defaultMessages?.nextsectionMock);
    }
  };

  // font setting popup state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleChangestandard();
  }, []);

  // font class add fucntion
  const handleChangestandard = (event) => {
    document.body.classList.add("standard-font");
    document.body.classList.remove("Large-font");
    document.body.classList.remove("extra-large-font");
    var check = event?.target?.checked;
  };
  const handleChangeLarge = () => {
    document.body.classList.add("Large-font");
    document.body.classList.remove("standard-font");
    document.body.classList.remove("extra-large-font");
  };
  const handleChangeExtraLarge = () => {
    document.body.classList.add("extra-large-font");
    document.body.classList.remove("standard-font");
    document.body.classList.remove("Large-font");
  };
  return (
    <Container fluid className="main-header-time">
      <div>
        <Row>
          <Col sm={12} md={6} lg={6} xl={6}>
            <div className="profile-wrep">
              <span>
                <FaUserAlt /> {useInfo?.candidateNo}
              </span>
              <p>|</p>

              <div className="main-title-Questions">
                <h4>{showQuationPart} </h4>
                <p>
                  {location?.pathname === "/ielts/ListeningSection" &&
                    (selectedIndex <= 10
                      ? "(Listening  and answer Questions 1 - 10)"
                      : selectedIndex >= 11 && selectedIndex <= 20
                      ? "(Listening  and answer Questions 11 - 20)"
                      : selectedIndex >= 21 && selectedIndex <= 30
                      ? "(Listening  and answer Questions 21 - 30)"
                      : "(Listening  and answer Questions 31 - 40)")}

                  {location?.pathname === "/ielts/ReadingSection" &&
                    (selectedIndex <= Number(format[0])
                      ? `(Reading and answer Questions 1 - ${format[0]})`
                      : selectedIndex >= Number(format[0]) &&
                        selectedIndex <= Number(format[1]) + Number(format[0])
                      ? `(Reading and answer Questions ${format[0]} - ${
                          Number(format[1]) + Number(format[0])
                        })`
                      : `(Reading and answer Questions ${
                          Number(format[1]) + Number(format[2])
                        } - 40)`)}

                  {location?.pathname === "/ielts/WritingSection" &&
                    (selectedIndex <= 1
                      ? "(Writing and answer Questions 1 )"
                      : "(Writing and answer Questions 2)")}

                  {location?.pathname === "/ielts/SpeakingSection" &&
                    (selectedIndex === 1
                      ? "(Part1)"
                      : selectedIndex === 2
                      ? "(Part2)"
                      : "(Part3)")}
                </p>
              </div>
            </div>
          </Col>

          <Col sm={12} md={6} lg={6} xl={6}>
            <div className="timer-buttons">
              <Button onClick={handleShow}>Setting</Button>
              <Button onClick={() => setShowHelpAlter(true)}>Help</Button>
              <Button>Hide</Button>
              <Button onClick={() => endTest()}>End test</Button>
              {location?.pathname === "/ielts/ListeningSection" && (
                <div className="valume-handal-inside">
                  <img src={SoundImg} alt="Sound Img" />
                  <Form.Range
                    className=""
                    value={audioVolume}
                    onChange={(e) => volumeHandel(e.target.value)}
                  />
                </div>
              )}
            </div>
            {/* Setting module */}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              size="lg"
              keyboard={false}
              className="font-setting-wrap"
            >
              <Modal.Header closeButton>
                <Modal.Title className="modal-title-help">
                  <div className="title-wrap">
                    <p>Setting</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    className="close-btn"
                    onClick={() => handleClose()}
                  >
                    <img src={closeIcon} alt="close" />
                  </button>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="font-content">
                  <p>
                    if you wish, you can change this setting to make the test
                    easier to read.
                  </p>
                  <div className="radio-text">
                    <h3>Text Size</h3>
                  </div>
                  <Form>
                    <div className="mb-3">
                      <Form.Check
                        label="Standard"
                        name="group1"
                        type={"radio"}
                        id={`inline-1`}
                        onClick={(event) => handleChangestandard(event)}
                      />
                      <Form.Check
                        label="Large"
                        name="group1"
                        type={"radio"}
                        id={`inline-2`}
                        onClick={() => handleChangeLarge()}
                      />
                      <Form.Check
                        name="group1"
                        label="Extra Large"
                        type={"radio"}
                        id={`inline-3`}
                        onClick={() => handleChangeExtraLarge()}
                      />
                    </div>
                  </Form>
                </div>
                <button onClick={() => handleClose()} className="ok-btn">
                  Ok
                </button>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </div>
      {/* show help */}
      {showHelpAlter && <HelpAlter setShowHelpAlter={setShowHelpAlter} />}
    </Container>
  );
};

export default ActionNavButton;
