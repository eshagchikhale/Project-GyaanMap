
// import { useState, useEffect } from "react";
// import { Edit3, Save } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // const cardStyle =
// //   "relative bg-white/90 backdrop-blur rounded-2xl p-6 border border-purple-100 " +
// //   "shadow-[0_12px_35px_rgba(88,28,135,0.18)] " +   // 👈 visible static shadow
// //   "hover:shadow-[0_22px_55px_rgba(88,28,135,0.28)] " + // 👈 stronger hover
// //   "transition-all duration-300";
// const cardStyle =
//   "relative bg-white/90 backdrop-blur rounded-2xl p-6 border border-purple-100 " +
//   "shadow-[0_12px_35px_rgba(88,28,135,0.18)] " +
//   "hover:shadow-[0_22px_55px_rgba(88,28,135,0.28)] hover:-translate-y-1 " +
//   "transition-all duration-300";


// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [userData, setUserData] = useState({
//     fullName: "",
//     university: "",
//     graduationYear: "",
//     email: "",
//     major: "",
//   });

//   const [tempData, setTempData] = useState({ ...userData });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         const res = await axios.get("http://localhost:5000/api/profile/me");

//         const formatted = {
//           fullName: res.data.name || "",
//           university: res.data.university || "",
//           graduationYear: res.data.graduationYear
//             ? String(res.data.graduationYear)
//             : "",
//           email: res.data.email || "",
//           major: res.data.major || "",
//         };

//         setUserData(formatted);
//         setTempData(formatted);
//       } catch {
//         setError("Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       const res = await axios.put("http://localhost:5000/api/profile/me", {
//         name: tempData.fullName,
//         university: tempData.university,
//         graduationYear: tempData.graduationYear,
//         major: tempData.major,
//       });

//       setUserData({
//         fullName: res.data.name,
//         university: res.data.university,
//         graduationYear: String(res.data.graduationYear || ""),
//         email: res.data.email,
//         major: res.data.major,
//       });

//       setIsEditing(false);
//     } catch {
//       setError("Failed to update profile.");
//     }
//   };

//   const handleEdit = () => {
//     setTempData({ ...userData });
//     setIsEditing(true);
//   };

//   const handleChange = (field, value) => {
//     setTempData((prev) => ({ ...prev, [field]: value }));
//   };

//   if (loading)
//     return <div className="p-10 text-center text-gray-600">Loading profile...</div>;
//   if (error)
//     return <div className="p-10 text-center text-red-600">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-10 px-4">
//       <div className="max-w-7xl mx-auto">

//         {/* CENTERED TITLE */}
//         <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
//           My Profile
//         </h1>
//         <p className="text-gray-600 text-center mb-10">
//           Manage your account and track your career journey
//         </p>

//         {/* VERTICAL STACK */}
//         <div className="max-w-4xl mx-auto space-y-8">

//           {/* PERSONAL INFORMATION */}
//           <div className={cardStyle}>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Personal Information
//               </h2>
//               {isEditing ? (
//                 <button
//                   onClick={handleSave}
//                   className="flex items-center text-green-600 font-medium"
//                 >
//                   <Save size={18} className="mr-1" /> Save
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleEdit}
//                   className="flex items-center text-blue-600 font-medium"
//                 >
//                   <Edit3 size={18} className="mr-1" /> Edit
//                 </button>
//               )}
//             </div>

//            <hr className="mb-6 border-purple-100" />

// <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">

//   {[
//     ["Full Name", "fullName"],
//     ["University", "university"],
//     ["Expected Graduation", "graduationYear"],
//     ["Major", "major"],
//   ].map(([label, field]) => (
//     <div key={field}>
//       <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
//         {label}
//       </p>

//       {isEditing ? (
//         <input
//           value={tempData[field]}
//           onChange={(e) => handleChange(field, e.target.value)}
//           className="
//             w-full px-3 py-2 text-sm text-gray-900
//             border border-purple-200 rounded-lg
//             focus:outline-none focus:ring-2 focus:ring-purple-500
//             bg-white
//           "
//         />
//       ) : (
//         <p className="text-base font-semibold text-gray-900">
//           {userData[field]}
//         </p>
//       )}
//     </div>
//   ))}
// </div>

