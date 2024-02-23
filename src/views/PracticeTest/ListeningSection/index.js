import React from "react";
import "./style.scss";
// import LsentenceCompletion from "../../../components/ListeningQuationType/LsentenceCompletion";
import Footer from "../../../components/Footer";
import { Button, Container, Form } from "react-bootstrap";
import LChoiceMultipleChoiceOneAsw from "../../../components/ListeningQuationType/LChoiceMultipleChoiceOneAsw";
import LChoiceMultipleChoiceTreeAsw from "../../../components/ListeningQuationType/LChoiceMultipleChoiceTreeAsw";
import LMatching from "../../../components/ListeningQuationType/LMatching";
import LfillInTheBlnaks from "../../../components/ListeningQuationType/LfillInTheBlnaks";
import LshortAnswer from "../../../components/ListeningQuationType/LshortAnswer";
import { LPlanMapDiagram } from "../../../components/ListeningQuationType/LPlanMapDiagram";
import Header from "../../../components/Header";
import ActionNavButton from "../../../components/ActionNavButton";
import CustomAlert from "../../../components/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import SoundImg from "../../../assets/Image/sound.png";
import LtableFillintheBlanks from "../../../components/ListeningQuationType/LtableFillintheBlanks";
import { getAllQuestionsList } from "../../../redux/actions/QuestionAction";
import { useDispatch } from "react-redux";
import LFillInTheSelect from "../../../components/ListeningQuationType/LFillInTheSelect";
import AppLoader from "../../../components/CustomLoader";
import reactStringReplace from "react-string-replace";
import { useLiveQuery } from "dexie-react-hooks";
import advancedIELTSDatabase from "../../../db";
import { postAllQuestionsList } from "../../../redux/actions/SubmitAction";
import { defaultMessages } from "../../../utilities/messege";

