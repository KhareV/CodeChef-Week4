import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
const ColorPicker = ({ onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState("#561ecb");
  const [showPalette, setShowPalette] = useState(false);

  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8B00FF",
    "#FF1493",
    "#00FFFF",
    "#FF69B4",
    "#32CD32",
    "#FFD700",
    "#8A2BE2",
    "#FF4500",
    "#00CED1",
    "#9400D3",
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div
          className="w-72 h-72 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-110"
          style={{
            background: `linear-gradient(to right, 
              rgb(255, 0, 0) 0%, 
              rgb(255, 255, 0) 33%, 
              rgb(0, 255, 0) 50%, 
              rgb(0, 255, 255) 67%, 
              rgb(0, 0, 255) 84%, 
              rgb(255, 0, 255) 100%)`,
          }}
          onClick={() => setShowPalette(!showPalette)}
        />

        {showPalette && (
          <div className="absolute top-full mt-4 bg-white p-4 rounded-lg shadow-xl grid grid-cols-4 gap-2 w-72">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-14 h-14 rounded-lg cursor-pointer transform transition-all duration-200 hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div
          className="w-20 h-20 rounded-full border-4 border-white shadow-md transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: selectedColor }}
        />
        <p className="text-lg font-semibold">
          Selected Color is{" "}
          <span style={{ color: selectedColor }}>{selectedColor}</span>
        </p>
      </div>

      <div className="space-x-4">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorSelect(e.target.value)}
          className="w-12 h-12 rounded cursor-pointer hover:scale-110 transition-all duration-300"
        />
        <button
          onClick={() => onColorSelect(selectedColor)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md 
            hover:bg-green-600 hover:scale-110 hover:rotate-1 
            transition-all duration-300"
        >
          Submit Color
        </button>
      </div>
    </div>
  );
};
const WatchingGlassLogo = () => (
  <svg
    viewBox="0 0 150 100"
    className="w-80 h-80 mx-auto"
    fill="none"
    stroke="black"
    strokeWidth="3"
  >
    <circle cx="50" cy="50" r="35" />

    <circle cx="85" cy="50" r="6" stroke="black" strokeWidth="4" />
    <circle cx="95" cy="45" r="6" stroke="grey" strokeWidth="4" />
    <circle cx="105" cy="40" r="6" stroke="black" strokeWidth="4" />
    <circle cx="115" cy="35" r="6" stroke="grey" strokeWidth="4" />
    <circle cx="125" cy="30" r="6" stroke="black" strokeWidth="4" />
    <circle cx="135" cy="25" r="6" stroke="grey" strokeWidth="4" />
    <circle cx="145" cy="20" r="6" stroke="black" strokeWidth="4" />
  </svg>
);

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EDE8E3] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex flex-row space-x-14">
          <div className="mb-8">
            <WatchingGlassLogo />
          </div>
          <div className="flex flex-col space-y-9">
            <h1 className="text-5xl font-bold mb-4 text-black">
              The Watching Glass
            </h1>
            <h2 className="text-2xl text-gray-700 mb-9 font-semibold">
              Your Path, Clearly Seen
            </h2>
          </div>
        </div>

        <button
          onClick={() => navigate("/quiz")}
          className="bg-green-500 text-white px-28 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition-all shadow-md hover:scale-110"
        >
          READ MY FUTURE!
        </button>
      </div>
    </div>
  );
};

const FortuneQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [responses, setResponses] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#561ecb");

  const questions = [
    {
      question: "What type of climate do you enjoy the most?",
      options: ["Warm", "Cool"],
    },
    {
      question: "When do you feel most productive?",
      options: ["Morning", "Evening"],
    },
    {
      question: "Choose a number between 1 and 100.",
      options: ["23", "88", "56", "74"],
    },
    {
      question: "What's your favorite color?",
      options: ["Blue", "Red", "Green", "Yellow"],
    },
    {
      question: "Look at the image below and tell us what it inspires in you.",
      options: ["Calmness", "Creativity", "Curiosity", "Focus"],
      image: "/a.png",
    },
    {
      question: "Select a color that resonates with you",
      type: "color", // This is important!
      options: [],
    },
  ];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleContinue = () => {
    if (selectedAnswer) {
      setResponses((prev) => [...prev, selectedAnswer]);
      setSelectedAnswer(null);

      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setShowSummary(true);
      }
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#EDE8E3] flex flex-col justify-between">
      {showSummary ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#EDE8E3]">
          <div className="flex flex-1 mb-10 mt-20">
            <div className="flex items-start gap-8 mx-auto">
              <div className="flex-shrink-0 mt-24">
                <img src="/image.png" alt="" />
              </div>
              <div className="flex flex-col w-full mr-14">
                <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                  Results
                </h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                  Based on your responses, here are your personalized
                  observations:
                </h2>
                <ul className="space-y-6 text-gray-600 text-left mb-8">
                  {responses.map((response, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="font-bold text-green-500">
                        {index + 1}.
                      </span>
                      <p>
                        {index === 0 && response === "Warm"
                          ? "You thrive in warm and sunny environments, suggesting you enjoy energy and vibrancy in your surroundings."
                          : index === 0 && response === "Cool"
                          ? "You feel most comfortable in cool and calm environments, hinting at a preference for tranquility and balance."
                          : index === 1 && response === "Morning"
                          ? "Your productivity peaks in the morning, indicating you're likely an early riser who enjoys starting the day fresh."
                          : index === 1 && response === "Evening"
                          ? "You perform best in the evening, showing you're energized when others wind down."
                          : index === 2
                          ? `Your chosen number (${response}) reveals your intuitive nature and balanced decision-making style.`
                          : index === 3 && response === "Blue"
                          ? "Blue reflects your calm, confident, and trustworthy personality."
                          : index === 3 && response === "Red"
                          ? "Red reveals your passionate, bold, and dynamic approach to life."
                          : index === 4
                          ? `Your inspiration from the image suggests ${response}.`
                          : index === 5
                          ? `The color you selected (${response}) suggests you are ${
                              response === "#FF0000"
                                ? "bold and action-oriented."
                                : response === "#00FF00"
                                ? "calm and deeply connected to nature."
                                : response === "#0000FF"
                                ? "introspective and logical."
                                : response === "#FFFF00"
                                ? "energetic and optimistic."
                                : "unique and creative in your choices."
                            }`
                          : "An interesting choice! Let's explore what it means further."}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-gray-700 mb-6 text-center">
                  These insights can help you better understand your preferences
                  and personality traits. Remember, the choices you make define
                  your path!
                </p>
                <div className="flex justify-center mt-6 space-x-4">
                  <button
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all hover:scale-110"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </button>
                  <button
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all hover:scale-110"
                    onClick={() => {
                      setCurrentStep(0);
                      setResponses([]);
                      setShowSummary(false);
                    }}
                  >
                    Restart Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative w-full flex items-center justify-center mt-6 rounded-full">
            <h1 className="text-3xl font-bold text-black">Fortune Quiz</h1>
            <button
              className="absolute right-6 top-4 bg-white rounded-full shadow-md p-2 hover:shadow-lg hover:scale-110 transition-all duration-300"
              onClick={() => navigate("/")}
            >
              <span className="w-6 h-6 text-gray-500 hover:text-gray-700 rounded-full hover:scale-110">
                X
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center mt-28 px-6">
            <h2 className="text-2xl text-black font-semibold text-center mb-12">
              {questions[currentStep].question}
            </h2>

            {questions[currentStep].type === "color" ? (
              <ColorPicker onColorSelect={handleAnswer} />
            ) : (
              <div className="w-full max-w-xl space-y-6">
                {questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full py-5 text-left rounded-lg border text-black font-medium 
                      shadow-md transition-all duration-300 hover:scale-110 hover:-rotate-1 
                      transform-gpu ${
                        selectedAnswer === option
                          ? "bg-green-100 border-green-300"
                          : "bg-white border-gray-300 hover:bg-gray-50 hover:scale-110"
                      }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span
                        className="font-semibold text-black bg-[#EDE8E3] rounded-full 
                        shadow-md p-2 ml-4 w-10 h-10 flex items-center justify-center"
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-gray-800 font-medium">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full px-6 py-10 bg-white shadow-lg mt-8">
            <div className="max-w-xl mx-auto flex items-center justify-between gap-8">
              <div className="flex items-center gap-2 w-48">
                <div className="flex-1 bg-gray-200 rounded-full">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {currentStep + 1}/{questions.length}
                </span>
              </div>
              <button
                onClick={handleContinue}
                disabled={
                  !selectedAnswer && questions[currentStep].type !== "color"
                }
                className={`px-12 py-3 rounded text-white text-sm font-medium 
                  transition-all duration-300 ${
                    selectedAnswer || questions[currentStep].type === "color"
                      ? "bg-green-500 hover:bg-green-600 hover:scale-110"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz" element={<FortuneQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
