// src/App.js
import React from "react";
import LandingPage from "./Components/LandingPage";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import PublicView from "./Components/PublicView";
import Gallery from "./Components/Gallery";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/view/:id" element={<PublicView />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
