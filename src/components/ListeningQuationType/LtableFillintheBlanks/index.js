import React from "react";
import "./style.scss";
import { Table } from "react-bootstrap";
import reactStringReplace from "react-string-replace";

// let questionsObj = [];
const LtableFillintheBlanks = (props) => {
  const {
    selectedIndex,
    interaction,
    questionsTo,
    questions,
    questionsNo,
    setSelectedIndex,
  } = props;

  let count = 0;
  const [questionsObj, setQuestionsObj] = React.useState([]);
  const [questionsHeding, setQuestionsHeding] = React.useState([]);
  const [data, setData] = React.useState(
    '<table class="table"><tr><td class="heding-table">Place:</td><td>in the hall</td></tr><tr><td class="heding-table">Time:</td><td>at <p class="d-none">0</p><input placeholder="1" class="table-input">1# pm on Tuesdays</td></tr><tr><td class="heding-table">Carried items</td><td>Water jar set of <p class="d-none">1</p><input placeholder="2" class="false">2#</td></tr><tr><td class="heding-table">Cost:</td><td>45 dollers for 4 classes</td></tr></table><table class="table"><tr><td class="heding-table">Place:</td><td>in the hall</td></tr><tr><td class="heding-table">Time:</td><td>at <p class="d-none">0</p><input placeholder="1" class="table-input">1# pm on Tuesdays</td></tr><tr><td class="heding-table">Carried items</td><td>Water jar set of <p class="d-none">1</p><input placeholder="2" class="false">2#</td></tr><tr><td class="heding-table">Cost:</td><td>45 dollers for 4 classes</td></tr></table>'
  );
  React.useEffect(() => {
    questions?.questions.forEach((element) => {
      if (!Array.isArray(element?.question)) {
        let newOject = {
          heading: element?.heading,
          question: Object.entries(element?.question),
        };
        questionsHeding.push(element?.heading);
        setQuestionsHeding(questionsHeding);
        questionsObj.push(newOject);
        setQuestionsObj(questionsObj);
      }
    });
    let newArry = questionsObj.slice(0, 3);

    let newArry2 = questionsHeding.slice(0, 3);
    setQuestionsHeding(newArry2);
    setQuestionsObj(newArry);
  }, [questions]);

  const handleInput = (index, status) => {
    console.log(index);
    if (status) {
    } else {
      setSelectedIndex(index + 1);
    }
  };

  function createMarkup() {
    return { __html: data };
  }
  return (
    <div className="lesting-tablefillintheblanks-question-type">
      <p className="tablefillintheblanks-question-total">
        {questions?.heading}
      </p>
      {questions?.questions.map((items, index) => {
        return (
          <div key={index}>
            {!Array.isArray(items?.question) && (
              <>
                {questionsObj.map((queObj, index) => {
                  return (
                    <Table key={index}>
                      {/* <tbody>
                        <th className="heding-table">{queObj?.heading}</th>
                      </tbody> */}
                      {/* {console.log(index, "queObjqueObj")}
                      <tr>
                        <td className="heding-table">
                          {queObj.question[index][0]}
                        </td>
                        <td>
                          {reactStringReplace(
                            queObj.question[index][1],
                            "#ANS",
                            (match, ibn) => (
                              <>
                                <p className="d-none">{count++}</p>
                                <input
                                  placeholder={questionsNo + count}
                                  onClick={(e) => handleInput(index, true)}
                                  className={`${
                                    questionsNo + count === selectedIndex &&
                                    "table-input"
                                  }`}
                                />
                              </>
                            )
                          )}
                        </td>
                      </tr> */}
                      {/* {queObj?.question.map((i, oo) => {
                        return (
                          <>
                          

                            <tr key={i}>
                              <td className="heding-table">{i[0]}</td>
                              <td>
                                {reactStringReplace(
                                  i[1],
                                  "#ANS",
                                  (match, ibn) => (
                                    <>
                                      <p className="d-none">{count++}</p>
                                      <input
                                        placeholder={questionsNo + count}
                                        onClick={(e) => handleInput(oo, true)}
                                        className={`${
                                          questionsNo + count ===
                                            selectedIndex && "table-input"
                                        }`}
                                      />
                                    </>
                                  )
                                )}
                              </td>
                            </tr>
                          </>
                        );
                      })} */}
                    </Table>
                  );
                })}

                {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}
              </>
            )}

            {Array.isArray(items?.question) && (
              <Table>
                <tbody>
                  <th>{items?.heading}</th>
                </tbody>
                {items?.question.map((nexQuestion, ind) => {
                  return (
                    <tr>
                      {reactStringReplace(nexQuestion, "#ANS", (i) => (
                        <>
                          <p className="d-none">{count++}</p>
                          <input
                            placeholder={questionsNo + count}
                            onClick={(e) =>
                              handleInput(ind + questionsNo, false)
                            }
                            className={`${
                              questionsNo + count === selectedIndex &&
                              "table-input"
                            }`}
                          />
                        </>
                      ))}
                    </tr>
                  );
                })}
                {/* <td>
                    {reactStringReplace(items?.question, "#ANS", (i) => (
                      <input
                        placeholder={1}
                        onClick={(e) => handleInput(1)}
                        className={`${
                          questionsNo + 3 === selectedIndex && "table-input"
                        }`}
                      />
                    ))}
                  </td> */}
              </Table>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LtableFillintheBlanks;