// {/* EMAIL (NON-EDITABLE) */}
// <div className="mt-6">
//   <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
//     Email
//   </p>
//   <p className="text-base font-semibold text-gray-900">
//     {userData.email}
//   </p>
// </div>







//             {/* <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Email
//               </label>
//               <p className="text-gray-800">{userData.email}</p>
//             </div> */}
//           </div>

//           {/* QUICK ACTIONS BELOW */}
//           <div className={cardStyle}>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Quick Actions
//             </h2>

//             <button
//               onClick={() => navigate("/quiz")}
//               className="w-full py-3 text-white font-medium rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
//             >
//               Take New Quiz
//             </button>

//             <p className="mt-4 text-sm text-gray-500 text-center">
//               Discover your ideal career path with our AI-powered assessment
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
//************************************************************************* */
import { useState, useEffect } from "react";
import { Edit3, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

/* ================= STYLES ================= */

const cardStyle =
  "relative bg-white/90 backdrop-blur rounded-2xl p-6 border border-purple-100 " +
  "shadow-[0_12px_35px_rgba(88,28,135,0.18)] " +
  "hover:shadow-[0_22px_55px_rgba(88,28,135,0.28)] " +
  "transition-shadow duration-300";

/* ================= ANIMATIONS ================= */

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
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
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState({
    fullName: "",
    university: "",
    graduationYear: "",
    email: "",
    major: "",
  });

  const [tempData, setTempData] = useState({ ...userData });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get("http://localhost:5000/api/profile/me");

        const formatted = {
          fullName: res.data.name || "",
          university: res.data.university || "",
          graduationYear: res.data.graduationYear
            ? String(res.data.graduationYear)
            : "",
          email: res.data.email || "",
          major: res.data.major || "",
        };

        setUserData(formatted);
        setTempData(formatted);
      } catch {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.put("http://localhost:5000/api/profile/me", {
        name: tempData.fullName,
        university: tempData.university,
        graduationYear: tempData.graduationYear,
        major: tempData.major,
      });

      setUserData({
        fullName: res.data.name,
        university: res.data.university,
        graduationYear: String(res.data.graduationYear || ""),
        email: res.data.email,
        major: res.data.major,
      });

      setIsEditing(false);
    } catch {
      setError("Failed to update profile.");
    }
  };

  const handleEdit = () => {
    setTempData({ ...userData });
    setIsEditing(true);
  };

  const handleChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-10 px-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Manage your account and track your career journey
        </p>

        <div className="max-w-4xl mx-auto space-y-8">

          {/* PERSONAL INFORMATION */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            whileHover={{ y: -6 }}
            className={cardStyle + " will-change-transform"}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Personal Information
              </h2>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="flex items-center text-green-600 font-medium"
                >
                  <Save size={18} className="mr-1" /> Save
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center text-blue-600 font-medium"
                >
                  <Edit3 size={18} className="mr-1" /> Edit
                </button>
              )}
            </div>

            <hr className="mb-6 border-purple-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {[
                ["Full Name", "fullName"],
                ["University", "university"],
                ["Expected Graduation", "graduationYear"],
                ["Major", "major"],
              ].map(([label, field]) => (
                <div key={field}>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    {label}
                  </p>
                  {isEditing ? (
                    <input
                      value={tempData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-3 py-2 text-sm text-gray-900
                                 border border-purple-200 rounded-lg
                                 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-base font-semibold text-gray-900">
                      {userData[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Email
              </p>
              <p className="text-base font-semibold text-gray-900">
                {userData.email}
              </p>
            </div>
          </motion.div>

          {/* QUICK ACTIONS */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            whileHover={{ y: -6 }}
            className={cardStyle + " will-change-transform"}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>

            <button
              onClick={() => navigate("/quiz")}
              className="w-full py-3 text-white font-medium rounded-md
                         bg-gradient-to-r from-purple-500 to-pink-500
                         hover:opacity-90"
            >
              Take New Quiz
            </button>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Discover your ideal career path with our AI-powered assessment
            </p>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
