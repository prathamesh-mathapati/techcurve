import React from "react";
import { Form } from "react-bootstrap";
import "./style.scss";
const LChoiceMultipleChoiceTreeAsw = (props) => {
  const { questionsTo, interaction, options, questions } = props;
  // console.log(questions, "questions");
  return (
    <div className="lesting-table-fill-in-the-question">
      <p className="tablefillintheblanks-question-total">{questionsTo}</p>
      <Form>
        {questions.map((type, id) => (
          <div key={`default-checkbox`} className="mb-3">
            <p className="question-choose-titel">{type?.question}</p>
            {type?.options.map((Item, key) => (
              <Form.Check
                key={key + id}
                label={Item}
                name={`inline-checkbox`}
                type={"checkbox"}
                id={`$inline-checkbox-${key}${id}`}
                value={Item}
                //   onClick={() =>
                //     clearRadio(
                //       `${index + 1}-inline-${type}-${key}`,
                //       Item,
                //       questionsNo + index
                //     )
                //   }
              />
            ))}
          </div>
        ))}
      </Form>{" "}
    </div>
  );
};

export default LChoiceMultipleChoiceTreeAsw;
