import React from "react";
import reactStringReplace from "react-string-replace";
import "./style.scss";

const LshortAnswer = (props) => {
  const {
    questionsTo,
    interaction,
    questionsNo,
    selectedIndex,
    setSelectedIndex,
    questions,
    subTitel,
    option,
  } = props;
  let count = 0;
  const handleInput = (index) => {
    setSelectedIndex(index + questionsNo);
  };
  return (
    <div className="listening-short-answer">
      <p className="listening-short-answer-total">{questions?.heading}</p>
      {questions?.questions.map((items, i) => {
        return (
          <div>
            <p className="quation-choose-titel">{items?.question}</p>
            <ul className="listening-short-answer-questions">
              {option?.map((optionItems, index) => {
                return (
                  <li key={optionItems + index + i}>
                    <p className="d-none">{count++}</p>
                    <input
                      placeholder={
                        count + questionsNo !== selectedIndex &&
                        count + questionsNo
                      }
                      onClick={(e) => handleInput(count)}
                      className={`${
                        count + questionsNo === selectedIndex && "active-input"
                      }`}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      {/* <h4 className="quation-choose-subtitel">{subTitel}</h4> */}
      <ul className="listening-short-answer-questions">
        {/* {questions.map((item, index) => {
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
        })} */}
      </ul>
    </div>
  );
};

export default LshortAnswer;
