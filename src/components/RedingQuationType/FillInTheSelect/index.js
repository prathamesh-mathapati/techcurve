import React from "react";
import "./style.scss";
import { Form, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
const FillInTheSelect = (props) => {
  const {
    selectedIndex,
    setSelectedIndex,
    interaction,
    opations,
    questionsTo,
    questions,
    questionsNo,
  } = props;

  return (
    <div className="FillInTheSelect-question-type">
      <div className="FillInTheSelect-question">
        <p className="FillInTheSelect-question-total">{questionsTo}</p>
        <p className="FillInTheSelect-choose-titel">{interaction}</p>
        <div className="opation-choose-waper">
          {questions.map((item, index) => {
            return (
              <p key={index} className="d-flex">
                {index + questionsNo + 1 + "." + item}
                <Form.Select
                  className={`${
                    selectedIndex === index + questionsNo + 1
                      ? "from-select-active"
                      : ""
                  }`}
                  onClick={() => setSelectedIndex(index + questionsNo + 1)}
                >
                  {opations.map((items) => {
                    return <option>{items}</option>;
                  })}
                </Form.Select>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FillInTheSelect;
