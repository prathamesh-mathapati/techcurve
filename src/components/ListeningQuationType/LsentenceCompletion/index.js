import React from "react";
import "./style.scss";
import { Form } from "react-bootstrap";
const LsentenceCompletion = () => {
  return (
    <div className="sentesnce-blank-wrap">
      <div className="answer-main-wrap"></div>
      <div className="question-container">
        <span>
          {/* {reactStringReplace(currquestion, "#DD#", (match, i) => (
            <Form.Group key={i} className="question-container-wrap">
              <Form.Control
                type="text"
                className="question-container-value"
                key={i}
                onChange={(e) => setUserAnswer(e.target.value)}
                spellCheck="false"
                autoComplete="off"
              />
            </Form.Group>
          ))} */}
          Lorem
          <Form.Group className="question-container-wrap">
            <Form.Control
              type="text"
              className="question-container-value"
              spellCheck="false"
              autoComplete="off"
            />
          </Form.Group>
          dolor sit amet, consectetur adipiscing elit.
        </span>
      </div>
    </div>
  );
};

export default LsentenceCompletion;
