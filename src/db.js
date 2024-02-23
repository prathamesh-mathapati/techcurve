import Dexie from "dexie";

const advancedIELTSDatabase = new Dexie("PREP-IELTS-27"); // database name
advancedIELTSDatabase.version(1).stores({
  speakingTestAnswer: "++id",
});
advancedIELTSDatabase.version(1).stores({
  writingTestAnswer: "++id",
});
advancedIELTSDatabase.version(1).stores({
  readingTestAnswer: "++id",
});
advancedIELTSDatabase.version(1).stores({
  listeningTestAnswer: "++id",
});
advancedIELTSDatabase.version(1).stores({
  customTestAnswer: "++id",
});

advancedIELTSDatabase.version(1).stores({
  readingTestQuestions: "++id",
});

advancedIELTSDatabase.version(1).stores({
  listeningTestQuestions: "++id",
});
advancedIELTSDatabase.version(1).stores({
  speakingTestQuestions: "++id",
});
advancedIELTSDatabase.version(1).stores({
  writingTestQuestions: "++id",
});

advancedIELTSDatabase.version(1).stores({
  customeTestQuestions: "++id",
});
export default advancedIELTSDatabase;
