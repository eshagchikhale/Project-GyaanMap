// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes";
import Navbar from "./components/Navbar";
import Quiz from "./pages/Quiz";
import SavedCareers from "./pages/SavedCareers";
import CareerDetails from "./pages/CareerDetails";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/Auth";
import ResultList from "./pages/ResultList";
import ResultDetails from "./pages/ResultDetails";



// Pages
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />

        <main>
         
          <Routes>
  {/* Public page */}
  <Route path="/auth" element={<AuthPage />} />

  <Route path="/" element={<Home />} />

  {/* Protected pages */}
  <Route path="/quiz" element={<ProtectedRoute> <Quiz /> </ProtectedRoute>}/>
  <Route path="/saved-careers" element={ <ProtectedRoute> <SavedCareers /> </ProtectedRoute>}/>
 <Route path="/career/:id" element={<ProtectedRoute><CareerDetails /> </ProtectedRoute>}/>

  <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute> }/>
  <Route path="/results" element={<ProtectedRoute><ResultList /></ProtectedRoute>}/>
  <Route path="/result-details" element={<ProtectedRoute><ResultDetails /></ProtectedRoute>}/>

  </Routes>

        </main>
      </Router>
    </div>
  );
}

