import React from "react";
import "./style.scss";
import Modal from "react-bootstrap/Modal";
import helpIcon from "./../../assets/Image/help.png";
import closeIcon from "./../../assets/Image/close.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import candidateIcon from "./../../assets/Image/username.png";
import clockIcon from "../../assets/Image/clock-timer.png";
import volumeImg from "../../assets/Image/volume.png";
import navImage from "../../assets/Image/navimage.png";
import nextImage from "../../assets/Image/next-question.png";
import backImage from "../../assets/Image/back-question.png";
import reviewImage from "../../assets/Image/review.png";
import navSmaller from "../../assets/Image/navsmaller.png";
import navBigger from "../../assets/Image/navbigger.png";
import HighImage from "../../assets/Image/highlightblue.png";
import underlineQues from "../../assets/Image/underlineques.png";
import reviewques from "../../assets/Image/cirlce-review-ques.png";
import notAnsweredImage from "../../assets/Image/not-answered.png";
import highlightpopup from "../../assets/Image/notes-popup.png";
import highlight from "../../assets/Image/highlight-image.png";
import notes from "../../assets/Image/notes-image.png";
import notesPopup from "../../assets/Image/notes-popup-image.png";
import selectText from "../../assets/Image/selected-text-image.png";
import selectPopup from "../../assets/Image/selected-text-popup.png";
import clearImage from "../../assets/Image/clear-image.png";
import clearallImage from "../../assets/Image/clear-all-image.png";
import listeningGapFill from "../../assets/Image/IELTS-Listening-GapFill.png";
import dragDropQuestion from "../../assets/Image/IELTS-Listening-DragDrop.png";
import dropedQuestion from "../../assets/Image/IELTS-Listening-DragDroped.png";
import multiChoice from "../../assets/Image/IELTS-Listening-Choice.png";
import multiChoiceQuestion from "../../assets/Image/multi-choice-question.png";
import matchingQuestion from "../../assets/Image/IELTS-Listening-TableMatch.png";

