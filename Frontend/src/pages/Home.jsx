
import React from "react";
import heroImg from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; 
import Chatbot from "../components/Chatbot";

import {
  TrendingUp,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";

export default function Home() {
      const navigate = useNavigate();
      const handleQuizClick = () => {
  const token = localStorage.getItem("token");
  if (!token) {
   toast.error("Login is mandatory to take the quiz.");
    navigate("/auth"); // this should take user to your Auth page
  } else {
    navigate("/quiz");
  }
};


  return (

    <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -50 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
    
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
            {/* LEFT SIDE */}
            <div>
              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900">
                <span className="whitespace-nowrap">
                  Discover Your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                    Ideal
                  </span>
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                  Career Path
                </span>
              </h1>

              <p className="mt-6 text-gray-500 max-w-xl text-lg">
                Let AI guide you through a personalized journey to find the
                perfect career that matches your skills, interests, and
                aspirations.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
          
                {/* <button onClick={() => navigate("/quiz")} className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.01] transition">

                 Start Quiz <ArrowRight className="w-4 h-4" />
</button> */}
<button 
  onClick={handleQuizClick} 
  className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
    text-white font-medium shadow-md bg-gradient-to-r from-blue-500 to-purple-600 
    transform transition duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(79,70,229,0.3)]"
>
  Start Quiz <ArrowRight className="w-4 h-4" />
</button>


                {/* <button
                  aria-label="Learn More"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 text-gray-700 bg-white hover:shadow"
                >
                  Learn More
                </button> */}
                {/* <button
  aria-label="Learn More"
  className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
    border border-gray-200 text-gray-700 bg-white 
    transition duration-300 transform 
    hover:bg-green-500 hover:text-white hover:scale-105 hover:shadow-lg"
>
  Learn More
</button> */}

              </div>
            </div>

            {/* RIGHT SIDE - Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              {/* soft glow */}
              <div className="absolute -left-20 bottom-0 w-96 h-96 rounded-full filter blur-3xl opacity-30 bg-gradient-to-r from-indigo-200 to-transparent pointer-events-none"></div>

              <div className="relative w-full max-w-xl lg:max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImg}
                  alt="Illustration"
                  className="w-full h-auto object-cover rounded-3xl"
                />
              </div>

              {/* star badge */}
              <div className="absolute -right-6 -top-6 bg-emerald-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Why Choose{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              GyaanMap?
            </span>
          </h2>
          <p className="text-gray-500 mb-10">
            Our AI-powered platform provides personalized career guidance that
            adapts to your unique profile and goals.
          </p>

          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Card 1 */}
            {/* <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center"> */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center 
  transition-transform transform hover:-translate-y-2 
  hover:shadow-[0_8px_24px_rgba(79,70,229,0.25)]">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-md mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-400 text-sm">
                Advanced algorithms analyze your responses to predict the best
                career paths for you.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center 
  transition-transform transform hover:-translate-y-2 
  hover:shadow-[0_8px_24px_rgba(79,70,229,0.25)]">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-md mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Personalized Roadmaps</h3>
              <p className="text-gray-400 text-sm">
                Get custom learning paths with milestones tailored to your goals
                and interests.
              </p>
            </div>

            {/* Card 3 */}
            {/* <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center"> */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center 
  transition-transform transform hover:-translate-y-2 
  hover:shadow-[0_8px_24px_rgba(79,70,229,0.25)]">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-md mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Free Resources</h3>
              <p className="text-gray-400 text-sm">
                Access curated learning resources from top platforms like
                Coursera and YouTube.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-10 text-center text-white">
        <h2 className="font-extrabold text-2xl mb-2">
          Ready to Shape Your Future?
        </h2>
        <p className="mb-6">
          Join thousands of students who have discovered their dream careers with
          GyaanMap.
        </p>
        {/* <button onClick={() => navigate("/quiz")} className="bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-lg font-semibold transition">
          Take the Career Quiz Now
        </button> */}
        <button 
  onClick={handleQuizClick} 
  className="bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-lg font-semibold 
    transform transition duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(147,51,234,0.3)]"
>
  Take the Career Quiz Now
</button>

      </section>
            {/* Floating Career Chatbot */}
      <Chatbot />

   </motion.div>
  );
}
