// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import UserRegister from "./components/UserRegister";
import ConfirmationPage from "./components/ConfirmationPage";
import LawyerRegister from "./components/LawyerRegister";
import RegisterSelection from "./components/RegisterSelection";
import LegalDocuments from "./components/LegalDocuments";
import SubscriptionPlan from "./components/SubscriptionPlan";
import ForgotPassword from "./components/ForgotPassword";
import HelpFAQ from "./components/HelpFAQ";
import ContactLawyer from "./components/ContactLawyer";
import UserProfileEdit from "./components/UserProfileEdit";
import LawyerProfileEdit from "./components/LawyerProfileEdit";
import DigitalAssets from "./components/DigitalAssets";
import Home from "./components/Home";

function App() {
  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/Login" style={{ marginRight: 10 }}>
          Login
        </Link>
        <Link to="/UserRegister" style={{ marginRight: 10 }}>
          UserRegister
        </Link>
        <Link to="/ConfirmationPage" style={{ marginRight: 10 }}>
          ConfirmationPage
        </Link>
        <Link to="/LawyerRegister" style={{ marginRight: 10 }}>
          LawyerRegister
        </Link>
        <Link to="/RegisterSelection" style={{ marginRight: 10 }}>
          RegisterSelection
        </Link>
        <Link to="/LegalDocuments" style={{ marginRight: 10 }}>
          LegalDocuments
        </Link>
        <Link to="/SubscriptionPlan" style={{ marginRight: 10 }}>
          SubscriptionPlan
        </Link>
        <Link to="/ForgotPassword" style={{ marginRight: 10 }}>
          ForgotPassword
        </Link>
        <Link to="/HelpFAQ" style={{ marginRight: 10 }}>
          HelpFAQ
        </Link>
        <Link to="/ContactLawyer" style={{ marginRight: 10 }}>
          ContactLawyer
        </Link>
        <br />
        <Link to="/UserProfileEdit" style={{ marginRight: 10 }}>
          UserProfileEdit
        </Link>
        <Link to="/LawyerProfileEdit" style={{ marginRight: 10 }}>
          LawyerProfileEdit
        </Link>
        <Link to="/DigitalAssets" style={{ marginRight: 10 }}>
          DigitalAssets
        </Link>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/ConfirmationPage" element={<ConfirmationPage />} />
        <Route path="/LawyerRegister" element={<LawyerRegister />} />
        <Route path="/RegisterSelection" element={<RegisterSelection />} />
        <Route path="/LegalDocuments" element={<LegalDocuments />} />
        <Route path="/SubscriptionPlan" element={<SubscriptionPlan />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/HelpFAQ" element={<HelpFAQ />} />
        <Route path="/ContactLawyer" element={<ContactLawyer />} />
        <Route path="/UserProfileEdit" element={<UserProfileEdit />} />
        <Route path="/LawyerProfileEdit" element={<LawyerProfileEdit />} />
        <Route path="/DigitalAssets" element={<DigitalAssets />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
