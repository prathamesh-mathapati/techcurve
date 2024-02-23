import React from "react";
import "./style.scss";
import reactStringReplace from "react-string-replace";

const LfillInTheBlnaks = (props) => {
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
    <div className="listening-fill-in-the-blanks">
      <p className="listening-fill-in-the-questions-total">{questionsTo}</p>
      <p className="quation-choose-titel">{interaction}</p>
      <h4 className="quation-choose-subtitel">{questions?.heading}</h4>
      <ul className="listening-fill-in-the-questions">
        {questions?.questions[0]?.question.map((item, index) => {
          return (
            <li key={index}>
              {"- "}
              {reactStringReplace(item, "#ANS", (match, i) => (
                <>
                  <input
                    placeholder={
                      questionsNo + index !== selectedIndex &&
                      questionsNo + index
                    }
                    onClick={(e) => handleInput(questionsNo + index)}
                    className={`${
                      questionsNo + index === selectedIndex && "active-input"
                    }`}
                  />
                </>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LfillInTheBlnaks;
