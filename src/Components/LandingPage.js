// src/Components/LandingPage.js
import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import landingImage from "../photo/1.png";

function LandingPage() {
  return (
    <div className="landing">
      <img src={landingImage} alt="Landing" className="landing-image" />
      <header className="landing-header">
        <h1>Welcome to Our Website</h1>
        <p>Upload and share your videos and photos with a simple QR scan.</p>
      </header>
      <nav className="landing-nav">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
        <Link to="/signin" className="nav-link">
          Sign In
        </Link>
      </nav>
    </div>
  );
}

export default LandingPage;
