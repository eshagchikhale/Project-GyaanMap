import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Star, Download, Heart, ArrowRight } from "lucide-react";

export default function CareerDetails() {
 const { id } = useParams();
const navigate = useNavigate();
const [saved, setSaved] = useState(true);
const [career, setCareer] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchCareer = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/careers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCareer(res.data);
    } catch (err) {
      console.error("Fetch career error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCareer();
}, [id]);


  // Fallback if no career is passed
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Loading career details...
    </div>
  );
}

if (!career) {
  return (
    <div className="text-center py-10">
      <p className="text-red-500 font-semibold">Career not found</p>
      <button
        onClick={() => navigate("/saved-careers")}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Back
      </button>
    </div>
  );
}


 const handleViewDetails = (id) => {
  navigate(`/career/${id}`);
};

  const roadmap = career.roadmap || [];
const resources = career.resources || [];


  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8 text-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 text-gray-600 hover:text-purple-600 flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">{career.title}</h1>
        <p className="text-gray-500 mt-1">
          Detailed information about this saved career
        </p>
      </div>

      {/* Career + Roadmap + Resources */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career Info + Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Career Info */}
          <section className="bg-white shadow-md rounded-2xl p-6 relative transition-transform transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(124,58,237,0.25)]">
            
            <h1 className="text-2xl font-bold text-purple-700">
              {career.title}
            </h1>
            <p className="text-gray-600 mt-2">{career.description}</p>
          </section>

          {/* Learning Roadmap */}
          <section className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(124,58,237,0.25)]">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-purple-600"></span> Learning Roadmap
            </h2>
            <div className="space-y-4">
              {roadmap.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 bg-white shadow-sm transition-transform transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(124,58,237,0.25)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full">
                        {i + 1}
                      </span>
                      {step.level}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      ⏱ {step.duration}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                      {step.topics.map((topic, j) => (
  <div key={j} className="flex flex-col">
    <button
      onClick={() => window.open(topic.link, "_blank")}
      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-purple-200 hover:text-purple-700 transition text-left"
    >
      {topic.title}
    </button>

  
  </div>
))}

                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Recommended Resources + Next Steps */}
        <aside className="space-y-6 sticky top-6 self-start">
          {/* Resources */}
          {/* <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(124,58,237,0.25)]">
            <h2 className="text-xl font-semibold mb-4">Recommended Resources</h2>
            <div className="space-y-3">
              {resources.map((r, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-sm text-gray-500">{r.platform}</p>
                    <div className="flex items-center gap-1 text-green-600 font-medium mt-1">
                      <Star className="w-4 h-4 fill-green-500 text-green-500" />
                      {r.rating}
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-full hover:bg-purple-100 text-purple-600"
                    onClick={() => alert(`Redirect to ${r.title}`)}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div> */}

          {/* Next Steps */}
          <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(124,58,237,0.25)]">
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
            <div className="flex flex-col gap-3">
               
                  <button onClick={() => navigate("/quiz")}className="w-full border rounded-lg py-2 transition transform hover:-translate-y-1 hover:bg-green-500 hover:text-white">

                          Retake Quiz
                  </button>
             <button onClick={() => navigate("/saved-careers")}className="border rounded-lg py-2 hover:bg-purple-500 hover:text-white">

               View Saved Careers
       </button>
             
            </div> 

          </div>
        </aside>
      </div>
    </div>
  );
}
