import React, { useState } from "react";
import "./style.scss";
import IdentifyInformationTrueOrFalse from "../../../components/RedingQuationType/IdentifyInformationTrueOrFalse";
import { Container, Col, Row } from "react-bootstrap";
import Footer from "../../../components/Footer";
// import FillInTheSelect from "../../../components/RedingQuationType/FillInTheSelect";
import IdentifyInformationOptions from "../../../components/RedingQuationType/IdentifyInformationOptions";
// import TableFillinTheblanks from "../../../components/RedingQuationType/TableFillinTheblanks";
import RFillInTheBlanks from "../../../components/RedingQuationType/RFillInTheBlanks";
import Header from "../../../components/Header";
import ActionNavButton from "../../../components/ActionNavButton";
import { useLocation, useNavigate } from "react-router-dom";
import CustomAlert from "../../../components/Alert";
import ContextMenu from "../../../components/ContextMenu";
import { getAllQuestionsList } from "../../../redux/actions/QuestionAction";
import { useDispatch } from "react-redux";
import advancedIELTSDatabase from "../../../db";
import AppLoader from "../../../components/CustomLoader";
import { useLiveQuery } from "dexie-react-hooks";
import reactStringReplace from "react-string-replace";
import { postAllQuestionsList } from "../../../redux/actions/SubmitAction";
import { defaultMessages } from "../../../utilities/messege";
import { type } from "@testing-library/user-event/dist/type";

