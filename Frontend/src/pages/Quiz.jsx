import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Server,
  Brain,
  Palette,
  Users,
  Briefcase,
  FileText,
} from "lucide-react";

const traitIconMap = {
  R: <Server className="w-6 h-6 text-blue-600" />,
  I: <Brain className="w-6 h-6 text-purple-600" />,
  A: <Palette className="w-6 h-6 text-pink-500" />,
  S: <Users className="w-6 h-6 text-green-600" />,
  E: <Briefcase className="w-6 h-6 text-orange-600" />,
  C: <FileText className="w-6 h-6 text-gray-600" />,
};





const questions = [
  // -------- REALISTIC (R) --------
  {
    id: 1,
    trait: "R",
    question: "I enjoy configuring systems, servers, or technical setups.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    trait: "R",
    question: "I like working with hardware, networking, or infrastructure.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 3,
    trait: "R",
    question: "I prefer hands-on technical work rather than theory.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 4,
    trait: "R",
    question: "I enjoy fixing system-level or deployment-related issues.",
    options: [1, 2, 3, 4, 5]
  },

  // -------- INVESTIGATIVE (I) --------
  {
    id: 5,
    trait: "I",
    question: "I enjoy solving logical or algorithmic problems.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 6,
    trait: "I",
    question: "I like analyzing data to find insights or patterns.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 7,
    trait: "I",
    question: "I enjoy understanding how software systems work internally.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 8,
    trait: "I",
    question: "I like debugging complex problems that require deep thinking.",
    options: [1, 2, 3, 4, 5]
  },

  // -------- ARTISTIC (A) --------
  {
    id: 9,
    trait: "A",
    question: "I enjoy designing user interfaces or web layouts.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 10,
    trait: "A",
    question: "I care about how applications look and feel to users.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 11,
    trait: "A",
    question: "I enjoy combining creativity with technology.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 12,
    trait: "A",
    question: "I like frontend development or visual design tasks.",
    options: [1, 2, 3, 4, 5]
  },

  // -------- SOCIAL (S) --------
  {
    id: 13,
    trait: "S",
    question: "I enjoy helping others understand technical concepts.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 14,
    trait: "S",
    question: "I like teaching or mentoring others in technology.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 15,
    trait: "S",
    question: "I enjoy working closely with users or clients.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 16,
    trait: "S",
    question: "I like explaining technical ideas in simple language.",
    options: [1, 2, 3, 4, 5]
  },

  // -------- ENTERPRISING (E) --------
  {
    id: 17,
    trait: "E",
    question: "I enjoy leading technical or software projects.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 18,
    trait: "E",
    question: "I like making decisions that affect a team or product.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 19,
    trait: "E",
    question: "I enjoy coordinating between technical and business teams.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 20,
    trait: "E",
    question: "I am interested in roles like Product Manager or Tech Lead.",
    options: [1, 2, 3, 4, 5]
  },

  // -------- CONVENTIONAL (C) --------
  {
    id: 21,
    trait: "C",
    question: "I like working in structured and well-defined environments.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 22,
    trait: "C",
    question: "I enjoy documentation, testing, or database-related tasks.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 23,
    trait: "C",
    question: "I like following processes and maintaining accuracy.",
    options: [1, 2, 3, 4, 5]
  },
  {
    id: 24,
    trait: "C",
    question: "I enjoy roles that require consistency and attention to detail.",
    options: [1, 2, 3, 4, 5]
  }
];



export default function Quiz() {

    const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleOptionClick = (optIdx) => {
    const newAnswers = [...answers];
    newAnswers[step] = optIdx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };






const calculateRIASEC = () => {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  questions.forEach((q, index) => {
    const answerValue = answers[index] + 1; // 1–5
    scores[q.trait] += answerValue;
  });

  return scores;
};

const handleSubmit = async () => {
  try {
    const riasecScores = calculateRIASEC();

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(riasecScores),
    });

    const result = await response.json();
    // navigate("/results", { state: { predictions: result } });
    navigate("/results", {
  state: {
    predictions: result,
    riasecScores: riasecScores
  }
});

  } catch (error) {
    console.error("Quiz submit error:", error);
  }
};







  const handleBackToHome = () => {
  navigate("/"); // change "/" to your actual home path if different
};

const pageVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 }, // optional if you want exit animation
};

const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5,
};

const scaleLabels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];



return (
  <motion.div
    className="min-h-screen flex flex-col items-center bg-gray-50 py-4"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
  >
    <div className="flex flex-col items-center bg-gray-50 py-4 w-full">

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-3xl mb-4">
        <div
          onClick={handleBackToHome}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter') handleBackToHome(); }}
          className="cursor-pointer text-gray-700 hover:bg-green-400 hover:text-white px-4 py-1 rounded-lg font-semibold shadow transition-colors flex items-center text-sm"
        >
          <span className="mr-2">&larr;</span> Back to Home
        </div>

        <div className="flex-1 mx-4">
          <div className="relative w-full h-1.5 rounded bg-gray-200">
            <div
              className="absolute h-1.5 rounded bg-gradient-to-r from-blue-500 to-purple-600"
              style={{
                width: `${((step + 1) / questions.length) * 100}%`,
                transition: "width 0.3s",
              }}
            ></div>
          </div>
          <div className="text-center text-gray-500 mt-1 text-sm">
            {`${Math.round(((step + 1) / questions.length) * 100)}% Complete`}
          </div>
        </div>

        <div className="text-gray-600 font-medium text-sm">
          {`Q ${step + 1} / ${questions.length}`}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-5">

        {/* <h2 className="text-2xl font-bold mb-5">
          {questions[step].question}
        </h2> */}
        <div className="flex items-start gap-3 mb-5">
  
  {/* Trait Icon */}
  <div className="mt-1 transition-transform hover:scale-110">

    {traitIconMap[questions[step].trait]}
  </div>

  {/* Question Text */}
  <div>
    <h2 className="text-2xl font-bold text-gray-800 leading-snug">
      {questions[step].question}
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Select how strongly you agree
    </p>
  </div>

</div>


        {/* <div className="flex flex-col gap-4 mb-6">
          {questions[step].options.map((opt, idx) => (
            <button
              key={opt}
              onClick={() => handleOptionClick(idx)}
              className={`text-base border rounded-lg px-5 py-3 text-left transition-all ${
                answers[step] === idx
                  ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-400"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div> */}

        <div className="flex flex-col gap-4 mb-6">
  {scaleLabels.map((label, idx) => (
    <button
      key={idx}
      onClick={() => handleOptionClick(idx)}
      className={`text-base border rounded-lg px-5 py-3 text-left transition-all ${
        answers[step] === idx
          ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-400"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  ))}
</div>


        <div className="flex justify-between">
          <button
            disabled={step === 0}
            onClick={handlePrev}
            className="px-4 py-2 rounded bg-gray-200 text-gray-600 text-sm"
          >
            Previous
          </button>

          {step === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm"
            >
              Submit
            </button>
          ) : (
            <button
              disabled={answers[step] === undefined}
              onClick={handleNext}
              className="px-5 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

}


