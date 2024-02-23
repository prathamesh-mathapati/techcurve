import React from "react";
import "./style.scss";
import { Col, Form, Row } from "react-bootstrap";
const LFillInTheSelect = (props) => {
  const {
    selectedIndex,
    setSelectedIndex,

    questionsTo,
    questions,
    questionsNo,
  } = props;
  return (
    <>
      <div className="LFillInTheSelect-question-type">
        <div className="LFillInTheSelect-question">
          <p className="LFillInTheSelect-question-total">{questionsTo}</p>
          <p className="LFillInTheSelect-choose-titel">{questions?.heading}</p>
          <Row>
            <Col sm={12} md={6} lg={6} xl={6}>
              <img src={questions?.image} alt="none" />
            </Col>
            <Col sm={12} md={6} lg={6} xl={6}>
              <div className="opation-choose-waper">
                {questions?.questions?.map((Qitem, index) => {
                  return (
                    <p key={index} className="d-flex">
                      {index + questionsNo + 1 + "." + Qitem?.question}
                      <Form.Select
                        className={`${
                          selectedIndex === index + questionsNo + 1
                            ? "from-select-active"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedIndex(index + questionsNo + 1)
                        }
                      >
                        {Qitem?.options?.map((items) => {
                          return <option>{items}</option>;
                        })}
                      </Form.Select>
                    </p>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default LFillInTheSelect;
