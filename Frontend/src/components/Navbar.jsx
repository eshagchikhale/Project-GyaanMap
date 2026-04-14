// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BookOpen, Home, ListChecks, Heart, User, LogOut } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast"; 


// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // const handleLogout = () => {
//   //   localStorage.removeItem("token");
//   //   toast.success("Logged out successfully!");
//   //   navigate("/");
//   // };
//   const handleLogout = () => {
//   localStorage.removeItem("token");
//   toast.success("Logged out successfully!");
//   setTimeout(() => {
//     navigate("/");
//   }, 100); // 100ms delay allows toast to render
// };


//   // 🟣 Handle Quiz Button Click
//   const handleQuizClick = (e) => {
//     e.preventDefault();
//     if (!token) {
//       toast.error("Login is mandatory to take the quiz.");
//       navigate("/auth");
//     } else {
//       navigate("/quiz");
//     }
//   };

//   // 🟢 Public + Conditional Links
//   const navItems = [
//     { label: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
//   ];

//   if (token) {
//     navItems.push(
//       { label: "Saved Careers", path: "/saved-careers", icon: <Heart className="w-4 h-4" /> },
//       { label: "Profile", path: "/profile", icon: <User className="w-4 h-4" /> }
//     );
//   }

//   return (
//     <header className="w-full bg-white/70 backdrop-blur-sm py-4 sticky top-0 z-40 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
//             <BookOpen className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
//             GyaanMap
//           </span>
//         </Link>

//         {/* Navigation */}
//         <nav className="flex items-center gap-4">
//           <ul className="flex items-center gap-6 text-gray-700 font-medium">
//             {navItems.map((item, idx) => (
//               <li key={idx}>
//                 <Link
//                   to={item.path}
//                   className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white shadow-sm"
//                 >
//                   {item.icon}
//                   {item.label}
//                 </Link>
//               </li>
//             ))}

//             {/* 🔒 Always visible Quiz button */}
//             <li>
//               <button
//                 onClick={handleQuizClick}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white shadow-sm"
//               >
//                 <ListChecks className="w-4 h-4" /> Quiz
//               </button>
//             </li>
//           </ul>

//           {/* 🔴 Logout button (only if logged in) */}
//           {token && (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all"
//             >
//               <LogOut className="w-4 h-4" /> Logout
//             </button>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }
//******************************************************************************************************************* */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Home,
  ListChecks,
  Heart,
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const handleQuizClick = () => {
    if (!token) {
      toast.error("Login is mandatory to take the quiz.");
      navigate("/auth");
    } else {
      navigate("/quiz");
    }
    setIsOpen(false); // close menu
  };

  const navItems = [
    { label: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
  ];

  if (token) {
    navItems.push(
      { label: "Saved Careers", path: "/saved-careers", icon: <Heart className="w-4 h-4" /> },
      { label: "Profile", path: "/profile", icon: <User className="w-4 h-4" /> }
    );
  }

  return (
    <header className="w-full bg-white/70 backdrop-blur-sm py-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            GyaanMap
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-6 text-gray-700 font-medium">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={handleQuizClick}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white"
              >
                <ListChecks className="w-4 h-4" /> Quiz
              </button>
            </li>
          </ul>

          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={handleQuizClick}
                className="flex items-center gap-2"
              >
                <ListChecks className="w-4 h-4" /> Quiz
              </button>
            </li>

            {token && (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
