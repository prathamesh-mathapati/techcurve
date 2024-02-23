import React from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import "./style.scss";

let doubleClicke = 0;
let selectedOptionAs = [];
let previousSelectedIndex = [];
const LChoiceMultipleChoiceOneAsw = (props) => {
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
    previousSelectedIndex = [];
  }, [selectedIndex]);
  return (
    <>
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
            {questions?.questions.map((item, index) => {
              return (
                <Accordion.Item eventKey={questionsNo + index}>
                  <Accordion.Header>
                    {questionsNo + index} {item?.question}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      {["radio"].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          {item?.options.map((questionsOption, key) => (
                            <>
                              <div key={key} className="d-flex gap-3">
                                <Form.Check
                                  label={questionsOption}
                                  name={`inline-${type}`}
                                  type={type}
                                  id={`${index + 1}-inline-${type}-${key}`}
                                  value={questionsOption}
                                  onClick={() =>
                                    clearRadio(
                                      `${index + 1}-inline-${type}-${key}`,
                                      questionsOption
                                    )
                                  }
                                />
                              </div>
                            </>
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

      {/* // <Row>
    //   <p className="l-choice-multiple-choiceone-interaction">{interaction}</p>
    //   {questions.map((item, index) => {
    //     return (
    //       <Col
    //         sm={12}
    //         lg={6}
    //         xl={6}
    //         md={6}
    //         className="l-choice-multiple-choiceone-asw"
    //         key={index}
    //       >
    //         <p className="l-choice-multiple-choiceone-asw-questions">
    //           {questionsNo + index} {item?.questions}
    //         </p>
    //         <Form>
    //           {["radio"].map((type) => (
    //             <div key={`default-${type}`} className="mb-3">
    //               {item?.options.map((Item, key) => (
    //                 <Form.Check
    //                   key={key}
    //                   label={Item}
    //                   name={`inline-${type}`}
    //                   type={type}
    //                   id={`${index + 1}-inline-${type}-${key}`}
    //                   value={Item}
    //                   onClick={() =>
    //                     clearRadio(
    //                       `${index + 1}-inline-${type}-${key}`,
    //                       Item,
    //                       questionsNo + index
    //                     )
    //                   }
    //                 />
    //               ))}
    //             </div>
    //           ))}
    //         </Form>
    //       </Col>
    //     );
    //   })}
    // </Row> */}
    </>
  );
};

export default LChoiceMultipleChoiceOneAsw;
