import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserRegister from "./components/UserRegister";
import ConfirmationPage from "./components/ConfirmationPage";
import LawyerRegister from "./components/LawyerRegister";
import RegisterSelection from "./components/RegisterSelection";
import LegalDocuments from "./components/LegalDocuments";
import SubscriptionPlan from "./components/SubscriptionPlan";

import DigitalAssets from "./components/DigitalAssets";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/Login" style={{ marginRight: 10 }}>
          Login
        </Link>
        <Link to="/Register" style={{ marginRight: 10 }}>
          Register
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

        <Link to="/DigitalAssets" style={{ marginRight: 10 }}>
          DigitalAssets
        </Link>
        <Link to="/Home">Home</Link>
      </nav>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/ConfirmationPage" element={<ConfirmationPage />} />
        <Route path="/LawyerRegister" element={<LawyerRegister />} />
        <Route path="/RegisterSelection" element={<RegisterSelection />} />
        <Route path="/LegalDocuments" element={<LegalDocuments />} />
        <Route path="/SubscriptionPlan" element={<SubscriptionPlan />} />

        <Route path="/DigitalAssets" element={<DigitalAssets />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
