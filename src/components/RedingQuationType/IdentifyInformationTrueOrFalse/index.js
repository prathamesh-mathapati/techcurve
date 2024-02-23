import React from "react";
import "./style.scss";
import { Accordion, Form } from "react-bootstrap";

let doubleClicke = 0;
let selectedOptionAs = [];
const IdentifyInformationTrueOrFalse = (props) => {
  const {
    selectedIndex,
    setSelectedIndex,
    interaction,
    opations,
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

  const [activeKey, setActiveKey] = React.useState(1);
  React.useEffect(() => {
    selectedOptionAs = [];
    if (activeKey) {
      setSelectedIndex(activeKey);
    }
  }, [activeKey]);
  React.useEffect(() => {});
  return (
    <div className="identify-information-ture-false-question-type">
      <div className="identify-information-ture-false-question">
        <p className="identify-information-question-total">{questionsTo}</p>
        <p className="quation-choose-titel">{interaction}</p>
        <Accordion
          activeKey={activeKey ? selectedIndex : activeKey}
          onSelect={(e) => {
            setActiveKey(e);
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
                        {opations.map((Item, key) => (
                          <Form.Check
                            key={key}
                            label={Item}
                            name={`inline-${type}`}
                            type={type}
                            id={`${index + 1}-inline-${type}-${key}`}
                            value={Item}
                            onClick={() =>
                              clearRadio(
                                `${index + 1}-inline-${type}-${key}`,
                                Item
                              )
                            }
                          />
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

export default IdentifyInformationTrueOrFalse;