let checkArry = [];
const ListeningSection = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const myRef = React.useRef();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [newResumeArry, setNewResumeArry] = React.useState([]);

  const [showQuationPart, setShowQuationPart] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [apiType, setApiType] = React.useState("");
  const [defaultTestStatus, setDefaultTestStatus] = React.useState("");
  const [messageAlert, setMessageAlert] = React.useState("");
  const [audioVolume, setAudioVolume] = React.useState(100);
  const [audioStatus, setaudioStatus] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [statusOfShowsections, setStatusOfShowsections] = React.useState("");
  const [callShowAnswer, setCallShowAnswer] = React.useState(true);

  const [apiReponse, setApiReponse] = React.useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const positionOfquestions = JSON.parse(localStorage.getItem("position"));
  const userlocalInfo = JSON.parse(localStorage.getItem("userlocalInfo"));
  // Get answer Listening  Test Data of IDB
  const getAnswerListeningTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.listeningTestAnswer.toArray(),
    []
  );

  // Get questions Listening  Test Data of IDB
  const getQuestionsListeningTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.listeningTestQuestions.toArray(),
    []
  );
  const [loaderStatus, setLoaderStatus] = React.useState(false);
  // question state
  const [questionData, setQuestionData] = React.useState([]);

  let AllInput = document.querySelectorAll("input");

  // for refresh time
  React.useEffect(() => {
    if (callShowAnswer) {
      if (AllInput.length > 5) {
        setCallShowAnswer(false);
      }
      showAnswer("not_call_API");
    }
  }, [AllInput, callShowAnswer]);

  React.useEffect(() => {
    showAnswer("call_API");
  }, [getQuestionsListeningTestDataOfDB, showQuationPart]);

  React.useEffect(() => {
    if (selectedIndex <= 10) {
      setShowQuationPart("Part 1");
    } else if (selectedIndex >= 11 && selectedIndex <= 20) {
      setShowQuationPart("Part 2");
    } else if (selectedIndex >= 21 && selectedIndex <= 30) {
      setShowQuationPart("Part 3");
    } else if (selectedIndex >= 31 && selectedIndex <= 40) {
      setShowQuationPart("Part 4");
    }

    if (selectedIndex !== 1) {
      if (userInfo?.type === "M") {
        localStorage.setItem(
          "position",
          JSON.stringify({ positionOfquestions: `L_${selectedIndex}` })
        );
      } else if (userInfo?.type === "P") {
        localStorage.setItem(
          "position",
          JSON.stringify({ ...positionOfquestions, listening: selectedIndex })
        );
      }
    }
  }, [selectedIndex]);

  const handleCloseAlert = (status) => {
    if (status === "start") {
      setShowAlert(false);
      myRef.current.play();
      myRef.current.currentTime = currentTime;
    } else {
      setShowAlert(false);
      handleNextSection("loader");
    }
  };
  // handle next function
  const handleNextSection = async (loader) => {
    setShowAlert(false);
    let part_1 = [];
    let part_2 = [];
    let part_3 = [];
    let part_4 = [];
    let totalScore = 0;
    let band = 0;
    (await getAnswerListeningTestDataOfDB) &&
      getAnswerListeningTestDataOfDB.filter((element, index) => {
        totalScore += element?.score;

        if (element?.id <= 10) {
          part_1.push({
            id: element?.id,
            user_answer: element?.user_answer,
            score: element?.score,
            question_type: element?.question_type,
            correct_answer: `${element?.correct_answer}${
              element?.subId ? `&${element?.subId}` : ""
            }`,
          });
        } else if (element?.id >= 11 && element?.id <= 20) {
          part_2.push({
            id: element?.id,
            user_answer: element?.user_answer,
            score: element?.score,
            question_type: element?.question_type,
            correct_answer: `${element?.correct_answer}${
              element?.subId ? `&${element?.subId}` : ""
            }`,
          });
        } else if (element?.id >= 21 && element?.id <= 30) {
          part_3.push({
            id: element?.id,
            user_answer: element?.user_answer,
            score: element?.score,
            question_type: element?.question_type,
            correct_answer: `${element?.correct_answer}${
              element?.subId ? `&${element?.subId}` : ""
            }`,
          });
        } else if (element?.id >= 31 && element?.id <= 40) {
          part_4.push({
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
    } else if (totalScore >= 32) {
      band = 7.5;
    } else if (totalScore >= 30) {
      band = 7;
    } else if (totalScore >= 26) {
      band = 6.5;
    } else if (totalScore >= 23) {
      band = 6;
    } else if (totalScore >= 18) {
      band = 5.5;
    } else if (totalScore >= 16) {
      band = 5;
    } else if (totalScore >= 13) {
      band = 4.5;
    } else if (totalScore >= 11) {
      band = 4;
    } else if (totalScore >= 0) {
      band = 0;
    }
    let newObject = {};
    if (userInfo?.type === "M") {
      newObject = {
        last_question: `L|${selectedIndex}`,
        listening: {
          audio_time: currentTime.toFixed(2),
          status: loader === "save_and_exit" ? "P" : "C",
          module_time: userInfo?.session_time,
          answer_data: {
            part_1,
            part_2,
            part_3,
            part_4,
          },
          score_data: {
            band: band,
            correct_answers: totalScore,
          },
        },
      };
    } else {
      newObject = {
        last_question: { ...positionOfquestions, listening: selectedIndex },
        listening: {
          audio_time: currentTime.toFixed(2),
          status: loader === "save_and_exit" ? "P" : "C",
          listening_module_time: userInfo?.session_time,
          answer_data: {
            part_1,
            part_2,
            part_3,
            part_4,
          },
          score_data: {
            band: band,
            correct_answers: totalScore,
          },
        },
      };
    }

    sectionEndApi(newObject, loader);
  };

  React.useEffect(() => {
    if (audioStatus) {
      // myRef.current.play();
    }
    setaudioStatus(true);
    let myAudio = document.querySelector("#myAudio");

    if (audioVolume > 50) {
      myAudio.volume = (audioVolume / 100).toFixed(2);
    } else {
      myAudio.volume = (audioVolume / 1000).toFixed(2);
    }
  }, [audioVolume]);

  const volumeHandel = (value) => {
    setAudioVolume(value);
  };

  // for call question API
  const getQuestionsApi = (sectionType, testStatus) => {
    const header = {
      Accept: "application/json",
      "user-id": userInfo?.id,
      "api-token": userInfo?.api_token,
    };
    const dataList = {
      user_id: userInfo?.id,
      test_id: userInfo?.testID,
      test_type: userInfo?.type,
      section_type: sectionType,
      part: "all",
      test_status: testStatus,
      internet_speed: userInfo?.internet_speed,
    };
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
            if (sectionType === "listening") {
              advancedIELTSDatabase.listeningTestQuestions.add(
                response?.data?.data
              );
              if (
                userInfo?.type === "M" &&
                response?.data?.audio_time &&
                response?.data?.last_question?.split("|")[0] === "L"
              ) {
                let timeaudio = response?.data?.audio_time;
                setTimeout(() => {
                  myRef.current.currentTime = Number(timeaudio);
                }, 1000);
              } else if (
                userInfo?.type === "P" &&
                response?.data?.audio_time &&
                response?.data?.last_question
              ) {
                let timeaudio = response?.data?.audio_time;
                setTimeout(() => {
                  myRef.current.currentTime = Number(timeaudio);
                }, 1000);
              }

              if (response?.data?.data?.listening?.student_answers) {
                let allReasumeData = [
                  ...JSON.parse(
                    response?.data?.data?.listening?.student_answers?.part_1
                  ),
                  ...JSON.parse(
                    response?.data?.data?.listening?.student_answers?.part_2
                  ),
                  ...JSON.parse(
                    response?.data?.data?.listening?.student_answers?.part_3
                  ),
                  ...JSON.parse(
                    response?.data?.data?.listening?.student_answers?.part_4
                  ),
                ];
                setNewResumeArry(allReasumeData);

                allReasumeData.forEach(async (item) => {
                  const correctAnswerParts = item.correct_answer.split("&");
                  item.correct_answer = correctAnswerParts[0];

                  if (correctAnswerParts.length === 2) {
                    item.subId = correctAnswerParts[1];
                  }

                  try {
                    showMsmc(item);
                    await addResumeQueTypeDataToIDB(item);
                    await showAnswer("not_call_API");
                  } catch (error) {}
                });
              }

              if (
                userInfo?.testStatus === "P" &&
                response?.data?.last_question &&
                userInfo?.type === "M"
              ) {
                setSelectedIndex(
                  Number(response?.data?.last_question?.split("|")[1])
                );
                setStatusOfShowsections(
                  response?.data?.last_question?.split("|")[0]
                );
              } else if (
                response?.data?.last_question &&
                userInfo?.type === "P"
              ) {
                let lastQuestion = JSON.parse(response?.data?.last_question);
                localStorage.setItem("position", JSON.stringify(lastQuestion));

                lastQuestion.listening && userInfo?.testStatus === "P"
                  ? setSelectedIndex(Number(lastQuestion.listening))
                  : setSelectedIndex(1);
              }
            }
            if (sectionType === "reading") {
              advancedIELTSDatabase.readingTestQuestions.add(
                response?.data?.data
              );
            }
            setTimeout(() => {
              setLoaderStatus(false);
            }, 2000);
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
          setDefaultTestStatus(error?.status);
          setMessageAlert(error.message);
          setApiType(
            `${defaultMessages?.getQuestionAPI}|${sectionType}|${testStatus}`
          );
          // }
        },
      })
    );
  };

  const commenOnClickHndaler = async (e) => {
    let score = 0;
    let user_answer = typeof e?.target?.value === null ? "" : e?.target?.value;
    let id = e?.target?.id;
    let correct_answer = "";
    let idNum = "";
    if (
      id &&
      getQuestionsListeningTestDataOfDB !== undefined &&
      user_answer !== undefined &&
      id !== undefined &&
      id !== "default-checkbox" &&
      id !== "inline-1" &&
      id !== "inline-2" &&
      id !== "inline-3" &&
      id !== "exampleForm.ControlTextarea1"
    ) {
      if (id.includes("_")) {
        id = id.split("_")[0];
      }
      setSelectedIndex(Number(id));
      if (e?.target?.getAttribute("data-question_type") === "l_mlc") {
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
          const newData = await getAnswerListeningTestDataOfDB.filter(
            (item) => {
              if (item.subId === e.target.id) return item.id;
            }
          );
          newData && newData.length !== 0 && removeItemFromDb(newData[0]?.id);
        }
      }
      let finalUsername = user_answer.split(" ").join("");

      // for l_msmc
      if (e?.target?.getAttribute("data-question_type") === "l_msmc") {
        const newData = await getAnswerListeningTestDataOfDB.filter(
          (item) => item.id === id
        );
        if (e?.target?.checked) {
          if (newData.length !== 0) {
            user_answer =
              newData[0].user_answer + `,${user_answer}`?.replace(/,,/g, "");
          }
        } else {
          if (newData.length !== 0) {
            user_answer = newData[0].user_answer
              .split(",")
              .filter((city) => city.trim() !== user_answer)
              .join(",")
              .replace(/,,/g, "");
          }
        }
      }

      const listeningAnswer = await getQuestionsListeningTestDataOfDB[0]
        ?.listening?.answers;
      JSON.parse(listeningAnswer)?.forEach((element, index) => {
        let correctAnswerPerQuestions = element.split(" ").join("");

        if (e?.target?.getAttribute("data-question_type") !== "l_msmc") {
          if (
            finalUsername &&
            correctAnswerPerQuestions
              ?.toLowerCase()
              ?.split("|")
              ?.includes(finalUsername.toLowerCase()) &&
            id === `${index + 1}`
          ) {
            score = 1;
            correct_answer = element;
          } else if (id === `${index + 1}`) {
            correct_answer = element;
          }
        } else {
          if (
            id === `${index + 1}` &&
            correctAnswerPerQuestions?.split(",").length ===
              finalUsername?.split(",")?.length
          ) {
            let userAnswerArray = finalUsername.split(",");
            let elementArray = correctAnswerPerQuestions.split(",");

            for (let i = 0; i < userAnswerArray.length; i++) {
              let item = userAnswerArray[i];
              if (elementArray.includes(item)) {
                score = 1;
              } else {
                score = 0;
                break;
              }
            }
          } else if (id === `${index + 1}`) {
            correct_answer = element;
          }
        }
      });

      let tempObj = {
        id:
          e?.target?.getAttribute("data-question_type") === "l_mlc"
            ? String(idNum)
            : String(id),
        user_answer,
        question_type: e?.target?.getAttribute("data-question_type"),
        score,
        correct_answer,
        showQuationPart,
        subId:
          e?.target?.getAttribute("data-question_type") === "l_mlc" ||
          e.target.type === "radio"
            ? e?.target?.id
            : "",
      };

      const newData = await getAnswerListeningTestDataOfDB.filter(
        (item) => item.id === tempObj.id
      );

      if (
        e?.target?.getAttribute("data-question_type") === "l_mlc" &&
        e?.target?.checked === true
      ) {
        if (tempObj?.user_answer !== undefined) {
          if (newData.length === 0) {
            try {
              await advancedIELTSDatabase.listeningTestAnswer.add(tempObj);
            } catch (err) {}
          } else if (newData.length !== 0) {
            try {
              await advancedIELTSDatabase.listeningTestAnswer.update(
                newData[0]?.id,
                tempObj
              );
            } catch (err) {
              // console.log(err);
            }
          }
        }
      } else if (e?.target?.getAttribute("data-question_type") !== "l_mlc") {
        if (tempObj?.user_answer !== undefined) {
          if (newData.length === 0) {
            try {
              await advancedIELTSDatabase.listeningTestAnswer.add(tempObj);
            } catch (err) {}
          } else if (newData.length !== 0) {
            try {
              await advancedIELTSDatabase.listeningTestAnswer.update(
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

  const commenOnChangeHndaler = async (e) => {
    let score = 0;
    let user_answer = typeof e?.target?.value === null ? "" : e?.target?.value;
    let id = e?.target?.id;
    let correct_answer = "";
    if (
      id &&
      getQuestionsListeningTestDataOfDB !== undefined &&
      user_answer !== undefined &&
      id !== undefined &&
      e?.target?.getAttribute("data-question_type") !== "l_mlc" &&
      id !== "default-checkbox" &&
      id !== "inline-1" &&
      id !== "inline-2" &&
      id !== "inline-3" &&
      id !== "exampleForm.ControlTextarea1" &&
      e?.target?.getAttribute("data-question_type") !== "l_msmc"
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

      const listeningAnswer = await getQuestionsListeningTestDataOfDB[0]
        ?.listening?.answers;

      let finalUsername = user_answer.split(" ").join("");

      JSON.parse(listeningAnswer)?.forEach((element, index) => {
        let correctAnswerPerQuestions = element.split(" ").join("");
        if (
          finalUsername &&
          correctAnswerPerQuestions
            ?.toLowerCase()
            .split("|")
            ?.includes(finalUsername?.toLowerCase()) &&
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

      const newData = await getAnswerListeningTestDataOfDB.filter(
        (item) => item.id === tempObj.id
      );

      if (tempObj?.user_answer !== undefined) {
        if (newData.length === 0) {
          try {
            await advancedIELTSDatabase.listeningTestAnswer.add(tempObj);
          } catch (err) {}
        } else if (newData.length !== 0) {
          try {
            await advancedIELTSDatabase.listeningTestAnswer.update(
              newData[0]?.id,
              tempObj
            );
          } catch (err) {}
        }
      }
    }
  };
  // for part 1
  function part_1Functoin() {
    reactStringReplace(
      questionData?.listening?.part_1,
      "#functionOnclick#",
      (onclick = (e) => {
        commenOnClickHndaler(e);
      })
    );
    reactStringReplace(
      questionData?.listening?.part_1,
      "#functionOnChange#",
      (onchange = (e) => {
        commenOnChangeHndaler(e);
      })
    );
    return { __html: questionData?.listening?.question_data?.part_1 };
  }
  // for part 2
  function part_2Functoin() {
    reactStringReplace(
      questionData?.listening?.question_data?.part_2,
      "#functionOnclick#",
      (onclick = (e) => {
        commenOnClickHndaler(e);
      })
    );
    reactStringReplace(
      questionData?.listening?.question_data?.part_2,
      "#functionOnChange#",
      (onchange = (e) => {
        commenOnChangeHndaler(e);
      })
    );
    return { __html: questionData?.listening?.question_data?.part_2 };
  }
  // for part 3
  function part_3Functoin() {
    reactStringReplace(
      questionData?.listening?.question_data?.part_3,
      "#functionOnclick#",
      (onclick = (e) => {
        commenOnClickHndaler(e);
      })
    );
    reactStringReplace(
      questionData?.listening?.question_data?.part_3,
      "#functionOnChange#",
      (onchange = (e) => {
        commenOnChangeHndaler(e);
      })
    );
    return { __html: questionData?.listening?.question_data?.part_3 };
  }

  // for part 4
  function part_4Functoin() {
    reactStringReplace(
      questionData?.listening?.question_data?.part_4,
      "#functionOnclick#",
      (onclick = (e) => {
        commenOnClickHndaler(e);
      })
    );
    reactStringReplace(
      questionData?.listening?.question_data?.part_4,
      "#functionOnChange#",
      (onchange = (e) => {
        commenOnChangeHndaler(e);
      })
    );
    return { __html: questionData?.listening?.question_data?.part_4 };
  }

  // for submit api call
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
      section_type: "listening",
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
          setShowAlert(true);
          setDefaultTestStatus(599);
          setMessageAlert(error.message);
          setApiType(defaultMessages?.submitAnswerAPI);
        },
      })
    );
  };

  React.useEffect(() => {
    // for redirect next section
    if (apiReponse) {
      if (
        location?.state?.sectionType === "Reading" &&
        userInfo?.status !== "P"
      ) {
        // getQuestionsApi("reading", "P");
        navigation("/ielts/Instructions", location);
      } else if (location?.pathname === "/ielts/ReadingSection") {
        navigation("/ielts/WritingSection", location);
      }
    }
  }, [apiReponse]);

  React.useEffect(() => {
    const storedTime = localStorage.getItem("audioCurrentTime");

    if (storedTime) {
      setCurrentTime(parseFloat(storedTime));
      setShowAlert(true);
      setDefaultTestStatus("none");
      setMessageAlert("your exam will start...");
    }

    // show refresh time paginations

    if (
      positionOfquestions &&
      positionOfquestions?.positionOfquestions?.includes("L") &&
      userInfo?.type === "M"
    ) {
      setSelectedIndex(
        Number(positionOfquestions?.positionOfquestions.split("_")[1])
      );
    } else if (positionOfquestions && positionOfquestions?.listening) {
      setSelectedIndex(Number(positionOfquestions?.listening));
    }
  }, []);

  React.useEffect(() => {
    // Save the current time to localStorage when the time changes
    if (currentTime) {
      localStorage.setItem("audioCurrentTime", currentTime.toString());
    }
  }, [currentTime]);

  const addResumeQueTypeDataToIDB = async (tempObj) => {
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

  // for show our answer

  const showAnswer = (status) => {
    if (
      getQuestionsListeningTestDataOfDB?.length === 0 &&
      status === "call_API" &&
      !loaderStatus
    ) {
      setLoaderStatus(true);
      getQuestionsApi("listening", userInfo?.testStatus);
    } else if (
      getQuestionsListeningTestDataOfDB !== undefined &&
      getQuestionsListeningTestDataOfDB.length !== 0
    ) {
      setQuestionData(getQuestionsListeningTestDataOfDB[0]);

      if (getAnswerListeningTestDataOfDB !== undefined) {
        setTimeout(() => {
          AllInput = document.querySelectorAll("input");

          if (getAnswerListeningTestDataOfDB.length !== 0) {
            getAnswerListeningTestDataOfDB.forEach((element, index) => {
              let Qid = document.getElementById(`${element?.id}`);

              if (Qid !== null) {
                let QSubId = document.getElementById(`${element?.subId}`);
                if (QSubId && QSubId?.type === "radio") {
                  QSubId.checked = true;
                }
              }
              if (
                Qid !== null &&
                element?.question_type !== "l_mlc" &&
                element?.question_type !== "l_msmc"
              ) {
                Qid.value = element?.user_answer;
              } else if (element?.question_type === "l_mlc") {
                let QSubId = document.getElementById(`${element?.subId}`);
                if (QSubId) {
                  QSubId.checked = true;
                }
                let checkCount = 0;
                let id = element.subId.split("_")[0];
                AllInput?.forEach((alliEle) => {
                  if (alliEle?.id.includes(id)) {
                    if (alliEle?.checked === true) {
                      checkCount++;
                    }

                    if (checkCount !== element.subId?.split("_").length - 1) {
                      document.getElementById(alliEle.id).disabled = false;
                    } else if (alliEle?.checked === true) {
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
              } else if (element?.question_type === "l_msmc") {
                showMsmc(element);
              }
            });
          } else if (newResumeArry.length !== 0) {
            newResumeArry.forEach((element, index) => {
              let Qid = document.getElementById(`${element?.id}`);

              if (Qid !== null) {
                let QSubId = document.getElementById(`${element?.subId}`);
                if (QSubId && QSubId?.type === "radio") {
                  QSubId.checked = true;
                }
              }
              if (
                Qid !== null &&
                element?.question_type !== "l_mlc" &&
                element?.question_type !== "l_msmc"
              ) {
                Qid.value = element?.user_answer;
              } else if (element?.question_type === "l_mlc") {
                let QSubId = document.getElementById(`${element?.subId}`);
                if (QSubId) {
                  QSubId.checked = true;
                }
                let checkCount = 0;
                let id = element.subId.split("_")[0];
                AllInput?.forEach((alliEle) => {
                  if (alliEle?.id.includes(id)) {
                    if (alliEle?.checked === true) {
                      checkCount++;
                    }

                    if (checkCount !== element.subId?.split("_").length - 1) {
                      document.getElementById(alliEle.id).disabled = false;
                    } else if (alliEle?.checked === true) {
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
              } else if (element?.question_type === "l_msmc") {
                showMsmc(element);
              }
            });
          }

          // remove sujections
          let tagArr = document.getElementsByTagName("input");
          for (let i = 0; i < tagArr.length; i++) {
            tagArr[i].autocomplete = "off";
          }
        }, 200);
      }
    }
  };

  const showMsmc = (element) => {
    AllInput.forEach((inputele) => {
      if (inputele?.getAttribute("data-question_type") === "l_msmc") {
        element?.user_answer?.split(",").forEach((userValues) => {
          if (
            userValues === inputele?.value &&
            inputele?.id?.split("_")?.[0] == element?.id
          ) {
            inputele.checked = true;
          }
        });
      }
    });
  };
  // show next section when user save and exite
  React.useEffect(() => {
    if (statusOfShowsections !== "L") {
      if (statusOfShowsections === "R") {
        navigation("/ielts/Instructions", {
          state: {
            sectionType: "Reading",
          },
        });
      } else if (statusOfShowsections === "W") {
        navigation("/ielts/Instructions", {
          state: { sectionType: "writing" },
        });
      }
    }
  }, [statusOfShowsections]);

  const removeItemFromDb = async (id) => {
    await advancedIELTSDatabase.listeningTestAnswer.delete(id);
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
        volumeHandel={volumeHandel}
        audioVolume={audioVolume}
        format={[]}
      />
      {userInfo?.testStatus === "A" ? (
        <audio
          id="myAudio"
          src={questionData?.listening?.audio}
          preload="auto"
          autoPlay
          ref={myRef}
          onTimeUpdate={() => setCurrentTime(myRef.current.currentTime)}
          controls={false}
          controlsList="nodownload"
        />
      ) : (
        <div className="d-flex valume-handal">
          <audio
            id="myAudio"
            src={questionData?.listening?.audio}
            preload="auto"
            autoPlay
            ref={myRef}
            onTimeUpdate={() => setCurrentTime(myRef.current.currentTime)}
            controls={true}
            controlsList="nodownload"
          />
        </div>
      )}
      {loaderStatus ? (
        <AppLoader title="" />
      ) : (
        <div>
          <div className="main-Listening-wpper">
            <div className="main-listening-sec">
              <Container>
                {selectedIndex <= 10 ? (
                  <>
                    {/* <LChoiceMultipleChoiceOneAsw
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  interaction={"Write ONE WORD AND/OR A NUMBER in each gap"}
                  questionsTo={1}
                  questions={[
                    {
                      questions:
                        "Why did Judy choose to study the East End of London?",
                      options: [
                        "She wanted to understand her own background.",
                        "She was interested in place names.",
                        "She had read several books about it.",
                      ],
                    },
                    {
                      questions:
                        "What difficulty did Judy have with her dissertation?",
                      options: [
                        "writing the first draft",
                        "organising what she had collected",
                        "finding enough relevant sources",
                      ],
                    },
                    {
                      questions: "What was Judy’s main source of materials?",
                      options: ["books", "newspapers", "interviews"],
                    },
                  ]}
                  questionsNo={1}
                /> */}
                    {/* <LtableFillintheBlanks
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      interaction={"Write ONE WORD AND/OR A NUMBER in each gap"}
                      questionsTo={1}
                      questions={questionData?.part_1?.l_ftns}
                      questionsNo={0}
                    /> */}

                    <div dangerouslySetInnerHTML={part_1Functoin()} />
                  </>
                ) : selectedIndex >= 4 && selectedIndex <= 6 ? (
                  {
                    /* <LChoiceMultipleChoiceTreeAsw
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                questionsTo={"Questions 4-6"}
                interaction={"Choose THREE correct answers."}
                options={[
                  "book reservations",
                  "reading room rules",
                  "catalogue",
                  "disabled facilities",
                  "location of rooms",
                  "café",
                  "regular events",
                  "staff",
                ]}
              /> */
                  }
                ) : selectedIndex >= 7 && selectedIndex <= 10 ? (
                  {
                    /* <LMatching
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                interaction={
                  "Who is responsible for each area? Choose the correct answer and move it into the gap."
                }
                questionsTo={"Questions 7 – 11"}
                questions={{
                  questions: [
                    " Mary Brown  1. #DD#  John Stevens 2. #DD#  John Stevens 3. #DD#  Tim Smith 4. #DD# Jenny James  5. #DD#",
                  ],
                  options: [
                    "Finance",
                    "Food",
                    "health",
                    "Kid's Counselling",
                    "Organisation",
                    "Rooms",
                    "Sports",
                    "Trips",
                  ],
                }}
                questionsNo={7}
              /> 
              
              <LPlanMapDiagram
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                colum={["Quilt Shop	", "Handicrafts Museum", "School House"]}
                row={["", "A", "B", "C", "D", "E", "F", "G", "H"]}
                questionsNo={11}
              />
              */
                  }
                ) : selectedIndex >= 11 && selectedIndex <= 20 ? (
                  <>
                    {/* <LChoiceMultipleChoiceTreeAsw
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      questionsTo={"Questions 11-14"}
                      interaction={"Choose THREE correct answers."}
                      questions={questionData?.part_2?.l_mlc}
                    />

                    <LFillInTheSelect
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      questionsTo={"Questions 15-20"}
                      questions={questionData?.part_2?.l_mpdl}
                      questionsNo={14}
                    /> */}
                    <div dangerouslySetInnerHTML={part_2Functoin()} />
                  </>
                ) : selectedIndex >= 14 && selectedIndex <= 20 ? (
                  {
                    /* <LfillInTheBlnaks
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                interaction={
                  "Complete the notes. Write ONE WORD AND/OR A NUMBER in each gap."
                }
                subTitel={"Phone call about second-hand furniture"}
                questionsTo={""}
                questions={[
                  "Dining table- #DD# shape ",
                  " - #DD# old",
                  "Dining chairs- set of #DD# chairs",
                  " - seats covered in #DD# materia",
                  " - in #DD# condition",
                  " Desk- length:  #DD#",
                  "- 3 drawers. Top drawer has a  #DD#",
                ]}
                questionsNo={14}
              /> */
                  }
                ) : selectedIndex >= 21 && selectedIndex <= 30 ? (
                  <>
                    {/* <LChoiceMultipleChoiceOneAsw
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      interaction={"Choose the correct answer."}
                      options={[
                        {
                          questions:
                            "to suggest that most people’s earliest memories are of themselves.",
                          option: "",
                        },
                        {
                          questions:
                            "to illustrate how earliest memories reflect cultural values.",
                          option: "",
                        },
                        {
                          questions:
                            "to contrast two methods of researching earliest memories.",
                          option: "",
                        },
                        {
                          questions:
                            "to explain why some earliest memories last longer than others.",
                          option: "",
                        },
                        {
                          questions:
                            "What is the writer doing in the final paragraph?",
                          option: "",
                        },
                      ]}
                      questionsTo={"Questions 21 – 30"}
                      questions={questionData?.part_3?.l_sc}
                      questionsNo={21}
                    />

                    <LshortAnswer
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      interaction={
                        "Answer the questions. Write ONE WORD ONLY in each gap."
                      }
                      subTitel={
                        "List THREE types of staff that Pacific Clothing want to recruit at present. "
                      }
                      questionsTo={""}
                      questions={questionData?.part_3?.l_ftns}
                      questionsNo={26}
                      option={["#DD#", "#DD#"]}
                    /> */}

                    <div dangerouslySetInnerHTML={part_3Functoin()} />
                  </>
                ) : selectedIndex >= 31 && selectedIndex <= 40 ? (
                  <>
                    {/* <LtableFillintheBlanks
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      interaction={"Write ONE WORD AND/OR A NUMBER in each gap"}
                      questionsTo={1}
                      questions={questionData?.part_4?.l_sc}
                      questionsNo={30}
                    /> */}
                    {/* <LfillInTheBlnaks
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                interaction={
                  "Complete the notes. Write ONE WORD AND/OR A NUMBER in each gap."
                }
                subTitel={"Phone call about second-hand furniture"}
                questionsTo={""}
                questions={questionData?.part_4?.sc}
                questionsNo={31}
              /> */}
                    <div
                      dangerouslySetInnerHTML={part_4Functoin()}
                      className="part"
                    />
                  </>
                ) : (
                  <>
                    {/* selectedIndex >= 38 && selectedIndex <= 40 ? (
              <LPlanMapDiagram
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                colum={["Quilt Shop	", "Handicrafts Museum", "School House"]}
                row={["", "A", "B", "C", "D", "E", "F", "G", "H"]}
                questionsNo={38}
              />
            ) : */}
                  </>
                )}
              </Container>
            </div>
            <Footer
              parts={"L"}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              paginationDataArry={[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                35, 36, 37, 38, 39, 40,
              ]}
              format={[1, 2, 34, 5]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListeningSection;