const HelpAlter = (props) => {
  const { setShowHelpAlter } = props;
  return (
    <div>
      <Modal
        // {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        className="help-dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="modal-title-help"
            id="contained-modal-title-vcenter"
          >
            <div className="title-wrap">
              <img src={helpIcon} alt="help" />
              <p>Help</p>
            </div>
            <button type="button" aria-label="Close" className="close-btn">
              <img
                src={closeIcon}
                alt="close"
                onClick={() => setShowHelpAlter(false)}
              />
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Information">
              <div className="info-container">
                <p>INSTRUCTIONS TO CANDIDATES</p>
                <ul>
                  <li>Answer all the questions.</li>
                  <li>
                    You can change your answers at any time during the test.
                  </li>
                </ul>
                <p>INFORMATION FOR CANDIDATES</p>
                <ul>
                  <li>There are 40 questions in this test.</li>
                  <li>Each question carries one mark.</li>
                  <li>There are four parts to the test.</li>
                  <li>
                    Please note you will only hear each part once in your actual
                    test. However for familiarisation and practice purposes,
                    this familiarisation test will allow you to listen to each
                    recording multiple times.
                  </li>
                  <li>
                    For each part of the test there will be time for you to look
                    through the questions and time for you to check your
                    answers.
                  </li>
                </ul>
                <button
                  className="ok-btn"
                  onClick={() => setShowHelpAlter(false)}
                >
                  Ok
                </button>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Test help">
              <div className="test-help-container">
                <h5 className="common-heading">
                  At the top of the screen you can see:
                </h5>
                <img src={candidateIcon} alt="username" />
                <p>Your name and candidate number.</p>
                <img src={clockIcon} alt="username" />
                <p>
                  A clock, which tells you how much time you have left. When you
                  hover over the time you can see the seconds.
                </p>
                <table className="icon-buttons-container">
                  <tr>
                    <td className="icon help">
                      <span>Help</span>
                    </td>
                    <td>Click to view the help.</td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <span>Settings</span>
                    </td>
                    <td>Click to change your screen settings.</td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <span>Hide</span>
                    </td>
                    <td>Click to hide the screen content temporarily.</td>
                  </tr>
                </table>
                <h5 className="common-heading">Volume</h5>
                <p>
                  If you want to change the volume of the Listening test, click
                  on the volume slider.
                </p>
                <img src={volumeImg} alt="volume" />
                <h5 className="common-heading">Navigation</h5>
                <p>
                  At the bottom of the screen you can see the navigation bar
                </p>
                <img src={navImage} alt="navigation" />
                <p>Click on a number to go to that question.</p>
                <table className="icon-buttons-container">
                  <tr>
                    <td className="icon">
                      <img src={nextImage} alt="next" />
                    </td>
                    <td>Click to go to the next question.</td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={backImage} alt="prevoius" />
                    </td>
                    <td>Click to go to the previous question.</td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={reviewImage} alt="review" />
                    </td>
                    <td>
                      Click if you want to look at this question again later.
                      The question number in the navigation bar will turn into a
                      circle.
                    </td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={navSmaller} alt="nav smaller" />
                    </td>
                    <td>Click to make the navigation smaller.</td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={navBigger} alt="nav bigger" />
                    </td>
                    <td>Click to make the navigation bigger.</td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={HighImage} alt="blue highlight" />
                    </td>
                    <td>
                      The blue highlighting shows the question you are looking
                      at.
                    </td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={underlineQues} alt="answered question" />
                    </td>
                    <td>
                      The underlining shows that you have answered this
                      question.
                    </td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={reviewques} alt="cirlce question" />
                    </td>
                    <td>
                      The circle shows that you want to look at this question
                      again (marked for review).
                    </td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={notAnsweredImage} alt="not answered" />
                    </td>
                    <td>
                      The black highlighting shows that you have not answered
                      the question.
                    </td>
                  </tr>
                </table>
                <h5 className="common-heading">Highlighting</h5>
                <p>To highlight something in the test:</p>
                <h5 className="common-heading">
                  Select the text you want to highlight using the mouse.{" "}
                </h5>
                <h5 className="common-heading">Right click over the text. </h5>
                <img src={highlightpopup} alt="popup" />
                <table className="icon-buttons-container">
                  <tr>
                    <td className="icon">
                      <img src={highlight} alt="highlight" />
                    </td>
                    <td>Click to highlight the text you have selected.</td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={notes} alt="notes" />
                    </td>
                    <td>
                      Click to highlight the text you have selected and to add
                      notes about what you have highlighted.
                    </td>
                  </tr>
                </table>
                <h5 className="common-heading">Notes</h5>
                <p>
                  To close the notes click on X in the top right. To view the
                  notes right-click on the highlighted text (anything you write
                  in Notes will be deleted at the end of the test).
                </p>
                <img src={notesPopup} alt="notes" />
                <p>
                  You can locate those areas of highlighted text containing
                  notes by hovering over each highlighted text. If a small
                  orange box appears the highlighted text contains notes.
                </p>
                <img src={selectText} alt="seleted text" />
                <p>
                  To clear your highlighting right click on the highlighted
                  text.
                </p>
                <img src={selectPopup} alt="select popup" />
                <table className="icon-buttons-container">
                  <tr>
                    <td className="icon">
                      <img src={clearImage} alt="clear" />
                    </td>
                    <td>
                      Click to clear the highlighting. This will also clear any
                      notes you have made.
                    </td>
                  </tr>
                  <tr>
                    <td className="icon">
                      <img src={clearallImage} alt="clear - all" />
                    </td>
                    <td>Click to clear all highlighting including notes.</td>
                  </tr>
                </table>
                <button
                  className="ok-btn"
                  onClick={() => setShowHelpAlter(false)}
                >
                  Ok
                </button>
              </div>
            </Tab>
            <Tab eventKey="contact" title="Task help">
              <div className="task-help-container">
                <p>
                  To choose a question either click on the question number at
                  the bottom of the screen or click on the question.
                </p>
                <h5 className="common-heading">Gap fill questions</h5>
                <p>
                  To answer some questions, you need to write words or numbers
                  in a gap. To answer these questions, click in the gap and
                  write your answer. Some questions may ask you to write your
                  answer in a table, flow-chart or diagram.
                </p>
                <img
                  style={{ width: "100%" }}
                  src={listeningGapFill}
                  alt="gap fill question"
                />
                <h5 className="common-heading">Drag and drop questions</h5>
                <p>To answer a question, click on the answer on the right</p>
                <img src={dragDropQuestion} alt="drag and drop question" />
                <p>and move it into the gap on the left.</p>
                <img src={dropedQuestion} alt="drag and drop question" />
                <p>
                  If you want to change your answer, move another answer into
                  the gap.
                </p>
                <p>
                  If you want to leave the question unanswered, move the answer
                  back.
                </p>
                <p>
                  Don't forget! You may need to scroll to see all the questions
                  and answers.
                </p>
                <h5 className="common-heading">Multiple choice questions</h5>
                <p>Click on the answer you think is right.</p>
                <p>If you change your mind, click on a different answer.</p>
                <p>
                  If you want to leave the question unanswered, click on your
                  answer again.
                </p>
                <img src={multiChoice} alt="multi choice question" />
                <h5 className="common-heading">
                  Multiple choice questions where there is more than one answer
                </h5>
                <p>
                  Some questions may ask you to choose two or three answers.
                  Make sure you read the instructions and questions carefully.
                </p>
                <img src={multiChoiceQuestion} alt="multi choice question" />
                <p>Click on the answers you think are right.</p>
                <p>If you change your mind, click on a different answer.</p>
                <p>
                  If you want to leave the question unanswered, click on your
                  answer again.
                </p>
                <h5 className="common-heading">
                  Matching questions using a table
                </h5>
                <p>
                  To choose a question, click on the question number in the
                  table. The row will become shaded.
                </p>
                <img
                  style={{ width: "100%" }}
                  src={matchingQuestion}
                  alt="matching question"
                />
                <p>
                  Choose the correct answer by clicking on the space in the
                  table. A tick will appear.
                </p>
                <p>
                  If you want to change your answer, click on another space.
                </p>
                <p>
                  If you want to leave the question unanswered, click on the
                  space again.
                </p>
                <p>
                  Sometimes you may choose an answer more than once. Make sure
                  you read the instructions and questions carefully.
                </p>
                <button
                  className="ok-btn"
                  onClick={() => setShowHelpAlter(false)}
                >
                  Ok
                </button>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HelpAlter;
