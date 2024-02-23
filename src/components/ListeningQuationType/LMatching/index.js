import React from "react";
import "./style.scss";
import { Col, Row } from "react-bootstrap";
import reactStringReplace from "react-string-replace";
import $ from "jquery";

// Global Variable
let score_Wri = 0;
let score_Red = 0;
let tempArr = [];
let currquestion = "";
let currquestionData = "";
let optionAns = [];
let rightAns = [];
let newqueOptionAns = [];
let newqueRightAns = [];

const LMatching = (props) => {
  const { questions, questionsTo, interaction, questionsNo, selectedIndex } =
    props;

  const parentDragElemetRef = React.useRef();
  const [currentDragNode, setCurrentDragNode] = React.useState();
  const [dragID, setDragID] = React.useState();
  const [dragCategory, setDragCategory] = React.useState();
  const [userAnswer, setUserAnswer] = React.useState([]);
  // Answers States;
  const [correctAnswer, setCorrectAnswer] = React.useState([]);

  // Question States
  const [questionAnsOption, setQuestionAnsOption] = React.useState([]);

  // Decode html entities
  let decodeEntities = (function () {
    let cache = {},
      character,
      e = document.createElement("div");

    return function (html) {
      return html?.replace(/([&][^&; ]+[;])/g, function (entity) {
        character = cache[entity];
        if (!character) {
          e.innerHTML = entity;
          if (e.childNodes[0])
            character = cache[entity] = e.childNodes[0].nodeValue;
          else character = "";
        }
        return character;
      });
    };
  })();

  // Get Current Question Data and Handle next button click event
  // React.useEffect(() => {
  //   if (questionsData && questionsData) {
  //     optionAns = [];
  //     rightAns = [];
  //     newqueOptionAns = [];
  //     newqueRightAns = [];
  //     currquestionData = questionsData && questionsData[selectedQautionIndex];
  //     // console.log("currquestionData====================", currquestionData);

  //     // Remove html tags
  //     let takeDecodedHtml = decodeEntities(
  //       questionsData && questionsData[selectedQautionIndex]?.questions
  //     );
  //     let newhtmlentities =
  //       takeDecodedHtml && takeDecodedHtml.replaceAll("<p>", "");
  //     let newhtmlentities1 =
  //       newhtmlentities && newhtmlentities.replaceAll("</p>", "");
  //     let newhtmlentities2 =
  //       newhtmlentities1 && newhtmlentities1.replaceAll("&amp;", "");
  //     let newhtmlentities3 =
  //       newhtmlentities2 && newhtmlentities2.replaceAll("nbsp;", "");
  //     let newhtmlentities4 =
  //       newhtmlentities3 && newhtmlentities3.replaceAll("&lt;p&gt;", "");
  //     let newhtmlentities5 =
  //       newhtmlentities4 && newhtmlentities4.replaceAll("&lt;br/&gt;", "");
  //     let newhtmlentities6 =
  //       newhtmlentities5 && newhtmlentities5.replaceAll("<strong>", "");
  //     let newhtmlentities7 =
  //       newhtmlentities6 && newhtmlentities6.replaceAll("</strong>", "");
  //     currquestion =
  //       newhtmlentities7 && newhtmlentities7.replaceAll("<br />", "");

  //     // For Question Answer Option
  //     currquestionData &&
  //       currquestionData.answer_option.map(
  //         (item) => (
  //           (newqueOptionAns = item.split(",")),
  //           newqueOptionAns.map((newitem, i) =>
  //             optionAns.push(newitem?.trim()?.toLowerCase())
  //           )
  //         )
  //       );
  //     setQuestionAnsOption(optionAns);

  //     // For Question Currect Answer
  //     currquestionData &&
  //       currquestionData.correct_answer.map(
  //         (item) => (
  //           (newqueRightAns = item.split(",")),
  //           newqueRightAns.map((newitem, i) =>
  //             rightAns.push(newitem?.trim()?.toLowerCase())
  //           )
  //         )
  //       );
  //     setCorrectAnswer(rightAns);
  //   }

  //   // For Click Next Button
  //   if (isHandelNext === true) {
  //     score_Wri = 0;
  //     score_Red = 0;
  //     setDragID(0);
  //     setDragCategory("");
  //     setCorrectAnswer([]);
  //     setCurrentDragNode(null);
  //     setQuestionAnsOption([]);
  //     setTimeout(() => {
  //       setUserAnswer([]);
  //       currquestionData = "";
  //       $(".question-container").each(function () {
  //         $(this).html("");
  //       });
  //     }, 1000);
  //     tempArr = [];
  //     rightAns = [];
  //     optionAns = [];
  //     newqueOptionAns = [];
  //     newqueRightAns = [];
  //   }
  // }, [questionsData, selectedQautionIndex, isHandelNext, currquestion]);

  React.useEffect(() => {
    let divArr = [];
    $(".question-container").each(function () {
      let getintC = $(this).text();
      let getint = getintC.replaceAll(" ", "");
      if (getint !== "") {
        divArr.push($(this).text()?.trim()?.toLowerCase());
      } else {
        divArr.push("");
      }
    });
    rFillBlanksMarksCalculation(divArr);
  }, [userAnswer, currquestionData]);

  // For Drag Start Value
  const onDragStart = (e, val, i, cat) => {
    setCurrentDragNode(e.target);
    e.dataTransfer.setData("text", val);
  };

  // For Drag Over Value
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // For Drag Values
  const onDrag = (e, val, i, cat) => {
    setDragID(i);
    setDragCategory(cat);
  };

  const myDragFun = (e) => {
    const items = parentDragElemetRef.current.children;
    e.preventDefault();
    if (e.target !== currentDragNode) {
      let currentpos = 0,
        droppedpos = 0;
      for (let it = 0; it < items.length; it++) {
        if (currentDragNode === items[it]) {
          currentpos = it;
        }
        if (e.target === items[it]) {
          droppedpos = it;
        }
      }
      if (currentpos < droppedpos) {
        e.target.parentNode.insertBefore(currentDragNode, e.target.nextSibling);
      } else {
        e.target.parentNode.insertBefore(currentDragNode, e.target);
      }
    }
  };

  const removeAllInstances = (arr, item) => {
    let newArr = [];
    for (var i = 0; i <= arr.length; i++) {
      if (arr[i] === item) {
      } else {
        if (arr[i] !== undefined) {
          newArr.push(arr[i]);
        }
      }
    }
    return newArr;
  };

  // For Drop Values
  const onDrop = (e, val, i, cat) => {
    if (dragCategory === "text" && !cat) {
      return;
    }

    if (dragCategory === "text" && dragCategory === "text" && cat === "input") {
      myDragFun(e);
      return;
    }
    let tempObj = {};
    let tempAns = [];
    let dd = e.dataTransfer.getData("text");
    tempObj["id"] = i;
    tempObj["val"] = dd;
    if (dragCategory === "text") {
      let inxval = document.getElementById(i).innerHTML;
      if (inxval === "") {
        var a = [];
        a.push(tempObj);
        tempArr = [...tempArr, tempObj];
        tempArr.map((item) => {
          return [tempAns.push(item.val), setUserAnswer(tempAns)];
        });
        a &&
          a.length > 0 &&
          a.map((item) => {
            return document.getElementById(item.id).append(item.val);
          });
      } else if (inxval !== "") {
        let removeByIndex = tempArr.findIndex((index) => index.id === i);
        tempArr.splice(removeByIndex, 1, tempObj);
        document.getElementById(i).innerHTML = dd;
        tempArr.map((item) => {
          return [tempAns.push(item.val), setUserAnswer(tempAns)];
        });
      }
    } else if (dragCategory === "input") {
      let inxval = document.getElementById(dragID).innerHTML;
      if (inxval !== "") {
        let narr = removeAllInstances(userAnswer, inxval);
        let newtemp = [];
        tempArr.map((item, index) => {
          if (item.val !== inxval) {
            return newtemp.push(item);
          } else {
            return null;
          }
        });
        tempArr = newtemp;
        setUserAnswer(narr);
        document.getElementById(dragID).innerHTML = "";
        setDragID(0);
      }
    }
  };

  // For Marks Calculation
  const rFillBlanksMarksCalculation = (divArr) => {
    let rigthAnswer = 0;
    let totalCurrAnswer = 0;
    let htmlAnswerArray = [];
    let questionAnsWithIndex = [];

    totalCurrAnswer = correctAnswer && correctAnswer.length;

    // Checking User Answer answer with index
    divArr &&
      divArr.forEach((answer, i) => {
        if (answer === "" && answer !== correctAnswer[i]) {
          questionAnsWithIndex.push("N");
          htmlAnswerArray.push(
            `<span class='wrong-innertext custom-input-box'>${answer}</span>`
          );
        } else if (answer !== "" && answer !== correctAnswer[i]) {
          htmlAnswerArray.push(
            `<span class='wrong-innertext custom-input-box'>${answer}</span>`
          );
          questionAnsWithIndex.push(
            questionAnsOption && questionAnsOption.indexOf(answer) + "_" + "W"
          );
        } else if (answer !== "" && answer === correctAnswer[i]) {
          rigthAnswer++;
          htmlAnswerArray.push(
            `<span class='right-innertext custom-input-box'>${answer}</span>`
          );
          questionAnsWithIndex.push(
            questionAnsOption && questionAnsOption.indexOf(answer) + "_" + "R"
          );
        }
      });

    // Reading Marks
    if (
      totalCurrAnswer !== 0 &&
      totalCurrAnswer !== undefined &&
      totalCurrAnswer !== null
    ) {
      score_Red = (rigthAnswer / totalCurrAnswer) * (15 / 4);
    }

    // Calling function And Get Data in ReadingSection Main File
    // getAnswerAndMarksData(
    //   htmlAnswerArray,
    //   questionAnsWithIndex,
    //   score_Red,
    //   score_Wri,
    //   currquestion
    // );
    rigthAnswer = 0;
    totalCurrAnswer = 0;
    htmlAnswerArray = [];
    questionAnsWithIndex = [];
  };

  return (
    <div className="listening-matching-wrap">
      <h4 className="listening-question-total">{questionsTo}</h4>
      <p className="question-choose-titel">{interaction}</p>

      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className="matching-main">
            {questions?.questions.map((item, index) => {
              {
                /* {
                questionsNo + index + " . ";
              } */
              }
              return reactStringReplace(item, "#DD#", (match, i) => (
                <>
                  <div
                    id={i}
                    key={i}
                    className="question-container"
                    onDragOver={(e) =>
                      onDragOver(e, e.target.value, i, "input")
                    }
                    onDragStart={(e) =>
                      onDragStart(e, e.target.value, i, "input")
                    }
                    onDrop={(e) => onDrop(e, e.target.value, i, "text")}
                    onDrag={(e) => onDrag(e, e.target.value, i, "input")}
                    draggable
                  ></div>
                </>
              ));
            })}
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          {questions?.options &&
            questions?.options.map((newitem, i) => (
              <div key={i + "l"}>
                {userAnswer && userAnswer.includes(`${newitem}`) ? null : (
                  <div
                    id={i + "item"}
                    className="answer-main-wrap"
                    value={`${newitem}`}
                    key={i + "item"}
                    onDragOver={(e) => onDragOver(e)}
                    onDragStart={(e) =>
                      onDragStart(e, `${newitem}`, i + "item", "text")
                    }
                    onDrop={(e) =>
                      onDrop(e, e.target.value, i + "item", "input", i)
                    }
                    onDrag={(e) =>
                      onDrag(e, e.target.value, i + "item", "text")
                    }
                    draggable
                  >
                    {`${newitem}`}
                  </div>
                )}
              </div>
            ))}
        </Col>
      </Row>
      {/* <div
        className="drap-content-main"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, e.target.value, null, null)}
      >
        <Row gutter={[16, 16]} ref={parentDragElemetRef}></Row>
      </div> */}
    </div>
  );

  // return (
  //   <div className="listening-matching-wrap">
  //     <h4 className="listening-question-total">{questionsTo}</h4>
  //     <p className="question-choose-titel">{interaction}</p>
  //     <Row>
  //       <Col xs={12} sm={12} md={6} lg={6} xl={6}>
  //         <div className="matching-main">
  //           {questions?.questions.map((items, index) => {
  //             return (
  //               <div className="matching-reactstring" id={index}>
  //                 {questionsNo + index + " . "}
  //                 {reactStringReplace(items, "#DD#", (match, i) => (
  //                   <div
  //                     id={i}
  //                     key={i}
  //                     className={`question-container ${
  //                       questionsNo + index === selectedIndex &&
  //                       "question-container-active"
  //                     }`}
  //                     onDragOver={(e) =>
  //                       onDragOver(e, e.target.value, i, "input")
  //                     }
  //                     onDragStart={(e) =>
  //                       onDragStart(e, e.target.value, i, "input")
  //                     }
  //                     onDrop={(e) => onDrop(e, e.target.value, i, "text")}
  //                     onDrag={(e) => onDrag(e, e.target.value, i, "input")}
  //                     draggable
  //                   >
  //                     {/* {questionsNo + index !== selectedIndex &&
  //                       questionsNo + index} */}
  //                   </div>
  //                 ))}
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </Col>
  //       <Col xs={12} sm={12} md={6} lg={6} xl={6}>
  //         {questions?.options.map((items, i) => {
  //           return (
  //             <div
  //               id={i}
  //               onDragOver={(e) => onDragOver(e)}
  //               onDrop={(e) => onDrop(e, e.target.value, null, null)}
  //             >
  //               <p
  //                 className="answer-main-wrap"
  //                 id={i + "item"}
  //                 value={`${items}`}
  //                 key={i + "item"}
  //                 onDragOver={(e) => onDragOver(e)}
  //                 onDragStart={(e) =>
  //                   onDragStart(e, `${items}`, i + "item", "text")
  //                 }
  //                 onDrop={(e) =>
  //                   onDrop(e, e.target.value, i + "item", "input", i)
  //                 }
  //                 onDrag={(e) => onDrag(e, e.target.value, i + "item", "text")}
  //                 draggable
  //               >
  //                 {items}
  //               </p>
  //             </div>
  //           );
  //         })}
  //       </Col>
  //     </Row>
  //   </div>
  // );
};

export default LMatching;
