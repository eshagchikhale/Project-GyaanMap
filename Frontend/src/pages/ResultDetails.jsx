
import React, { useState, useEffect } from "react";
import { Star, Download, Heart, ArrowRight } from "lucide-react";

import Feedback from "../components/Feedback";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultDetails() {
  const [saved, setSaved] = useState(false);
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === Get Career From Navigation ===
  const location = useLocation();
  const navigate = useNavigate();

  const career = location.state?.career;

  // === Fetch roadmap from FastAPI ===
  useEffect(() => {
    if (!career) return;

    const fetchRoadmap = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/roadmap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            career: career.title,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch roadmap");
        }

        const data = await res.json();
        setRoadmap(data.roadmap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [career]);

// const handleSaveCareer = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login to save careers");
//       return;
//     }

//     const res = await fetch("http://localhost:5000/api/careers", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         title: career.title,
//         description: career.description,
//         roadmap: roadmap,
//       }),
//     });

//     // 🔥 HANDLE DUPLICATE SAVE
//     if (res.status === 409) {
//       alert("Career already saved ❤️");
//       setSaved(true);
//       return;
//     }

//     if (!res.ok) {
//       throw new Error("Save failed");
//     }

//     setSaved(true);
//     alert("Career saved successfully ❤️");

//   } catch (err) {
//     console.error("Save error:", err);
//     alert("Could not save career");
//   }
// };
const handleSaveCareer = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to save careers 🔐");
      return;
    }

    const res = await fetch("http://localhost:5000/api/careers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: career.title,
        description: career.description,
        roadmap: roadmap,
      }),
    });

    // 🔥 Already saved
    if (res.status === 409) {
      setSaved(true);
      toast.warning("Career already saved ❤️");
      return;
    }

    if (!res.ok) {
      throw new Error("Save failed");
    }

    setSaved(true);
    // toast.success("Career saved successfully 🎉");
    toast.success("Career saved successfully 🎉", {
  style: {
    background: "#7c3aed",
    color: "#fff",
  },
});


  } catch (err) {
    console.error("Save error:", err);
    toast.error("Could not save career ❌");
  }
};




  // === Safety checks ===
  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          No career selected. Please go back and choose an option.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading roadmap...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8 text-center relative">
        <button
          onClick={() => window.history.back()}
          className="absolute left-0 top-0 text-gray-600 hover:text-purple-600 flex items-center gap-1"
        >
          ← Back to Results
        </button>
        <h1 className="text-3xl font-bold">Your Career Match Results</h1>
        <p className="text-gray-500 mt-1">
          Based on your selection, here&apos;s your detailed career roadmap
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career Info + Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Career Info */}
          <section className="bg-white shadow-md rounded-2xl p-6 relative">
            <div className="absolute top-6 right-6">
             
              <button
  onClick={handleSaveCareer}
  className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
    saved
      ? "text-green-600 border-green-400 bg-green-50"
      : "text-gray-600 border-gray-300 hover:text-green-600 hover:border-green-400"
  }`}
>
  <Heart className={`w-4 h-4 ${saved ? "fill-green-500" : ""}`} />
  {saved ? "Saved" : "Save"}
</button>



            </div>

            <h1 className="text-2xl font-bold text-purple-700">
              {career.title}
            </h1>
            <p className="text-gray-600 mt-2">{career.description}</p>
          </section>

          {/* Learning Roadmap */}
          <section className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-purple-600"></span> Learning Roadmap
            </h2>

            <div className="space-y-4">
              {roadmap.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 bg-gray-50 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">
                      {i + 1}. {step.level}
                    </p>
                    <p className="text-sm text-gray-500">
                      ⏱ {step.duration}
                    </p>
                  </div>

                
                      <ul className="space-y-2">
  {step.topics.map((topic, j) => (
    <li key={j} className="text-gray-700">
      <span className="font-medium">{topic.title}</span>
      {topic.link && (
        <a
          href={topic.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-blue-600 underline break-all hover:text-purple-600"
        >
          {topic.link}
        </a>
      )}
    </li>
  ))}
</ul>


                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>

            <div className="flex flex-col gap-3">
               <button onClick={() => navigate("/quiz")}className="border rounded-lg py-2 hover:bg-purple-500 hover:text-white">

              Retake Quiz
  </button>
               {/* View Saved Careers */}
  <button
    onClick={() => navigate("/saved-careers")}
    className="border rounded-lg py-2 hover:bg-purple-500 hover:text-white"
  >
    View Saved Careers
  </button>

            
            </div>

            <div className="pt-4 mt-4">
              <Feedback />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