let checkArry = [];
const ReadingSection = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [newResumeArry, setNewResumeArry] = React.useState([]);

  const [showQuationPart, setShowQuationPart] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [apiType, setApiType] = React.useState(false);

  const [defaultTestStatus, setDefaultTestStatus] = React.useState("");

  const [messageAlert, setMessageAlert] = React.useState("");
  const [questionData, setQuestionData] = React.useState([]);
  const [loaderStatus, setLoaderStatus] = React.useState(false);
  const [apiReponse, setApiReponse] = React.useState(false);

  const [statusOfShowsections, setStatusOfShowsections] = React.useState("");
  const [callShowAnswer, setCallShowAnswer] = React.useState(true);

  //for note
  const [origin, setOrigin] = React.useState();

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const pageInfo = JSON.parse(localStorage.getItem("pageInfo"));
  const positionOfquestions = JSON.parse(localStorage.getItem("position"));
  const userlocalInfo = JSON.parse(localStorage.getItem("userlocalInfo"));

  // Get questions Listening  Test Data of IDB
  const getQuestionsReadingTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.readingTestQuestions.toArray(),
    []
  );

  const getAnswerReadingTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.readingTestAnswer.toArray(),
    []
  );

  const contextmenuWapper = document.querySelector(".contextmenu-wapper");
  let menuVisible = false;
  let AllInput = document.querySelectorAll("input");

  const sectionEndApi = (data, loader) => {
    if (loader === "loader" || loader === "save_and_exit") {
      setLoaderStatus(true);
    }
    const header = {
      Accept: "application/json",
      "user-id": userInfo?.id,
      "api-token": userInfo?.api_token,
    };

    const dataList = {
      user_id: userInfo?.id,
      test_id: userInfo?.testID,
      test_type: userInfo?.type,
      part: "all",
      data: data,
      test_status:
        loader === "loader" || loader === "save_and_exit" ? "P" : "C",
      section_type: "reading",
      resume: loader === "save_and_exit" ? true : false,
    };

    dispatch(
      postAllQuestionsList({
        header,
        dataList,
        onSuccess: (response) => {
          if (response?.data?.statusCode === 200) {
            if (loader === "loader" && userInfo?.type === "M") {
              setLoaderStatus(false);
              setApiReponse(true);
            } else if (loader === "save_and_exit" || userInfo?.type === "P") {
              if (userInfo?.redirect_url) {
                window.location.replace(userInfo?.redirect_url);
              } else {
                window.location.replace(
                  `${window.origin + "/Student/dashboard"}`
                );
              }
            }
          }

          if (response?.data?.statusCode === 599) {
            setShowAlert(true);
            setDefaultTestStatus(response?.data?.statusCode);
            setMessageAlert(defaultMessages.sessionTimeOut);
            setApiType(defaultMessages?.logoutApicall);
          }
        },
        onFailure: (error) => {
          console.log(error);
          setShowAlert(true);
          setDefaultTestStatus(599);
          setMessageAlert(error?.message);
          setApiType(defaultMessages?.submitAnswerAPI);
        },
      })
    );
  };

  React.useEffect(() => {
    if (questionData.length !== 0 && questionData?.reading?.format) {
      let format = JSON.parse(questionData?.reading?.format);

      let first_part = Number(format[0]);
      let second_part = Number(format[0]) + Number(format[1]);
      let third_part = Number(format[1]) + Number(format[2]);

      if (selectedIndex <= first_part) {
        setShowQuationPart("Part 1");
      } else if (selectedIndex > first_part && selectedIndex <= second_part) {
        setShowQuationPart("Part 2");
      } else {
        setShowQuationPart("Part 3");
      }
    } else {
      if (selectedIndex <= 13) {
        setShowQuationPart("Part 1");
      } else if (selectedIndex >= 14 && selectedIndex <= 26) {
        setShowQuationPart("Part 2");
      } else if (selectedIndex >= 27 && selectedIndex <= 40) {
        setShowQuationPart("Part 3");
      }
    }

    if (selectedIndex !== 1) {
      if (userInfo?.type === "M") {
        localStorage.setItem(
          "position",
          JSON.stringify({ positionOfquestions: `R_${selectedIndex}` })
        );
      } else if (userInfo?.type === "P") {
        localStorage.setItem(
          "position",
          JSON.stringify({ ...positionOfquestions, reading: selectedIndex })
        );
      }
    }
  }, [selectedIndex]);

  const handleCloseAlert = (status) => {
    if (status === "start") {
      setShowAlert(false);
    } else {
      setShowAlert(false);
      handleNextSection("loader");
    }
  };

  // handle next function
  const handleNextSection = (loader) => {
    setShowAlert(false);
    let part_1 = [];
    let part_2 = [];
    let part_3 = [];
    let totalScore = 0;
    let band = 0;

    getAnswerReadingTestDataOfDB &&
      getAnswerReadingTestDataOfDB.filter((element) => {
        totalScore += element?.score;
        if (element?.showQuationPart === "Part 1") {
          part_1.push({
            id: element?.id,
            user_answer: element?.user_answer,
            score: element?.score,
            question_type: element?.question_type,
            correct_answer: `${element?.correct_answer}${
              element?.subId ? `&${element?.subId}` : ""
            }`,
          });
        } else if (element?.showQuationPart === "Part 2") {
          part_2.push({
            id: element?.id,
            user_answer: element?.user_answer,
            score: element?.score,
            question_type: element?.question_type,
            correct_answer: `${element?.correct_answer}${
              element?.subId ? `&${element?.subId}` : ""
            }`,
          });
        } else if (element?.showQuationPart === "Part 3") {
          part_3.push({
            id: element?.id,
            user_answer: element?.user_answer,
            score: element?.score,
            question_type: element?.question_type,
            correct_answer: `${element?.correct_answer}${
              element?.subId ? `&${element?.subId}` : ""
            }`,
          });
        }
      });

    if (totalScore >= 39) {
      band = 9;
    } else if (totalScore >= 37) {
      band = 8.5;
    } else if (totalScore >= 35) {
      band = 8;
    } else if (totalScore >= 33) {
      band = 7.5;
    } else if (totalScore >= 30) {
      band = 7;
    } else if (totalScore >= 27) {
      band = 6.5;
    } else if (totalScore >= 23) {
      band = 6;
    } else if (totalScore >= 19) {
      band = 5.5;
    } else if (totalScore >= 15) {
      band = 5;
    } else if (totalScore >= 13) {
      band = 4.5;
    } else if (totalScore >= 10) {
      band = 4;
    } else if (totalScore >= 8) {
      band = 3.5;
    } else if (totalScore >= 6) {
      band = 3;
    } else if (totalScore >= 4) {
      band = 2.5;
    } else if (totalScore >= 0) {
      band = 0.5;
    }
    let newObject = {};

    if (userInfo?.type === "M") {
      newObject = {
        last_question: `R|${selectedIndex}`,
        reading: {
          status: loader === "save_and_exit" ? "P" : "C",
          module_time: userInfo?.session_time,
          answer_data: {
            part_1,
            part_2,
            part_3,
          },
          score_data: {
            band,
            correct_answers: totalScore,
          },
        },
      };
    } else {
      newObject = {
        last_question: { ...positionOfquestions, reading: selectedIndex },
        reading: {
          status: loader === "save_and_exit" ? "P" : "C",
          reading_module_time: userInfo?.session_time,
          answer_data: {
            part_1,
            part_2,
            part_3,
          },
          score_data: {
            band,
            correct_answers: totalScore,
          },
        },
      };
    }

    sectionEndApi(newObject, loader);
  };
  // staring for show toggle on right Click

  const toggleMenu = (command) => {
    contextmenuWapper.style.display = command === "show" ? "block" : "none";
    menuVisible = !menuVisible;
  };

  const setPosition = ({ top, left }) => {
    contextmenuWapper.style.left = `${left}px`;
    contextmenuWapper.style.top = `${top + 200}px`;
    toggleMenu("show");
  };

  window.addEventListener("click", (e) => {
    if (menuVisible) toggleMenu("hide");
  });

  const onContextMenuHandle = (e) => {
    e.preventDefault();
    if (window.getSelection().toString().split("\n\n").length <= 1) {
      setPosition(origin);
      return false;
    }
  };

  const onMouseMoveHandle = (e) => {
    const neworigin = {
      left: e.nativeEvent.offsetX,
      top: e.nativeEvent.offsetY,
    };
    setOrigin(neworigin);
  };

  // End for show toggle on right Click

  // for API calling
  const getQuestionsApi = (sectionType) => {
    const header = {
      Accept: "application/json",
      "user-id": userInfo?.id,
      "api-token": userInfo?.api_token,
    };
    let dataList = {};
    if (userInfo?.type === "M") {
      dataList = {
        user_id: userInfo?.id,
        test_id: userInfo?.testID,
        test_type: userInfo?.type,
        section_type: sectionType,
        part: "all",
        test_status: "P",
        internet_speed: userInfo?.internet_speed,
      };
    } else if (userInfo?.type === "P") {
      dataList = {
        user_id: userInfo?.id,
        test_id: userInfo?.testID,
        test_type: userInfo?.type,
        section_type: sectionType,
        part: "all",
        test_status: userInfo?.testStatus,
        internet_speed: userInfo?.internet_speed,
      };
    }
    dispatch(
      getAllQuestionsList({
        header,
        dataList,
        onSuccess: (response) => {
          if (response?.data?.statusCode === 200) {
            setDefaultTestStatus(response?.data?.statusCode);
            // let indexdata
            setLoaderStatus(false);

            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                ...userInfo,
                redirect_url: response?.data?.redirect_url,
              })
            );
            localStorage.setItem(
              "pageInfo",
              JSON.stringify({ relodePage: "R" })
            );
            if (sectionType === "writing") {
              advancedIELTSDatabase.writingTestQuestions.add(
                response?.data?.data
              );
            }
            if (sectionType === "reading") {
              advancedIELTSDatabase.readingTestQuestions.add(
                response?.data?.data
              );
              setQuestionData(response?.data?.data);
              if (response?.data?.data?.reading?.student_answers) {
                let allReasumeData = [];
                let r_R_part_1 = JSON.parse(
                  response?.data?.data?.reading?.student_answers?.part_1
                );
                let r_R_part_2 = JSON.parse(
                  response?.data?.data?.reading?.student_answers?.part_2
                );
                let r_R_part_3 = JSON.parse(
                  response?.data?.data?.reading?.student_answers?.part_3
                );

                r_R_part_1.forEach((element) => {
                  allReasumeData.push({
                    ...element,
                    showQuationPart: "Part 1",
                  });
                });
                r_R_part_2.forEach((element) => {
                  allReasumeData.push({
                    ...element,
                    showQuationPart: "Part 2",
                  });
                });
                r_R_part_3.forEach((element) => {
                  allReasumeData.push({
                    ...element,
                    showQuationPart: "Part 3",
                  });
                });

                allReasumeData.forEach(async (item) => {
                  const correctAnswerParts = item.correct_answer.split("&");
                  item.correct_answer = correctAnswerParts[0];

                  if (correctAnswerParts.length === 2) {
                    item.subId = correctAnswerParts[1];
                  }
                  try {
                    await addResumeQueTypeDataToIDB(item);
                    showAnswer("not_call_API");
                  } catch (error) {}
                });
              }

              if (
                userInfo?.testStatus === "P" &&
                response?.data?.last_question &&
                userInfo?.type === "M" &&
                response?.data?.last_question?.split("|")[0] === "R"
              ) {
                setSelectedIndex(
                  Number(response?.data?.last_question?.split("|")[1])
                );

                setStatusOfShowsections(
                  response?.data?.last_question?.split("|")[0]
                );
              } else if (userInfo?.type === "P") {
                let lastQuestion = JSON.parse(response?.data?.last_question);
                localStorage.setItem("position", JSON.stringify(lastQuestion));
                lastQuestion?.reading && userInfo?.testStatus === "P"
                  ? setSelectedIndex(Number(lastQuestion.reading))
                  : setSelectedIndex(1);
              }
            }
            if (response?.data?.statusCode === 599) {
              setShowAlert(true);
              setDefaultTestStatus(response?.data?.statusCode);
              setMessageAlert(defaultMessages.sessionTimeOut);
              setApiType(defaultMessages?.logoutApicall);
            }
          }

          if (response?.data?.statusCode === 599) {
            setShowAlert(true);
            setDefaultTestStatus(response?.data?.statusCode);
            setMessageAlert(defaultMessages.sessionTimeOut);
            setApiType(defaultMessages?.logoutApicall);
          }
        },
        onFailure: (error) => {
          // if (error?.status) {
          setShowAlert(true);
          setDefaultTestStatus(599);
          setMessageAlert(error?.message);
          setApiType(`${defaultMessages?.getQuestionAPI}|${sectionType}|P`);
          // }
        },
      })
    );
  };

  // for refresh time
  React.useEffect(() => {
    if (getQuestionsReadingTestDataOfDB !== undefined) showAnswer("call_API");
  }, [getQuestionsReadingTestDataOfDB, showQuationPart]);

  React.useEffect(() => {
    if (callShowAnswer) {
      if (AllInput.length > 5) {
        setCallShowAnswer(false);
      }
      showAnswer("not_call_API");
    }
  }, [callShowAnswer, getAnswerReadingTestDataOfDB]);

  function part_1FunctoinParagraph() {
    return {
      __html: questionData?.reading?.question_data?.part_1?.paragraph,
    };
  }

  function part_2FunctoinParagraph() {
    return {
      __html: questionData?.reading?.question_data?.part_2?.paragraph,
    };
  }

  function part_3FunctoinParagraph() {
    return {
      __html: questionData?.reading?.question_data?.part_3?.paragraph,
    };
  }
  // for part 1
  function part_1FunctoinQuestion() {
    reactStringReplace(
      questionData?.reading?.part_1?.questions,
      "#functionOnclick#",
      (onclick = (e) => {
        commenOnClickHndaler(e);
      })
    );
    reactStringReplace(
      questionData?.reading?.part_1?.questions,
      "#functionOnChange#",
      (onchange = (e) => {
        commenOnChangeHndaler(e);
      })
    );
    return {
      __html: questionData?.reading?.question_data?.part_1?.questions,
    };
  }

  // for part 2
  function part_2FunctoinQuestion() {
    reactStringReplace(
      questionData?.reading?.question_data?.part_2?.questions,
      "#functionOnclick#",
      (onclick = (e) => {
        commenOnClickHndaler(e);
      })
    );
    reactStringReplace(
      questionData?.reading?.question_data?.part_2?.questions,
      "#functionOnChange#",
      (onchange = (e) => {
        commenOnChangeHndaler(e);
      })
    );
    return {
      __html: questionData?.reading?.question_data?.part_2?.questions,
    };
  }
  // for part 3
  function part_3FunctoinQuestion() {
    reactStringReplace(
      questionData?.reading?.question_data?.part_3?.questions,
      "#functionOnclick#",
      (onclick = (e) => {
        commenOnClickHndaler(e);
      })
    );
    reactStringReplace(
      questionData?.reading?.question_data?.part_3?.questions,
      "#functionOnChange#",
      (onchange = (e) => {
        commenOnChangeHndaler(e);
      })
    );
    return {
      __html: questionData?.reading?.question_data?.part_3?.questions,
    };
  }

  const commenOnClickHndaler = async (e) => {
    let score = 0;
    let user_answer = typeof (e?.target?.value)===null?'':e?.target?.value;;
    let id = e?.target?.id;
    let correct_answer = "";
    let idNum = "";
    if (
      id &&
      getQuestionsReadingTestDataOfDB !== undefined &&
      user_answer !== undefined &&
      id !== undefined &&
      e?.target?.getAttribute("data-question_type") !== null &&
      id !== "default-checkbox"
    ) {
      if (id.includes("_")) {
        id = id.split("_")[0];
      }
      setSelectedIndex(Number(id));

      // multi choose options

      if (e?.target?.getAttribute("data-question_type") === "r_mlc") {
        let getId = document.getElementById(id);

        if (!getId) {
          // getId.value = user_answer;
        } else {
          let getId1 = document.getElementById(Number(id) + 1);
          getId1.value = user_answer;
          // id = Number(id) + 1;
        }

        let checkCount = 0;

        AllInput?.forEach((alliEle) => {
          if (alliEle?.id.includes(id)) {
            if (alliEle?.checked === true) {
              idNum = Number(id) + checkCount;
              checkCount++;
            }

            if (checkCount !== e?.target?.id?.split("_").length - 1) {
              document.getElementById(alliEle.id).disabled = false;
            } else if (alliEle?.checked === true) {
              document.getElementById(alliEle.id).disabled = true;
            }
          }
        });

        AllInput?.forEach((alliEle) => {
          if (alliEle?.id.includes(id)) {
            if (
              checkCount === e?.target?.id?.split("_").length - 1 &&
              alliEle?.checked === false
            ) {
              document.getElementById(alliEle.id).disabled = true;
            } else if (alliEle?.checked === true) {
              document.getElementById(alliEle.id).disabled = false;
            }
          }
        });
        if (e.target.checked === false) {
          const newData = await getAnswerReadingTestDataOfDB.filter((item) => {
            if (item.subId === e.target.id) return item.id;
          });
          newData && newData.length !== 0 && removeItemFromDb(newData[0]?.id);
        }
      }
      const readingAnswer = await getQuestionsReadingTestDataOfDB[0]?.reading
        ?.answers;
      let finalUsername = user_answer.split(" ").join("");
      JSON.parse(readingAnswer)?.forEach((element, index) => {
        let correctAnswerPerQuestions = element.split(" ").join("");

        if (
          finalUsername &&
          correctAnswerPerQuestions
            .toLowerCase()
            .split("|")
            ?.includes(finalUsername.toLowerCase()) &&
          id === `${index + 1}`
        ) {
          score = 1;
          correct_answer = element;
        } else if (id === `${index + 1}`) {
          correct_answer = element;
        }
      });
      let tempObj = {
        id:
          e?.target?.getAttribute("data-question_type") === "r_mlc"
            ? String(idNum)
            : String(id),
        user_answer,
        question_type: e?.target?.getAttribute("data-question_type"),
        score,
        correct_answer,
        showQuationPart,
        subId:
          e.target.type === "radio" ||
          e?.target?.getAttribute("data-question_type") === "r_mlc"
            ? e?.target?.id
            : "",
      };
      const newData = await getAnswerReadingTestDataOfDB.filter(
        (item) => item.id === tempObj.id
      );
      if (
        e?.target?.getAttribute("data-question_type") === "r_mlc" &&
        e?.target?.checked === true
      ) {
        if (tempObj?.user_answer !== undefined) {
          if (newData.length === 0) {
            try {
              await advancedIELTSDatabase.readingTestAnswer.add(tempObj);
            } catch (err) {
              // console.log(err);
            }
          } else if (newData.length !== 0) {
            try {
              await advancedIELTSDatabase.readingTestAnswer.update(
                newData[0]?.id,
                tempObj
              );
            } catch (err) {
              // console.log(err);
            }
          }
        }
      } else if (e?.target?.getAttribute("data-question_type") !== "r_mlc") {
        if (tempObj?.user_answer !== undefined) {
          if (newData.length === 0) {
            try {
              await advancedIELTSDatabase.readingTestAnswer.add(tempObj);
            } catch (err) {
              // console.log(err);
            }
          } else if (newData.length !== 0) {
            try {
              await advancedIELTSDatabase.readingTestAnswer.update(
                newData[0]?.id,
                tempObj
              );
            } catch (err) {
              // console.log(err);
            }
          }
        }
      }
    }
  };

  // for on change envent
  const commenOnChangeHndaler = async (e) => {
    let score = 0;
    let user_answer = typeof (e?.target?.value)===null?'':e?.target?.value;;
    let id = e?.target?.id;
    let correct_answer = "";
    if (
      id &&
      getQuestionsReadingTestDataOfDB !== undefined &&
      user_answer !== undefined &&
      id !== undefined &&
      e?.target?.getAttribute("data-question_type") !== "l_mlc" &&
      e?.target?.getAttribute("data-question_type") !== null &&
      e?.target?.getAttribute("data-question_type") !== "r_mlc" &&
      id !== "default-checkbox"
    ) {
      if (id.includes("_")) {
        id = id.split("_")[0];
      }
      setSelectedIndex(Number(id));
      if (e?.target?.getAttribute("data-question_type") === "l_mlc") {
        let getId = document.getElementById(id);

        if (!getId.value) {
          getId.value = user_answer;
        } else {
          let getId1 = document.getElementById(Number(id) + 1);
          getId1.value = user_answer;
          id = Number(id) + 1;
        }
      }
      const readingAnswer = await getQuestionsReadingTestDataOfDB[0]?.reading
        ?.answers;
      let finalUsername = user_answer.split(" ").join("");

      JSON.parse(readingAnswer)?.forEach((element, index) => {
        let correctAnswerPerQuestions = element.split(" ").join("");

        if (
          finalUsername &&
          correctAnswerPerQuestions
            .toLowerCase()
            .split("|")
            ?.includes(finalUsername.toLowerCase()) &&
          id === `${index + 1}`
        ) {
          score = 1;
          correct_answer = element;
        } else if (id === `${index + 1}`) {
          correct_answer = element;
        }
      });

      let tempObj = {
        id,
        user_answer,
        question_type: e?.target?.getAttribute("data-question_type"),
        score,
        correct_answer,
        showQuationPart,
      };

      const newData = await getAnswerReadingTestDataOfDB.filter(
        (item) => item.id === tempObj.id
      );

      if (tempObj?.user_answer !== undefined) {
        if (newData.length === 0) {
          try {
            await advancedIELTSDatabase.readingTestAnswer.add(tempObj);
          } catch (err) {
            // console.log(err);
          }
        } else if (newData.length !== 0) {
          try {
            await advancedIELTSDatabase.readingTestAnswer.update(
              newData[0]?.id,
              tempObj
            );
          } catch (err) {
            // console.log(err);
          }
        }
      }
    }
  };

  React.useEffect(() => {
    // for go in next sections
    if (apiReponse) {
      setShowAlert(false);
      if (location?.state?.sectionType === "writing") {
        // getQuestionsApi("writing");
        navigation("/ielts/Instructions", location);
      }
    }
  }, [apiReponse]);

  // store resume data in indexDb
  const addResumeQueTypeDataToIDB = async (tempObj) => {
    const newData =
      (await getAnswerReadingTestDataOfDB.length) === 0 &&
      (await getAnswerReadingTestDataOfDB.filter(
        (item) => item?.data?.id === tempObj?.data?.id
      ));
    if (newData && newData.length === 0) {
      await advancedIELTSDatabase.readingTestAnswer.add(tempObj);
    } else if (newData && newData.length !== 0) {
      await advancedIELTSDatabase.readingTestAnswer.update(
        newData[0]?.id,
        tempObj
      );
    }
  };

  // for show answer
  const showAnswer = (status) => {
    let AllInput = document.querySelectorAll("input");
    if (
      getQuestionsReadingTestDataOfDB?.length === 0 &&
      status === "call_API"
    ) {
      setLoaderStatus(true);
      getQuestionsApi("reading");
    } else if (
      getQuestionsReadingTestDataOfDB !== undefined &&
      getQuestionsReadingTestDataOfDB.length !== 0
    ) {
      setQuestionData(getQuestionsReadingTestDataOfDB[0]);
      if (getAnswerReadingTestDataOfDB !== undefined) {
        setTimeout(() => {
          getAnswerReadingTestDataOfDB.forEach((element, index) => {
            let Qid = document.getElementById(`${element?.id}`);

            if (Qid !== null && !element?.subId) {
              Qid.value = element?.user_answer;
            } else if (Qid === null && element?.question_type === "r_mlc") {
              let checkCount = 0;
              let QSubId = document.getElementById(`${element?.subId}`);
              if (QSubId) {
                QSubId.checked = true;
              }

              let id = element.subId.split("_")[0];

              AllInput?.forEach((alliEle) => {
                if (alliEle?.id.includes(id)) {
                  if (alliEle?.checked === true) {
                    checkCount++;
                  }
                  if (
                    checkCount !== element.subId?.split("_").length - 1 &&
                    document.getElementById(alliEle.id)
                  ) {
                    document.getElementById(alliEle.id).disabled = false;
                  } else if (
                    alliEle?.checked === true &&
                    document.getElementById(alliEle.id)
                  ) {
                    document.getElementById(alliEle.id).disabled = true;
                  }
                }
              });

              AllInput?.forEach((alliEle) => {
                if (alliEle?.id.includes(id)) {
                  if (
                    checkCount === element.subId?.split("_").length - 1 &&
                    alliEle?.checked === false
                  ) {
                    document.getElementById(alliEle.id).disabled = true;
                  } else if (alliEle?.checked === true) {
                    document.getElementById(alliEle.id).disabled = false;
                  }
                }
              });
            } else if (Qid !== null) {
              if (Qid !== null) {
                let QSubId = document.getElementById(`${element?.subId}`);
                if (QSubId !== null) QSubId.checked = true;
              }
            }
          });

          let tagArr = document.getElementsByTagName("input");
          for (let i = 0; i < tagArr.length; i++) {
            tagArr[i].autocomplete = "off";
          }
        }, 200);
      }
    }
  };

  // for refresh time show questions no
  React.useState(() => {
    if (positionOfquestions) {
      if (
        userInfo?.type === "M" &&
        positionOfquestions?.positionOfquestions?.includes("R")
      ) {
        setSelectedIndex(
          Number(positionOfquestions?.positionOfquestions.split("_")[1])
        );
      } else if (userInfo?.type === "P" && positionOfquestions?.reading) {
        setSelectedIndex(Number(positionOfquestions?.reading));
      }
    }
  }, []);

  const removeItemFromDb = async (id) => {
    await advancedIELTSDatabase.readingTestAnswer.delete(id);
  };
  return (
    <div>
      <CustomAlert
        apiType={apiType}
        title={"Alert"}
        showAlert={showAlert}
        message={messageAlert}
        handleCloseAlert={handleCloseAlert}
        handleNextSection={handleNextSection}
        defaultTestStatus={defaultTestStatus}
        getQuestionsApi={getQuestionsApi}
        setShowAlert={setShowAlert}
        setLoaderStatus={setLoaderStatus}
      />
      <Header handleNextSection={handleNextSection} />
      <ActionNavButton
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        setMessageAlert={setMessageAlert}
        handleNextSection={handleNextSection}
        showQuationPart={showQuationPart}
        selectedIndex={selectedIndex}
        format={
          questionData.length !== 0 &&
          questionData?.reading?.format &&
          JSON.parse(
            questionData?.reading?.format && questionData?.reading?.format
          )
        }
      />

      {loaderStatus ? (
        <AppLoader title="" />
      ) : (
        <>
          <div className="main-title-Questions">
            <h4>{showQuationPart}</h4>
            <p>
              Read the text box below And Answer Questions
              {selectedIndex <= 13
                ? " 1 - 13"
                : selectedIndex >= 14 && selectedIndex <= 26
                ? " 14 - 26"
                : " 27 - 40"}
            </p>
          </div>
          <Container fluid>
            <div className="main-reding-wpper">
              <Row>
                <Col
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  onContextMenu={(e) => {
                    onContextMenuHandle(e);
                  }}
                  onMouseMove={(e) => {
                    onMouseMoveHandle(e);
                  }}
                >
                  <div className="paragraph-question-paragraph-main ">
                    <p className="paragraph-question-title">
                      Read the text box below And Answer Questions{" "}
                      {selectedIndex <= 13
                        ? " 1 - 13"
                        : selectedIndex >= 14 && selectedIndex <= 26
                        ? " 14 - 27"
                        : " 28 - 40"}
                    </p>

                    {showQuationPart === "Part 1" ? (
                      <div
                        dangerouslySetInnerHTML={part_1FunctoinParagraph()}
                      />
                    ) : showQuationPart === "Part 2" ? (
                      <>
                        <div
                          dangerouslySetInnerHTML={part_2FunctoinParagraph()}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          dangerouslySetInnerHTML={part_3FunctoinParagraph()}
                        />
                      </>
                    )}
                    <ContextMenu
                      selectionText={window.getSelection().toString()}
                      selectionGetRangeAt={
                        window.getSelection().toString() &&
                        window.getSelection().getRangeAt(0)
                      }
                    />
                  </div>
                </Col>
                <Col
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  className="g-0 reding-answer-wepar"
                >
                  {showQuationPart === "Part 1" ? (
                    <>
                      <div dangerouslySetInnerHTML={part_1FunctoinQuestion()} />{" "}
                    </>
                  ) : showQuationPart === "Part 2" ? (
                    <>
                      <div dangerouslySetInnerHTML={part_2FunctoinQuestion()} />{" "}
                    </>
                  ) : (
                    <>
                      <div dangerouslySetInnerHTML={part_3FunctoinQuestion()} />{" "}
                    </>
                  )}
                </Col>
              </Row>
            </div>
          </Container>

          <Footer
            parts={"R"}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            paginationDataArry={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38, 39, 40,
            ]}
            format={
              questionData.length !== 0 &&
              questionData?.reading?.format &&
              JSON.parse(
                questionData?.reading?.format && questionData?.reading?.format
              )
            }
          />
        </>
      )}
    </div>
  );
};

export default ReadingSection;
