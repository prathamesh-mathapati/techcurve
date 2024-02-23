import React from "react";
import "./style.scss";
import { Col, Row, Form } from "react-bootstrap";

let score_Wri = 0;
let wordsLength = 0;
const Task2 = (props) => {
  const { Image, question, setUserAnswer, userAnswer, relevantWords } = props;

  const [text, setText] = React.useState("");
  const [updateState, setUpdateState] = React.useState(true);

  React.useEffect(() => {
    if (updateState && userAnswer?.userAnswer) {
      setText(userAnswer?.userAnswer);
      setUpdateState(false);

      wordsLength = userAnswer?.userAnswer?.split(" ")?.length;
    }
  }, [userAnswer]);
  const part_2 = () => {
    return {
      __html: question,
    };
  };

  const onHandelsChange = (e) => {
    let relWordCount = 0;
    let extraWords = (e?.target?.value.match(new RegExp("\n", "g")) || [])
      .length;
    let wordsArray = e?.target?.value.split(" ").filter(Boolean);
    wordsLength = wordsArray.length + extraWords;

    const perWordmark = 9 / relevantWords?.length;
    if (wordsLength > 1 && wordsLength <= 50) {
      score_Wri = 2;
    } else if (wordsLength > 50 && wordsLength <= 100) {
      score_Wri = 4;
    } else if (wordsLength > 100 && wordsLength <= 150) {
      score_Wri = 5;
    } else if (wordsLength > 150 && wordsLength <= 200) {
      score_Wri = 6;
    } else if (wordsLength > 200 && wordsLength <= 250) {
      score_Wri = 9;
    }

    relevantWords &&
      relevantWords.forEach((item) => {
        if (relWordCount !== relevantWords.length) {
          if (item.includes("|")) {
            item.split("|")?.forEach((element) => {
              if (
                e?.target?.value
                  .toLowerCase()
                  .includes(element.toLowerCase()) === true
              ) {
                relWordCount += perWordmark;
              }
            });
          } else {
            if (
              item.toLowerCase() &&
              e?.target?.value.toLowerCase().includes(item.toLowerCase()) ===
                true
            ) {
              relWordCount += perWordmark;
            }
          }
        }
      });

    setUserAnswer({
      score: score_Wri,
      userAnswer: e?.target?.value,
      task_achievement: (relWordCount * perWordmark).toFixed(),
    });
    setText(e?.target?.value);
  };

  return (
    <div className="writing-section-task-2">
      <h5 className="writing-section-question-titel">Question 2</h5>
      <Row>
        <Col sm={12} md={6} lg={6} xl={6}>
          <div dangerouslySetInnerHTML={part_2()}></div>
        </Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <p className="word-count">word count {wordsLength}</p>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                value={text}
                onChange={(e) => onHandelsChange(e)}
                spellcheck="false"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Task2;
