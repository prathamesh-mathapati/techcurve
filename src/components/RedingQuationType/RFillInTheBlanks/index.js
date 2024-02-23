import React from "react";
import reactStringReplace from "react-string-replace";
import { Form } from "react-bootstrap";
import "./style.scss";
const RFillInTheBlanks = (props) => {
  const {
    questionsTo,
    interaction,
    questionsNo,
    selectedIndex,
    setSelectedIndex,
    questions,
    subTitel,
  } = props;

  const handleInput = (index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="reding-fill-in-the-blanks">
      <p className="reding-fill-in-the-questions-total">{questionsTo}</p>
      <p className="quation-choose-titel">{interaction}</p>
      <h4 className="quation-choose-subtitel">{subTitel}</h4>
      <ul className="reding-fill-in-the-questions">
        {questions.map((item, index) => {
          return (
            <li key={index}>
              {reactStringReplace(item, "#DD#", (match, i) => (
                <input
                  placeholder={
                    questionsNo + index !== selectedIndex && questionsNo + index
                  }
                  onClick={(e) => handleInput(questionsNo + index)}
                  className={`${
                    questionsNo + index === selectedIndex && "active-input"
                  }`}
                />
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RFillInTheBlanks;
