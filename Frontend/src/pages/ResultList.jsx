


// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Doughnut } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// import {
//   Chart as ChartJS,
//   Tooltip,
//   Legend
// } from "chart.js";

// import { ArcElement } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// export default function ResultList() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const predictions = location.state?.predictions;
//   const riasecScores = location.state?.riasecScores;

//   const explanation = predictions?.explanation;

//   const donutData = {
//     labels: [
//       "Realistic",
//       "Investigative",
//       "Artistic",
//       "Social",
//       "Enterprising",
//       "Conventional"
//     ],
//     datasets: [
//       {
//         data: [
//           riasecScores?.R || 0,
//           riasecScores?.I || 0,
//           riasecScores?.A || 0,
//           riasecScores?.S || 0,
//           riasecScores?.E || 0,
//           riasecScores?.C || 0
//         ],
//         backgroundColor: [
//           "#6366F1",
//           "#F59E0B",
//           "#10B981",
//           "#EF4444",
//           "#8B5CF6",
//           "#64748B"
//         ],
//         borderWidth: 0
//       }
//     ]
//   };

//   const donutOptions = {
//     cutout: "60%",
//     plugins: {
//       legend: {
//         position: "right"
//       },
//       datalabels: {
//         color: "white",
//         font: {
//           weight: "bold",
//           size: 14
//         },
//         formatter: (value, context) => {
//           const data = context.chart.data.datasets[0].data;
//           const total = data.reduce((a, b) => a + b, 0);
//           const percentage = ((value / total) * 100).toFixed(1) + "%";
//           return percentage;
//         }
//       }
//     }
//   };

//   if (!predictions || !Array.isArray(predictions.suggestions)) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">
//           No predictions found. Complete the quiz first.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-slate-50 px-6 py-10">

//       {/* ===== RIASEC ===== */}
//       <div className="mb-10 flex flex-col items-center">
//         <h1 className="text-3xl font-bold text-slate-800 mb-6">
//           Your RIASEC Profile
//         </h1>

//         <div className="w-[420px] flex justify-center">
//           <Doughnut data={donutData} options={donutOptions} />
//         </div>
//       </div>

//       {/* ===== XAI EXPLANATION ===== */}
//       <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mb-12 w-full mx-auto text-center">

//         <h2 className="text-xl font-semibold text-indigo-700 mb-3">
//           Why this recommendation?
//         </h2>

//         <p className="text-gray-700 mb-2">
//           {explanation?.reason}
//         </p>

//         <p className="text-sm text-gray-500 mb-4">
//           Confidence: {explanation?.confidence}%
//         </p>

//         {/* TOP TRAITS */}
//         <h3 className="font-semibold text-gray-800 mb-2">
//           Your Strengths:
//         </h3>

//         <div className="flex gap-3 flex-wrap mb-4 justify-center">
//           {explanation?.top_traits?.map((t, i) => (
//             <span
//               key={i}
//               className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
//             >
//               {t[0]} ({t[1].toFixed(1)})
//             </span>
//           ))}
//         </div>

//         {/* LOW TRAITS */}
//         <h3 className="font-semibold text-gray-800 mb-2">
//           Areas to Improve:
//         </h3>

//         <div className="flex gap-3 flex-wrap justify-center">
//           {explanation?.low_traits?.map((t, i) => (
//             <span
//               key={i}
//               className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
//             >
//               {t[0]} ({t[1].toFixed(1)})
//             </span>
//           ))}
//         </div>

//       </div>

//       {/* ===== CAREER SUGGESTIONS ===== */}
//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-bold text-slate-800">
//           Career Suggestions
//         </h2>
//         <p className="text-slate-500 mt-2">
//           Based on your responses, here are your best CS/IT career matches
//         </p>
//       </div>

//       {/* ===== CARDS ===== */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
//         {predictions.suggestions.slice(0, 3).map((career) => (

//           <button
//             key={career.id}
//             onClick={() =>
//               navigate("/result-details", { state: { career } })
//             }
//             className="text-left bg-white p-6 rounded-2xl shadow-md
//                        hover:-translate-y-1 transition-transform duration-150"
//           >
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-purple-700">
//                 {career.title}
//               </h2>
//               <span className="text-sm text-gray-400">
//                 {career.category}
//               </span>
//             </div>

//             <p className="text-gray-600 mt-2">
//               {career.description}
//             </p>

//             <p className="mt-2 text-sm text-indigo-600 font-semibold">
//               Match: {career.match_score}%
//             </p>

//             <p className="text-xs text-gray-500 mt-1">
//               {career.explanation}
//             </p>

