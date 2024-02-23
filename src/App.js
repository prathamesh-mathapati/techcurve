import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import "./style/common-style.scss";
import Routing from "./Routing";
import "bootstrap/dist/css/bootstrap.min.css";
import advancedIELTSDatabase from "./db";

let queryString = "";
function App() {
  const navagation = useNavigate();
  const location = useLocation();
  let getURLQueryString = new URLSearchParams(window?.location?.search);
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  for (const entry of getURLQueryString.entries()) {
    queryString = entry[0];
  }
  let searchParams = new URLSearchParams(queryString);
  // For clear LocalStorage and IndexDB data
  const handleClearLocalStorageData = () => {
    localStorage.clear();
    advancedIELTSDatabase.speakingTestAnswer.clear();
    advancedIELTSDatabase.writingTestAnswer.clear();
    advancedIELTSDatabase.readingTestAnswer.clear();
    advancedIELTSDatabase.listeningTestAnswer.clear();
    advancedIELTSDatabase.listeningTestQuestions.clear();
    advancedIELTSDatabase.readingTestQuestions.clear();
    advancedIELTSDatabase.speakingTestQuestions.clear();
    advancedIELTSDatabase.writingTestQuestions.clear();
    advancedIELTSDatabase.customeTestQuestions.clear();
    advancedIELTSDatabase.customTestAnswer.clear();
  };

  React.useEffect(() => {
    if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
      handleClearLocalStorageData();
    }
    if (searchParams.get("title")) {
      document.title = searchParams.get("title");
    } else if (userInfo?.title) {
      document.title = userInfo?.title;
    }

    if (location?.pathname === "/ielts/" || location?.pathname === "/ielts") {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: searchParams.get("id"),
          type: searchParams.get("type"),
          userType: searchParams.get("userType"),
          api_token: searchParams.get("token"),
          scoreStatus: searchParams.get("scoreStatus"),
          testID: searchParams.get("testID"),
          testStatus: searchParams.get("testStatus"),
          session_time: searchParams.get("session_time"),
          session_que_time: searchParams.get("session_que_time"),
          candidateNo: searchParams.get("candidateNo"),
          birthday: searchParams.get("birthday"),
          internet_speed: searchParams.get("iSpeed"),
          name: searchParams.get("name"),
          sectionType: searchParams.get("sectionType"),
          section_type: searchParams.get("section_type"),
          title: searchParams.get("title")
            ? searchParams.get("title")
            : "Prep27",
          logo:searchParams.get("logo")
        })
      );
      if (searchParams.get("type") === "M") {
        if (
          searchParams.get("section_type") === "Listening" ||
          !searchParams.get("section_type")
        ) {
          navagation("/ielts/Information", {
            state: {
              sectionType: "Listening",
            },
          });
        } else if (searchParams.get("section_type") === "Reading") {
          navagation("/ielts/Information", {
            state: {
              sectionType: "Reading",
            },
          });
        } else if (searchParams.get("section_type") === "Writing") {
          navagation("/ielts/Information", {
            state: {
              sectionType: "writing",
            },
          });
        }
      } else if (searchParams.get("type") === "P") {
        if (searchParams.get("sectionType") === "L") {
          navagation("/ielts/Information", {
            state: {
              sectionType: "Listening",
            },
          });
        } else if (searchParams.get("sectionType") === "R") {
          navagation("/ielts/Information", {
            state: {
              sectionType: "Reading",
            },
          });
        } else if (searchParams.get("sectionType") === "W") {
          navagation("/ielts/Information", {
            state: {
              sectionType: "writing",
            },
          });
        }
      }
    }
    
    // disable cut copy paste in windows

    // document.onkeydown = function (e) {
    //   if (e.ctrlKey && e.key === "c") {
    //     return false;
    //   }
    //   if (e.ctrlKey && e.key === "C") {
    //     return false;
    //   }
    //   if (e.ctrlKey && e.key === "v") {
    //     return false;
    //   }
    //   if (e.ctrlKey && e.key === "V") {
    //     return false;
    //   }
    //   if (e.ctrlKey && e.key === "x") {
    //     return false;
    //   }
    //   if (e.ctrlKey && e.key === "X") {
    //     return false;
    //   }
    // };
  }, []);

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
