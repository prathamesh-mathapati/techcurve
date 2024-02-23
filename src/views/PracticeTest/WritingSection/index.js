import React from "react";
import Task1 from "../../../components/writingQuationType/Task1";
import "./style.scss";
import { Container } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Task2 from "../../../components/writingQuationType/Tast2";
import Header from "../../../components/Header";
import ActionNavButton from "../../../components/ActionNavButton";
import { useLocation, useNavigate } from "react-router-dom";
import CustomAlert from "../../../components/Alert";
import advancedIELTSDatabase from "../../../db";
import { useDispatch } from "react-redux";
import { getAllQuestionsList } from "../../../redux/actions/QuestionAction";
import { useLiveQuery } from "dexie-react-hooks";
import { postAllQuestionsList } from "../../../redux/actions/SubmitAction";
import axios from "axios";
import AppLoader from "../../../components/CustomLoader";
import { defaultMessages } from "../../../utilities/messege";

let QuestionwithError = [];
let type_details = {};
// let grammarResponseStatus = false;

const WritingSection = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [showQuationPart, setShowQuationPart] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [apiType, setApiType] = React.useState(false);

  const [defaultTestStatus, setDefaultTestStatus] = React.useState("");

  const [messageAlert, setMessageAlert] = React.useState("");
  const [questionData, setQuestionData] = React.useState([]);
  const [loaderStatus, setLoaderStatus] = React.useState(false);
  const [apiReponse, setApiReponse] = React.useState(false);
  const [handlestatusDb, setHandlestatusDb] = React.useState(true);

  const [statusOfShowsections, setStatusOfShowsections] = React.useState("");

  const [writingTestStatus, setWritingTestStatus] = React.useState("C");
  const [writingResumeData, setWritingResumeData] = React.useState([]);
  const [listeningResumeData, setListeningResumeData] = React.useState([]);
  const [readingResumeData, setReadingResumeData] = React.useState([]);
  const [userAnswer1, setUserAnswer1] = React.useState({
    score: 0,
    userAnswer: "",
    task_achievement: 0,
  });
  const [userAnswer2, setUserAnswer2] = React.useState({
    score: 0,
    userAnswer: "",
    task_achievement: 0,
  });

  const [grammarResponseStatus, setGrammarResponseStatus] =
    React.useState(false);
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userlocalInfo = JSON.parse(localStorage.getItem("userlocalInfo"));
  const positionOfquestions = JSON.parse(localStorage.getItem("position"));

  // Get questions Listening  Test Data of IDB
  const getQuestionsWritingTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.writingTestQuestions.toArray(),
    []
  );

  const getAnswerWritingTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.writingTestAnswer.toArray(),
    []
  );

  const getAnswerReadingTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.readingTestAnswer.toArray(),
    []
  );

  const getAnswerListeningTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.listeningTestAnswer.toArray(),
    []
  );

  React.useEffect(() => {
    if (selectedIndex <= 1) {
      setShowQuationPart("Part 1");
    } else {
      setShowQuationPart("Part 2");
    }

    if (selectedIndex !== 1) {
      if (userInfo?.type === "M") {
      } else if (userInfo?.type === "P") {
        localStorage.setItem(
          "position",
          JSON.stringify({ ...positionOfquestions, writing: selectedIndex })
        );
      }
    }
  }, [selectedIndex]);

  const handleCloseAlert = (status) => {
    if (status === "start") {
      setShowAlert(false);
    } else if (status !== undefined) {
      handleNextSection("loader");
    }
  };

  const handleNextSection = (loader) => {
    let part_1 = [];
    let part_2 = [];
    setShowAlert(false);
    setLoaderStatus(true);
    if (
      getAnswerWritingTestDataOfDB &&
      getAnswerWritingTestDataOfDB.length !== 0
    ) {
      getAnswerWritingTestDataOfDB.filter((element, index) => {
        if (index === getAnswerWritingTestDataOfDB?.length + 1) {
          setGrammarResponseStatus(false);
        }
        grammarValidationApi(element, element?.userAnswer, index);

        if (element?.showQuationPart === "Part 1") {
          part_1.push({
            id: element?.id,
            user_answer: element?.userAnswer,
            score: element?.score,
            question_type: element?.question_type,
          });
        } else if (element?.showQuationPart === "Part 2") {
          part_2.push({
            id: element?.id,
            user_answer: element?.userAnswer,
            score: element?.score,
            question_type: element?.question_type,
          });
        }
      });
    } else {
      setGrammarResponseStatus(true);
    }

    if (loader === "save_and_exit") {
      setWritingTestStatus("P");
      setGrammarResponseStatus(true);
    } else {
      setWritingTestStatus("C");
    }
  };

  React.useEffect(() => {
    if (grammarResponseStatus) {
      let part_1 = [];
      let part_2 = [];
      let score_1 = 0;
      let score_2 = 0;
      let writing_score = 0;
      let listening_score = 0;
      let reading_score = 0;

      let l_part_1 = 0;
      let l_part_2 = 0;
      let l_part_3 = 0;
      let l_part_4 = 0;
      let r_part_1 = 0;
      let r_part_2 = 0;
      let r_part_3 = 0;
      let w_part_1 = 0;
      let w_part_2 = 0;
      let w_coherence = 0;
      let w_task_achievement = 0;
      let w_lexical_resource = 0;
      let w_grammar_range = 0;

      let listening_band = 0;
      let reading_band = 0;
      let writing_band = 0;
      // let writing_band = 0;

      getAnswerWritingTestDataOfDB &&
        getAnswerWritingTestDataOfDB.filter((element, index) => {
          let coherence = 0;
          let task_achievement = 0;
          let lexical_resource = 0;
          let grammar_range = 0;

          if (element?.grammar >= 91) {
            coherence = 9;
          } else if (element?.grammar >= 90) {
            coherence = 8;
          } else if (element?.grammar >= 80) {
            coherence = 7;
          } else if (element?.grammar >= 70) {
            coherence = 6;
          } else if (element?.grammar >= 60) {
            coherence = 6;
          } else if (element?.grammar >= 50) {
            coherence = 5;
          } else if (element?.grammar >= 40) {
            coherence = 4;
          } else if (element?.grammar >= 30) {
            coherence = 3;
          } else if (element?.grammar >= 20) {
            coherence = 2;
          } else if (element?.grammar >= 10) {
            coherence = 1;
          }

          if (100 <= element?.lexical_resource >= 91) {
            lexical_resource = 9;
          } else if (element?.lexical_resource >= 90) {
            lexical_resource = 8;
          } else if (element?.lexical_resource >= 80) {
            lexical_resource = 7;
          } else if (element?.lexical_resource >= 70) {
            lexical_resource = 6;
          } else if (element?.lexical_resource >= 60) {
            lexical_resource = 6;
          } else if (element?.lexical_resource >= 50) {
            lexical_resource = 5;
          } else if (element?.lexical_resource >= 40) {
            lexical_resource = 4;
          } else if (element?.lexical_resource >= 30) {
            lexical_resource = 3;
          } else if (element?.lexical_resource >= 20) {
            lexical_resource = 2;
          } else if (element?.lexical_resource >= 10) {
            lexical_resource = 1;
          }

          if (element?.grade === "Professional") {
            grammar_range = 9;
          } else if (element?.grade === "College graduate") {
            grammar_range = 8;
          } else if (element?.grade === "College") {
            grammar_range = 7;
          } else if (element?.grade === "10th to 12th grade") {
            grammar_range = 6;
          } else if (element?.grade === "8th & 9th grade") {
            grammar_range = 5;
          } else if (element?.grade === "7th grade") {
            grammar_range = 4;
          } else if (element?.grade === "6th grade") {
            grammar_range = 3;
          } else if (element?.grade === "5th grade") {
            grammar_range = 2;
          } else {
            grammar_range = 1;
          }
          w_task_achievement += task_achievement;
          w_coherence += coherence;
          w_grammar_range += grammar_range;
          w_lexical_resource += lexical_resource;

          if (element?.showQuationPart === "Part 1") {
            score_1 = customRound(
              (grammar_range +
                task_achievement +
                coherence +
                lexical_resource) /
                4
            );

            w_part_1 = score_1;
            part_1.push({
              id: element?.id,
              user_answer: element?.userAnswer,
              score: score_1,
              question_type: element?.question_type,
              answer_html: element?.answer,
              lexical_resource,
              grammar_range,
              coherence,
              task_achievement: element?.task_achievement,
            });
          } else if (element?.showQuationPart === "Part 2") {
            score_2 = customRound(
              (grammar_range +
                task_achievement +
                coherence +
                lexical_resource) /
                4
            );
            w_part_2 = score_2;
            part_2.push({
              id: element?.id,
              user_answer: element?.userAnswer,
              score: score_2,
              question_type: element?.question_type,
              answer_html: element?.answer,
              lexical_resource,
              grammar_range,
              coherence,
              task_achievement: task_achievement,
            });
          }
        });
      // for Listening  section band

      getAnswerListeningTestDataOfDB &&
        getAnswerListeningTestDataOfDB.filter((element, index) => {
          listening_score += element?.score;
          if (element?.showQuationPart === "Part 1") {
            l_part_1 += element?.score;
          } else if (element?.showQuationPart === "Part 2") {
            l_part_2 += element?.score;
          } else if (element?.showQuationPart === "Part 3") {
            l_part_3 += element?.score;
          } else if (element?.showQuationPart === "Part 4") {
            l_part_4 += element?.score;
          }
        });

      if (listening_score >= 39) {
        listening_band = 9;
      } else if (listening_score >= 37) {
        listening_band = 8.5;
      } else if (listening_score >= 35) {
        listening_band = 8;
      } else if (listening_score >= 32) {
        listening_band = 7.5;
      } else if (listening_score >= 30) {
        listening_band = 7;
      } else if (listening_score >= 26) {
        listening_band = 6.5;
      } else if (listening_score >= 23) {
        listening_band = 6;
      } else if (listening_score >= 18) {
        listening_band = 5.5;
      } else if (listening_score >= 16) {
        listening_band = 5;
      } else if (listening_score >= 13) {
        listening_band = 4.5;
      } else if (listening_score >= 11) {
        listening_band = 4;
      } else if (listening_score >= 0) {
        listening_band = 0;
      }

      getAnswerReadingTestDataOfDB &&
        getAnswerReadingTestDataOfDB.filter((element) => {
          reading_score += element?.score;
          if (element?.showQuationPart === "Part 1") {
            r_part_1 += element?.score;
          } else if (element?.showQuationPart === "Part 2") {
            r_part_2 += element?.score;
          } else if (element?.showQuationPart === "Part 3") {
            r_part_3 += element?.score;
          }
        });

      if (reading_score >= 39) {
        reading_band = 9;
      } else if (reading_score >= 37) {
        reading_band = 8.5;
      } else if (reading_score >= 35) {
        reading_band = 8;
      } else if (reading_score >= 33) {
        reading_band = 7.5;
      } else if (reading_score >= 30) {
        reading_band = 7;
      } else if (reading_score >= 27) {
        reading_band = 6.5;
      } else if (reading_score >= 23) {
        reading_band = 6;
      } else if (reading_score >= 19) {
        reading_band = 5.5;
      } else if (reading_score >= 15) {
        reading_band = 5;
      } else if (reading_score >= 13) {
        reading_band = 4.5;
      } else if (reading_score >= 10) {
        reading_band = 4;
      } else if (reading_score >= 8) {
        reading_band = 3.5;
      } else if (reading_score >= 6) {
        reading_band = 3;
      } else if (reading_score >= 4) {
        reading_band = 2.5;
      } else if (reading_score >= 0) {
        reading_band = 0.5;
      }
      writing_score = customRound((score_1 + score_2) / 2);
      writing_band = customRound((w_part_1 + w_part_2) / 2);
      let newObject = {};
      if (userInfo?.type === "M") {
        newObject = {
          last_question: `W|${selectedIndex}`,
          writing: {
            status: writingTestStatus,
            module_time: userInfo?.session_time,

            answer_data: {
              part_1,
              part_2,
            },
            score_data: {
              band: customRound((score_1 + score_2) / 2),
              correct_answers: "",
            },
          },
          writing_score: writing_band,
          listening_score: listening_band,
          reading_score: reading_band,
        };
      } else if (userInfo?.type === "P") {
        newObject = {
          last_question: { ...positionOfquestions, writing: selectedIndex },
          writing: {
            status: writingTestStatus,
            writing_module_time: userInfo?.session_time,

            answer_data: {
              part_1,
              part_2,
            },
            score_data: {
              band: customRound((score_1 + score_2) / 2),
              correct_answers: "",
            },
          },
          writing_score: writing_band,
        };
      }
      type_details = {
        l_part_1,
        l_part_2,
        l_part_3,
        l_part_4,
        r_part_1,
        r_part_2,
        r_part_3,
        w_part_1,
        w_part_2,
        task_achievement: w_task_achievement,
        coherence: w_coherence,
        grammar_range: w_grammar_range,
        lexical_resource: w_lexical_resource,
        listening_band: listening_band,
        writing_band: writing_band,
        reading_band: reading_band,
        overall_band: customRound(
          (listening_band + writing_band + reading_band) / 3
        ),
      };
      setWritingTestStatus("C");
      sectionEndApi(newObject, "loader");
    }
  }, [grammarResponseStatus]);

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

    setLoaderStatus(true);
    dispatch(
      getAllQuestionsList({
        header,
        dataList,
        onSuccess: (response) => {
          if (response?.data?.statusCode === 200) {
            setDefaultTestStatus(response?.data?.statusCode);
            // let indexdata
            setQuestionData(response?.data?.data);
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                ...userInfo,
                redirect_url: response?.data?.redirect_url,
              })
            );
            setLoaderStatus(false);
            advancedIELTSDatabase.writingTestQuestions.add(
              response?.data?.data
            );
            if (response?.data?.data?.writing?.student_answers) {
              let allReasumeData = [
                ...JSON.parse(
                  response?.data?.data?.writing?.student_answers?.part_1
                ),
                ...JSON.parse(
                  response?.data?.data?.writing?.student_answers?.part_2
                ),
              ];
              allReasumeData.forEach(async (item, index) => {
                // item["user_answer"] = item["userAnswer"];
                // delete item["user_answer"];
                item["userAnswer"] = item["user_answer"];
                item["answer"] = item["user_answer"];
                delete item["user_answer"];
                try {
                  await addResumeQueTypeDataToIDB(item);
                  if (index === 0) {
                    setUserAnswer1({
                      score: item?.score,
                      userAnswer: item?.userAnswer,
                      task_achievement: item?.task_achievement,
                    });
                  } else if (index === 1) {
                    setUserAnswer2({
                      score: item?.score,
                      userAnswer: item?.userAnswer,
                      task_achievement: item?.task_achievement,
                    });
                  }
                } catch (error) {}
              });
            }

            if (
              userInfo?.testStatus === "P" &&
              response?.data?.last_question &&
              userInfo?.type === "M"
            ) {
              if (response?.data?.last_question?.split("|")[0] === "W") {
                setSelectedIndex(
                  Number(response?.data?.last_question?.split("|")[1])
                );
              }
              setStatusOfShowsections(
                response?.data?.last_question?.split("|")[0]
              );

              if (
                response?.data?.section_answer &&
                response?.data?.section_answer?.listening
              ) {
                let allReasumeData = [];
                let l_R_part_1 = JSON.parse(
                  response?.data?.section_answer?.listening?.part_1
                );
                let l_R_part_2 = JSON.parse(
                  response?.data?.section_answer?.listening?.part_2
                );
                let l_R_part_3 = JSON.parse(
                  response?.data?.section_answer?.listening?.part_3
                );
                let l_R_part_4 = JSON.parse(
                  response?.data?.section_answer?.listening?.part_4
                );
                l_R_part_1.forEach((element) => {
                  allReasumeData.push({
                    ...element,
                    showQuationPart: "Part 1",
                  });
                });
                l_R_part_2.forEach((element) => {
                  allReasumeData.push({
                    ...element,
                    showQuationPart: "Part 2",
                  });
                });
                l_R_part_3.forEach((element) => {
                  allReasumeData.push({
                    ...element,
                    showQuationPart: "Part 3",
                  });
                });
                l_R_part_4.forEach((element) => {
                  allReasumeData.push({
                    ...element,
                    showQuationPart: "Part 4",
                  });
                });

                allReasumeData.forEach(async (item) => {
                  const correctAnswerParts = item.correct_answer.split("&");
                  item.correct_answer = correctAnswerParts[0];
                  if (correctAnswerParts.length === 2) {
                    item.subId = correctAnswerParts[1];
                  }
                  try {
                    await addListeningResumeQueTypeDataToIDB(item);
                  } catch (error) {}
                });
              }

              if (
                response?.data?.section_answer &&
                response?.data?.section_answer?.reading
              ) {
                let allReasumeData = [];
                let r_R_part_1 = JSON.parse(
                  response?.data?.section_answer?.reading?.part_1
                );
                let r_R_part_2 = JSON.parse(
                  response?.data?.section_answer?.reading?.part_2
                );
                let r_R_part_3 = JSON.parse(
                  response?.data?.section_answer?.reading?.part_3
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
                    await addReadingResumeQueTypeDataToIDB(item);
                  } catch (error) {}
                });
              }
            } else if (userInfo?.type === "P") {
              let lastQuestion = JSON.parse(response?.data?.last_question);
              localStorage.setItem("position", JSON.stringify(lastQuestion));
              lastQuestion?.writing && userInfo?.testStatus === "P"
                ? setSelectedIndex(Number(lastQuestion.writing))
                : setSelectedIndex(1);
            }

            if (userInfo?.testStatus === "P" && response?.data?.last_question) {
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
          setShowAlert(true);
          setDefaultTestStatus(599);
          setMessageAlert(error?.message);
          setApiType(`${defaultMessages?.getQuestionAPI}|${sectionType}|P`);
        },
      })
    );
  };

  React.useEffect(() => {
    if (handlestatusDb) {
      if (getQuestionsWritingTestDataOfDB?.length === 0) {
        setLoaderStatus(true);
        getQuestionsApi("writing");
      } else if (
        getQuestionsWritingTestDataOfDB !== undefined &&
        getQuestionsWritingTestDataOfDB.length !== 0
      ) {
        setQuestionData(getQuestionsWritingTestDataOfDB[0]);
        if (getAnswerWritingTestDataOfDB !== undefined) {
          setHandlestatusDb(false);

          getAnswerWritingTestDataOfDB.forEach((element, index) => {
            if (element?.question_type === "task1") {
              setUserAnswer1({
                score: element?.score,
                userAnswer: element?.userAnswer,
                task_achievement: element?.task_achievement,
              });
            } else if (element?.question_type === "task2") {
              setUserAnswer2({
                score: element?.score,
                userAnswer: element?.userAnswer,
                task_achievement: element?.task_achievement,
              });
            }
          });
        }
      }
    }
  }, [
    getQuestionsWritingTestDataOfDB,
    selectedIndex,
    getAnswerWritingTestDataOfDB,
  ]);
  // add in index db
  const addIntoTheDb = async () => {
    if (getAnswerWritingTestDataOfDB !== undefined) {
      if (selectedIndex === 1) {
        let tempObj = {
          id: selectedIndex,
          userAnswer: userAnswer1?.userAnswer,
          question_type: showQuationPart === "Part 1" ? "task1" : "task2",
          score: userAnswer1?.score,
          correct_answer: "none",
          showQuationPart,
          word_count:
            userAnswer1?.userAnswer?.length !== 0 &&
            userAnswer1?.userAnswer?.split(" ")?.length,
          task_achievement: userAnswer1?.task_achievement,
          answer: userAnswer1?.userAnswer,
          lexical_resource: 0,
        };
        const newData = await getAnswerWritingTestDataOfDB.filter(
          (item) => item.id === tempObj.id
        );

        if (tempObj?.userAnswer !== undefined) {
          if (newData.length === 0) {
            try {
              await advancedIELTSDatabase.writingTestAnswer.add(tempObj);
            } catch (err) {
              // console.log(err);
            }
          } else if (newData.length !== 0) {
            try {
              await advancedIELTSDatabase.writingTestAnswer.update(
                newData[0]?.id,
                tempObj
              );
            } catch (err) {
              // console.log(err);
            }
          }
        }
      } else if (selectedIndex === 2) {
        let tempObj = {
          id: selectedIndex,
          userAnswer: userAnswer2?.userAnswer,
          question_type: showQuationPart === "Part 1" ? "task1" : "task2",
          score: userAnswer1?.score,
          correct_answer: "none",
          showQuationPart,
          word_count:
            userAnswer2?.userAnswer?.length !== 0 &&
            userAnswer2?.userAnswer?.split(" ")?.length,
          task_achievement: userAnswer2?.task_achievement,
          answer: userAnswer2?.userAnswer,
          lexical_resource: 0,
        };

        const newData = await getAnswerWritingTestDataOfDB.filter(
          (item) => item.id === tempObj.id
        );

        if (tempObj?.userAnswer !== undefined) {
          if (newData.length === 0) {
            try {
              await advancedIELTSDatabase.writingTestAnswer.add(tempObj);
            } catch (err) {
              // console.log(err);
            }
          } else if (newData.length !== 0) {
            try {
              await advancedIELTSDatabase.writingTestAnswer.update(
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

  React.useEffect(() => {
    addIntoTheDb();
  }, [userAnswer1, userAnswer2]);

  React.useEffect(() => {
    if (apiReponse) {
      if (location?.pathname === "/ielts/ListeningSection") {
        navigation("/ielts/ReadingSection");
      } else if (location?.pathname === "/ielts/ReadingSection") {
        navigation("/ielts/WritingSection");
      } else if (location?.pathname === "/ielts/WritingSection") {
        handleCloseAlert();
      }
    }
  }, [apiReponse]);

  const sectionEndApi = (data, loader) => {
    if (loader === "loader") {
      setLoaderStatus(true);
    }
    const header = {
      Accept: "application/json",
      "user-id": userInfo?.id,
      "api-token": userInfo?.api_token,
    };
    let dataList = {};
    if (writingTestStatus === "C" && userInfo?.type === "M") {
      dataList = {
        user_id: userInfo?.id,
        test_id: userInfo?.testID,
        test_type: userInfo?.type,
        part: "all",
        data: data,
        test_status: writingTestStatus,
        type_details: type_details,
        section_type: "writing",
        resume: loader === "save_and_exit" ? true : false,
      };
    } else {
      dataList = {
        user_id: userInfo?.id,
        test_id: userInfo?.testID,
        test_type: userInfo?.type,
        part: "all",
        data: data,
        test_status: writingTestStatus,
        section_type: "writing",
      };
    }
    dispatch(
      postAllQuestionsList({
        header,
        dataList,
        onSuccess: (response) => {
          if (response?.data?.statusCode === 200) {
            setLoaderStatus(false);
            setApiReponse(true);
            setLoaderStatus(true);
            if (userInfo?.redirect_url) {
              // window.location.replace(userInfo?.redirect_url);
              window.location.replace(
                `${window.origin + "/ielts/SpeakingSection"}`
              );
            } else {
              window.location.replace(
                `${window.origin + "/Student/dashboard"}`
              );
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
          setShowAlert(true);
          setDefaultTestStatus(599);
          setMessageAlert(error?.message);
          setApiType(defaultMessages?.submitAnswerAPI);
        },
      })
    );
  };

  // Customize error titles
  const customizeErrorTitle = (errorType) => {
    if (errorType && errorType === "typography") {
      return "Typography Error";
    } else if (errorType && errorType === "spelling") {
      return "Spelling Error";
    } else if (errorType && errorType === "grammar") {
      return "Grammar Error";
    } else if (errorType && errorType === "whitespace") {
      return "Whitespace Error";
    } else {
      return `${errorType} Error`;
    }
  };

  // Customize error suggestion
  const customizeErrorSugg = (suggestion) => {
    if (suggestion !== "" && suggestion !== undefined && suggestion !== null) {
      return `<b>Suggestions</b><br/><br/>${suggestion}`;
    } else {
      return `<b>Suggestions</b><br/><br/>No suggestion`;
    }
  };

  // Customize error description
  const customizeErrorDesc = (description) => {
    return description;
  };

  // Grammar score calculation
  const grammarScoreCalculation = (totalWords, grammarError, multiply) => {
    let getperWordScore = 100 / totalWords;
    let wrongWordScore = getperWordScore * grammarError * multiply;
    let grammarScore = 100 - wrongWordScore;
    if (grammarScore > 0 && grammarScore <= 100) {
      return grammarScore;
    } else {
      return 0;
    }
  };

  // Spelling score calculation
  const spellingScoreCalculation = (totalWords, spellingError, multiply) => {
    let getperWordScore = 100 / totalWords;
    let wrongWordScore = getperWordScore * spellingError * multiply;
    let spellingScore = 100 - wrongWordScore;
    if (spellingScore > 0 && spellingScore <= 100) {
      return spellingScore;
    } else {
      return 0;
    }
  };

  // Grammar Api Integration
  const grammarValidationApi = async (typeData, text, indexdb) => {
    let errorCount = 0;
    let grammarError = 0;
    let spellingError = 0;
    let textData;
    if (text.length !== 0) {
      try {
        await axios
          .get(
            `https://api.textgears.com/analyze?key=v8ZdSwaDEOaPNT5w&text=${text}&language=en-GB&ai=true`
          )
          .then((data) => {
            data?.data?.response?.grammar?.errors.map((items) => {
              if (
                items.bad !== "" &&
                items?.description?.en.includes("is American English.") ===
                  false
              ) {
                if (items.type === "grammar" || items.type === "typography") {
                  grammarError++;
                }
                if (items.type === "spelling") {
                  spellingError++;
                }
                errorCount++;
                // Customize user answer and Replace wrong word with html tags
                textData =
                  typeData &&
                  (" " + typeData?.answer + " ")?.replace(
                    " " + items.bad?.trim() + " ",
                    " " +
                      `<span class="error-main-wrap">
                    <span class="wrong-innertext">${items?.bad}</span>
                    <span class="error-sugg-box">
                      <span class="error-title">${customizeErrorTitle(
                        items?.type
                      )}</span>
                      <span class="currect-word">${customizeErrorSugg(
                        items?.better?.toString()
                      )}</span>
                      <span class="error-des">${customizeErrorDesc(
                        items?.description?.en
                      )}</span>
                    </span>
                  </span>
                  ` +
                      " "
                  );

                typeData.answer = textData?.trim();
                advancedIELTSDatabase.writingTestAnswer.update(typeData.id, {
                  answer: typeData?.answer,
                });
              }
              return items;
            });

            // Enabling score calculation (grammar, Spelling,Lexical_Resource )

            let getTotalWord = typeData && typeData?.word_count;
            if (getTotalWord && getTotalWord > 0 && getTotalWord > errorCount) {
              // Grammar and Spelling

              if (getTotalWord > 0 && getTotalWord <= 50) {
                let newGrammarScore = grammarScoreCalculation(
                  getTotalWord,
                  grammarError,
                  1
                );
                typeData.grammar = newGrammarScore;
                let newSpellingScore = spellingScoreCalculation(
                  getTotalWord,
                  spellingError,
                  3
                );
                typeData.spelling = newSpellingScore;
              } else if (getTotalWord > 50 && getTotalWord <= 150) {
                let newGrammarScore = grammarScoreCalculation(
                  getTotalWord,
                  grammarError,
                  2
                );
                typeData.grammar = newGrammarScore;
                let newSpellingScore = spellingScoreCalculation(
                  getTotalWord,
                  spellingError,
                  6
                );
                typeData.spelling = newSpellingScore;
              } else if (getTotalWord > 150) {
                let newGrammarScore = grammarScoreCalculation(
                  getTotalWord,
                  grammarError,
                  3
                );
                typeData.grammar = newGrammarScore;
                let newSpellingScore = spellingScoreCalculation(
                  getTotalWord,
                  spellingError,
                  9
                );
                typeData.spelling = newSpellingScore;
              }

              // Vocabulary
              const primaryVocabulary =
                data?.data?.response?.stats?.fleschKincaid?.readingEase;
              let lexical_resource11 = 100 - primaryVocabulary;
              if (lexical_resource11 > 0 && lexical_resource11 <= 100) {
                typeData.lexical_resource = lexical_resource11;
              } else if (lexical_resource11 < 0) {
                typeData.lexical_resource = 0;
              } else if (lexical_resource11 > 100) {
                typeData.lexical_resource = 100;
              }
              // Update user answer Vocabulary score in IDB
              const textData =
                typeData && typeData?.userAnswer.replaceAll(" . ", ".");
              const textData1 = textData && textData.replaceAll(" , ", ",");
              const textData2 = textData1 && textData1.replaceAll(" ? ", "?");
              const textData3 = textData2 && textData2.replaceAll(" ! ", "!");
              const textData4 = textData3 && textData3.replaceAll(' " ', '"');
              typeData.userAnswer = textData4?.trim();

              advancedIELTSDatabase.writingTestAnswer.update(typeData.id, {
                userAnswer: typeData.userAnswer,
                grammar: typeData.grammar,
                spelling: typeData.spelling,
                lexical_resource: typeData.lexical_resource,
                grade: data?.data?.response?.stats?.fleschKincaid?.grade,
              });
            }
            QuestionwithError.push({
              index: 0,
              error: errorCount,
            });

            QuestionwithError = [];
            spellingError = 0;
            grammarError = 0;
            errorCount = 0;
            console.log(
              indexdb,
              "getAnswerWritingTestDataOfDB",
              getAnswerWritingTestDataOfDB
            );
            if (indexdb === getAnswerWritingTestDataOfDB.length - 1) {
              setGrammarResponseStatus(true);
            }
          });
      } catch (error) {
        // When API is fail then Update user answer in IDB
        const textData = typeData && typeData?.answer.replaceAll(" . ", ".");
        const textData1 = textData && textData.replaceAll(" , ", ",");
        const textData2 = textData1 && textData1.replaceAll(" ? ", "?");
        const textData3 = textData2 && textData2.replaceAll(" ! ", "!");
        const textData4 = textData3 && textData3.replaceAll(' " ', '"');
        typeData.answer = textData4?.trim();
        advancedIELTSDatabase.writingTestAnswer.update(typeData.id, {
          answer: typeData.answer,
        });
      }
    } else {
      setGrammarResponseStatus(true);
    }
  };

  const addResumeQueTypeDataToIDB = async (tempObj) => {
    const newData =
      (await getAnswerWritingTestDataOfDB.length) === 0 &&
      (await getAnswerWritingTestDataOfDB.filter(
        (item) => item?.data?.id === tempObj?.data?.id
      ));
    if (newData && newData.length === 0) {
      await advancedIELTSDatabase.writingTestAnswer.add(tempObj);
    } else if (newData && newData.length !== 0) {
      await advancedIELTSDatabase.writingTestAnswer.update(
        newData[0]?.id,
        tempObj
      );
    }
  };

  const customRound = (number) => {
    return (number * 2).toFixed() / 2;
  };
  // store dat in resume time
  const addListeningResumeQueTypeDataToIDB = async (tempObj) => {
    const newData =
      (await getAnswerListeningTestDataOfDB.length) === 0 &&
      (await getAnswerListeningTestDataOfDB.filter(
        (item) => item?.data?.id === tempObj?.data?.id
      ));
    if (newData && newData.length === 0) {
      await advancedIELTSDatabase.listeningTestAnswer.add(tempObj);
    } else if (newData && newData.length !== 0) {
      await advancedIELTSDatabase.listeningTestAnswer.update(
        newData[0]?.id,
        tempObj
      );
    }
  };

  const addReadingResumeQueTypeDataToIDB = async (tempObj) => {
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

  return (
    <>
      <CustomAlert
        apiType={apiType}
        title={"Alert"}
        showAlert={showAlert}
        message={messageAlert}
        handleCloseAlert={handleCloseAlert}
        handleNextSection={handleNextSection}
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
        format={[]}
      />

      {loaderStatus ? (
        <AppLoader title="" />
      ) : (
        <div>
          <div className="main-title-Questions">
            <h4>{showQuationPart}</h4>
            <p>
              Read the text box below And Answer Questions
              {selectedIndex <= 1 ? " 1 " : "2"}
            </p>
          </div>
          <Container fluid>
            {selectedIndex <= 1 && (
              <Task1
                Image={questionData?.writing?.question_data?.part_1?.image}
                question={
                  questionData?.writing?.question_data?.part_1?.question
                }
                userAnswer={userAnswer1}
                setUserAnswer={setUserAnswer1}
                relevantWords={questionData?.writing?.question_data?.part_1?.relevant_words.split(
                  ","
                )}
              />
            )}

            {selectedIndex === 2 && (
              <Task2
                Image={questionData?.writing?.question_data?.part_2?.image}
                question={
                  questionData?.writing?.question_data?.part_2?.question
                }
                userAnswer={userAnswer2}
                setUserAnswer={setUserAnswer2}
                relevantWords={questionData?.writing?.question_data?.part_2?.relevant_words.split(
                  ","
                )}
              />
            )}
          </Container>
          <Footer
            parts={"W"}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            paginationDataArry={[1, 2]}
            format={[1, 2, 34, 5]}
          />
        </div>
      )}
    </>
  );
};

export default WritingSection;