//           </button>
//         ))}
//       </div> */}
//       <div className="mt-2 text-xs text-gray-600">

//   <p className="font-semibold text-indigo-600">
//     Why this career?
//   </p>

//   <p>
//     {career.xai?.reason}
//   </p>

//   <p className="mt-1 text-gray-500">
//     Interest: {career.xai?.interest_used}
//   </p>

//   <p className="text-gray-500">
//     Model Confidence: {career.xai?.model_confidence}%
//   </p>

//   <p className="text-gray-500">
//     Similarity Score: {career.xai?.similarity_score}%
//   </p>

// </div>

//     </div>
//   );
// }
//***************************************************************************************** */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  Tooltip,
  Legend
} from "chart.js";

import { ArcElement } from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function ResultList() {
  const location = useLocation();
  const navigate = useNavigate();

  const predictions = location.state?.predictions;
  const riasecScores = location.state?.riasecScores;

  const explanation = predictions?.explanation;

  const donutData = {
    labels: [
      "Realistic",
      "Investigative",
      "Artistic",
      "Social",
      "Enterprising",
      "Conventional"
    ],
    datasets: [
      {
        data: [
          riasecScores?.R || 0,
          riasecScores?.I || 0,
          riasecScores?.A || 0,
          riasecScores?.S || 0,
          riasecScores?.E || 0,
          riasecScores?.C || 0
        ],
        backgroundColor: [
          "#6366F1",
          "#F59E0B",
          "#10B981",
          "#EF4444",
          "#8B5CF6",
          "#64748B"
        ],
        borderWidth: 0
      }
    ]
  };

  const donutOptions = {
    cutout: "60%",
    plugins: {
      legend: {
        position: "right"
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 14
        },
        formatter: (value, context) => {
          const data = context.chart.data.datasets[0].data;
          const total = data.reduce((a, b) => a + b, 0);
          return ((value / total) * 100).toFixed(1) + "%";
        }
      }
    }
  };

  if (!predictions || !Array.isArray(predictions.suggestions)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          No predictions found. Complete the quiz first.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 px-6 py-10">

      {/* ===== RIASEC ===== */}
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Your RIASEC Profile
        </h1>

        <div className="w-[420px] flex justify-center">
          <Doughnut data={donutData} options={donutOptions} />
        </div>
      </div>

      {/* ===== GLOBAL XAI ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mb-12 w-full mx-auto text-center">

        <h2 className="text-xl font-semibold text-indigo-700 mb-3">
          Why this recommendation?
        </h2>

        <p className="text-gray-700 mb-2">
          {explanation?.reason}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Confidence: {explanation?.confidence}%
        </p>

        <h3 className="font-semibold text-gray-800 mb-2">
          Your Strengths:
        </h3>

        <div className="flex gap-3 flex-wrap mb-4 justify-center">
          {explanation?.top_traits?.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              {t[0]} ({t[1].toFixed(1)})
            </span>
          ))}
        </div>

        <h3 className="font-semibold text-gray-800 mb-2">
          Areas to Improve:
        </h3>

        <div className="flex gap-3 flex-wrap justify-center">
          {explanation?.low_traits?.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
            >
              {t[0]} ({t[1].toFixed(1)})
            </span>
          ))}
        </div>

      </div>

      {/* ===== CAREER TITLE ===== */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">
          Career Suggestions
        </h2>
        <p className="text-slate-500 mt-2">
          Based on your responses, here are your best matches
        </p>
      </div>

      {/* ===== CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {predictions.suggestions.slice(0, 3).map((career) => (

          <button
            key={career.id}
            onClick={() =>
              navigate("/result-details", { state: { career } })
            }
            className="text-left bg-white p-6 rounded-2xl shadow-md
                       hover:-translate-y-1 transition-transform duration-150"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-purple-700">
                {career.title}
              </h2>
              <span className="text-sm text-gray-400">
                {career.category}
              </span>
            </div>

            <p className="text-gray-600 mt-2">
              {career.description}
            </p>

            <p className="mt-2 text-sm text-indigo-600 font-semibold">
              Match: {career.match_score}%
            </p>

            
            <div className="mt-3 text-xs text-gray-600  pt-2">
              <p className="font-semibold text-indigo-600">
                Why this career?
              </p>

              <p>
                {career.xai?.reason || "Based on your profile similarity"}
              </p>

              <p className="text-gray-500">
                Similarity: {career.xai?.similarity_score || career.match_score}%
              </p>

              <p className="text-gray-500">
                Confidence: {career.xai?.model_confidence || explanation?.confidence}%
              </p>
            </div>

          </button>
        ))}
      </div>

    </div>
  );
}