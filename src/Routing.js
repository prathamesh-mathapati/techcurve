import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MockTest from "./views/MockTest";
import ReadingSection from "./views/PracticeTest/ReadingSection";
import WritingSection from "./views/PracticeTest/WritingSection";
import ListeningSection from "./views/PracticeTest/ListeningSection";
import SpeakingSection from "./views/PracticeTest/SpeakingSection";
import InfoSection from "./components/InformationScreen";
import TestSound from "./components/TestSound";
import Instructions from "./components/Instructions";
import { AppContextApl } from "./AppContextApl";
import HelpAlter from "./components/HelpAlter";
import AppLoader from "./components/CustomLoader";
import MicRecorder from "../src/components/MicRecorder";


const Routing = () => {
  const [speakingpart, setSpakingPart] = useState(1);
  const [contextState, setContextState] = React.useState({
    listeningSectionTime: { timeWithMin: "00:30:00", timeWithsec: "30:00" },
    readingSectionTime: { timeWithMin: "01:00:00", timeWithsec: "30:00" },
    writingSectionTime: { timeWithMin: "01:00:00", timeWithsec: "30:00" },
    // speakingSection: {
    //   part1: "00:05:00",
    //   part2: "00:04:00",
    //   part3: "00:05:00",
    // },
    speakingSectionTime: { timeWithMin: "00:15:00", timeWithsec: "30:00" },
  });
  const handelDefultTime = () => {
    setContextState({
      ...contextState,
      listeningSectionTime: contextState.listeningSectionTime,
    });
  };

  // Set default values in context variable
  return (
    <AppContextApl.Provider
      value={{
        handelDefultTime,
        contextState,
        setContextState,
        speakingpart,
        setSpakingPart,
      }}
    >
      <Routes>
        <Route path="/front/ielts" element={<ListeningSection />} />
        <Route path="/ielts/MockTest" element={<MockTest />} />
        <Route path="/ielts/ReadingSection" element={<ReadingSection />} />
        <Route path="/ielts/WritingSection" element={<WritingSection />} />
        <Route path="/ielts/ListeningSection" element={<ListeningSection />} />
        <Route path="/ielts/SpeakingSection" element={<SpeakingSection />} />
        <Route path="/ielts/MicRecorder" element={<MicRecorder />} />
        <Route path="/ielts/Information" element={<InfoSection />} />
        <Route path="/ielts/Testsound" element={<TestSound />} />
        <Route path="/ielts/Instructions" element={<Instructions />} />
        <Route path="/ielts/HelpAlter" element={<HelpAlter />} />
        <Route path="/ielts/AppLoader" element={<AppLoader />} />
        <Route path="/ielts/MicRecorder" element={<MicRecorder />} />
      </Routes>
    </AppContextApl.Provider>
  );
};

export default Routing;
