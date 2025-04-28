import React from "react";
import Header from "../common/Header";
import SendMessage from "../common/SendMessage";
import Footer from "../common/Footer";
import "./Home.css";
import img1 from "../images/img1.png";

function App() {
  return (
    <div>
      <Header />
      <main>
        <div className="body">
          <h1 className="heading">Welcome to DigiLegacy</h1>
          <p className="discription">
            Your personal Automated Legacy Inheritance Software
          </p>
          <button className="getStarted">Get Started</button>
          {/* Add more content/routes here */}
          <img className="img1" src={img1} />
          <div className="aboutUs">
            <h1>About Us</h1>
            <p>
              Digital Legacy is an innovative web application designed to ensure
              that an individual's digital assets are securely passed on to
              their rightful beneficiaries after their death, in accordance with
              legal and ethical standards. In an age where much of our
              lives—photos, documents, social media, and even
              cryptocurrencies—exist online, managing digital inheritance has
              become more important than ever.
            </p>
          </div>
          <div className="contactUs">
            <h1>Contact Us</h1>
            <h3>How can we help you today?</h3>
            <p>
              Feel free to contact us directly if you have any inquiries
              regarding our application. We are always happy to assist you.
              Simply fill in your personal details, and we'll get in touch with
              you. Our support team typically responds within one business day,
              so you won't have to wait long. Alternatively, you can contact us
              directly via phone or email.
            </p>
          </div>
        </div>
      </main>
      <SendMessage />
      <Footer />
    </div>
  );
}

export default App;
