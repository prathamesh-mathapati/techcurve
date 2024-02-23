import React from "react";
import "./style.scss";
import { Accordion, Form } from "react-bootstrap";

let doubleClicke = 0;
let selectedOptionAs = [];
const IdentifyInformationOptions = (props) => {
  const {
    selectedIndex,
    setSelectedIndex,
    interaction,
    options,
    questionsTo,
    questions,
    questionsNo,
  } = props;

  // uncheck Radio button
  const clearRadio = (id, item) => {
    selectedOptionAs.push(item);
    if (doubleClicke === 2 && selectedOptionAs.length !== 0) {
      let radio = document.getElementById(id);
      radio.checked = false;
      doubleClicke = 0;
    } else if (selectedOptionAs[selectedOptionAs.length - 2] === item) {
      doubleClicke++;
    }
  };
  React.useEffect(() => {
    selectedOptionAs = [];
  }, [selectedIndex]);

  React.useEffect(() => {});
  return (
    <div className="identify-information-options-question-type">
      <div className="identify-information-options-question">
        <p className="identify-information-question-total">{questionsTo}</p>
        <p className="quation-choose-titel">{interaction}</p>
        <Accordion
          activeKey={selectedIndex}
          onSelect={(e) => {
            setSelectedIndex(e);
          }}
        >
          {questions.map((item, index) => {
            return (
              <Accordion.Item eventKey={questionsNo + index}>
                <Accordion.Header>
                  {questionsNo + index} {item}
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        {options.map((questionsOption, key) => (
                          <div key={key} className="d-flex gap-3">
                            {questionsOption?.option}
                            <Form.Check
                              label={questionsOption?.questions}
                              name={`inline-${type}`}
                              type={type}
                              id={`${index + 1}-inline-${type}-${key}`}
                              value={questionsOption?.questions}
                              onClick={() =>
                                clearRadio(
                                  `${index + 1}-inline-${type}-${key}`,
                                  questionsOption?.questions
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default IdentifyInformationOptions;
