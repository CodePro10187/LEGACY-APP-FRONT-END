import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import SendMessage from "../common/SendMessage";
import Footer from "../common/Footer";
import "./Home.css";
import img1 from "../images/img1.png";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <main>
        <div className="body">
          <h1 className="heading">Welcome to DigiLegacy</h1>
          <p className="discription">
            Your personal Automated Legacy Inheritance Software
          </p>
          <button
            className="getStarted"
            onClick={() => navigate("/DigitalAssets")}
          >
            Get Started
          </button>
          <img className="img1" src={img1} alt="illustration" />
          <div className="aboutUs">
            <h1>About Us</h1>
            <p>
              Digital Legacy is an innovative web application designed to ensure
              that an individual's digital assets are securely passed on...
            </p>
          </div>
          <div className="contactUs">
            <h1>Contact Us</h1>
            <h3>How can we help you today?</h3>
            <p>Feel free to contact us directly if you have any inquiries...</p>
          </div>
        </div>
      </main>
      <SendMessage />
      <Footer />
    </div>
  );
}

export default Home;
