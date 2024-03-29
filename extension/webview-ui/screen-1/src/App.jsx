import { useEffect, useRef, useState } from "react";
import MCQTemplate from "./components/MCQ/MCQTemplate.jsx";

function App() {
  const [questionData, setQuestionData] = useState(null);
  const [isExplosion, setIsExplosion] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [btnShow, setBtnShow] = useState(true);
  const vscode = useRef(null);
  if (vscode.current === null) {
    vscode.current = acquireVsCodeApi();
  }
  const [language, setLanguage] = useState("");

  const handleClick = (value) => {
    if (value == questionData.answer) {
      setIsExplosion(true);
      setIsCorrect(true);
      setTimeout(() => {
        setIsExplosion(false);
      }, 3000);
    } else {
      setIsCorrect(false);
    }
    setBtnShow(false);
  };

  const fetchContent = async (language) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}questions?language=${language.lang}`
      );
      const data = await response.json();
      vscode?.current.postMessage({
        command: "server question",
        data: data.data.value,
      });
      setQuestionData(data.data.value);
    } catch (error) {
      console.log(error.message);
      vscode.current.postMessage({ command: "questionLoadError" })
    }
  };

  useEffect(() => {
    window.addEventListener("message", (e) => {
      const message = e.data;
      switch (message.command) {
        case "langChoosen":
          fetchContent(message);
          setLanguage(message.lang);
          break;
        case "reload":
          setQuestionData(message.data)
      }
      // console.log(e.data)
      // fetchContent(e.data)
      // setLanguage(e.data)
    });
    vscode?.current.postMessage({ command: "loaded" });
  }, []);

  return (
    <>
      {questionData && (
        <MCQTemplate
          questionData={questionData}
          isExplosion={isExplosion}
          isCorrect={isCorrect}
          handleClick={handleClick}
          btnShow={btnShow}
        />
      )}
    </>
  );
}

export default App;
