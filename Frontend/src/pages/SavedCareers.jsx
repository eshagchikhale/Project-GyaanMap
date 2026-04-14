
// import { Eye, Trash2, Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function SavedCareers() {
//   const navigate = useNavigate();
//   const [careers, setCareers] = useState([]);

//   useEffect(() => {
//     const fetchCareers = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/careers/my", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         const data = await res.json();
//         setCareers(data);
//       } catch (err) {
//         console.error("Failed to fetch careers", err);
//       }
//     };

//     fetchCareers();
//   }, []);

//   const handleDelete = (id) => {
//     setCareers((prev) => prev.filter((career) => career._id !== id));
//   };

//   const handleViewDetails = (id) => {
//     navigate(`/career/${id}`);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="max-w-7xl mx-auto px-6 py-10"
//     >
//       {/* Header */}
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold flex items-center gap-2">
//             <Heart className="w-7 h-7 text-blue-600" strokeWidth={2} />
//             Saved Careers
//           </h1>
//           <p className="text-gray-500">
//             Your personalized career paths and learning roadmaps
//           </p>
//         </div>

//         <button
//           onClick={() => navigate("/quiz")}
//           className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow hover:opacity-90"
//         >
//           Take New Quiz
//         </button>
//       </div>

//       {/* Cards Grid */}
//       <motion.div
//         variants={{
//           hidden: {},
//           show: {
//             transition: {
//               staggerChildren: 0.08,
//             },
//           },
//         }}
//         initial="hidden"
//         animate="show"
//         className="grid md:grid-cols-2 gap-6"
//       >
//         <AnimatePresence>
//           {careers.map((career) => (
//             <motion.div
//               key={career._id}
//               variants={{
//                 hidden: { opacity: 0, y: 30 },
//                 show: { opacity: 1, y: 0 },
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 0.9,
//                 transition: { duration: 0.25 },
//               }}
//               whileHover={{ y: -8 }}
//               className="relative bg-white rounded-2xl p-6
//                          shadow-[0_12px_35px_rgba(88,28,135,0.18)]
//                          hover:shadow-[0_22px_55px_rgba(88,28,135,0.28)]
//                          transition-all duration-300"
//             >
//               {/* Title */}
//               <h2 className="text-xl font-bold text-blue-600">
//                 {career.title}
//               </h2>

//               {/* Saved Date */}
//               <p className="text-sm text-gray-500 mt-1">
//                 Saved {new Date(career.createdAt).toLocaleDateString()}
//               </p>

//               {/* Description */}
//               <p className="mt-3 text-gray-600">
//                 {career.description || "No description available"}
//               </p>

//               {/* Roadmap Preview */}
//               <div className="mt-5">
//                 <p className="font-semibold">Learning Path Preview</p>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {career.roadmap?.[0]?.topics?.slice(0, 4).map((t, j) => (
//                     <span
//                       key={j}
//                       className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-lg"
//                     >
//                       {t.title}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex items-center justify-between mt-6">
//                 <button
//                   onClick={() => handleViewDetails(career._id)}
//                   className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg
//                              hover:bg-blue-50 hover:border-blue-600 transition"
//                 >
//                   <Eye className="w-4 h-4" />
//                   View Details
//                 </button>

//                 <button
//                   onClick={() => handleDelete(career._id)}
//                   className="flex items-center gap-2 px-4 py-2 border border-red-400 text-red-500 rounded-lg
//                              hover:bg-red-50 hover:border-red-600 transition"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Delete
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   );
// }
//********************************************************************** */
import { Eye, Trash2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= ANIMATION CONFIG ================= */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

export default function SavedCareers() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/careers/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCareers(data);
      } catch (err) {
        console.error("Failed to fetch careers", err);
      }
    };

    fetchCareers();
  }, []);

  const handleDelete = (id) => {
    setCareers((prev) => prev.filter((c) => c._id !== id));
  };

  const handleViewDetails = (id) => {
    navigate(`/career/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="w-7 h-7 text-blue-600" strokeWidth={2} />
            Saved Careers
          </h1>
          <p className="text-gray-500">
            Your personalized career paths and learning roadmaps
          </p>
        </div>

        <button
          onClick={() => navigate("/quiz")}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow hover:opacity-90"
        >
          Take New Quiz
        </button>
      </div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
        className="grid md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {careers.map((career) => (
            <motion.div
              key={career._id}
              variants={cardVariants}
              layout
              exit="exit"
              whileHover={{
                y: -6,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              className="
                relative bg-white rounded-2xl p-6
                shadow-[0_12px_35px_rgba(88,28,135,0.18)]
                hover:shadow-[0_22px_55px_rgba(88,28,135,0.28)]
                transition-shadow duration-300
                will-change-transform
              "
            >
              {/* Title */}
              <h2 className="text-xl font-bold text-blue-600">
                {career.title}
              </h2>

              {/* Saved Date */}
              <p className="text-sm text-gray-500 mt-1">
                Saved {new Date(career.createdAt).toLocaleDateString()}
              </p>

              {/* Description */}
              <p className="mt-3 text-gray-600">
                {career.description || "No description available"}
              </p>

              {/* Roadmap Preview */}
              <div className="mt-5">
                <p className="font-semibold">Learning Path Preview</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {career.roadmap?.[0]?.topics?.slice(0, 4).map((t, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-lg"
                    >
                      {t.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => handleViewDetails(career._id)}
                  className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg
                             hover:bg-blue-50 hover:border-blue-600 transition"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>

                <button
                  onClick={() => handleDelete(career._id)}
                  className="flex items-center gap-2 px-4 py-2 border border-red-400 text-red-500 rounded-lg
                             hover:bg-red-50 hover:border-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
