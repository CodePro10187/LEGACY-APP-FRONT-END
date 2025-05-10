import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import UserRegister from "./components/UserRegister";
import ConfirmationPage from "./components/ConfirmationPage";
import LawyerRegister from "./components/LawyerRegister";
import RegisterSelection from "./components/RegisterSelection";
import LegalDocuments from "./components/LegalDocuments";
import SubscriptionPlan from "./components/SubscriptionPlan";
import ForgotPassword from "./components/ForgotPassword";
import HelpFAQ from "./components/HelpFAQ";
import LawyerContactDetail from "./components/LawyerContactDetail";
import LawyerList from "./components/LawyerList";
import UserProfileEdit from "./components/UserProfileEdit";
import ChatApp from "./components/ChatApp";
import LawyerProfileEdit from "./components/LawyerProfileEdit";
import LawyerDashboard from "./components/LawyerDashboard";
import ContractedUsers from "./components/ContractedUsers";
import AdminForm from "./components/AdminForm";
import AdminPanel from "./components/AdminPanel";
import AdminManagement from "./components/AdminManagement";
import AuditLogs from "./components/AuditLogs";
import LegalTemplates from "./components/LegalTemplates";
import PlatformSettings from "./components/PlatformSettings";
import Security from "./components/Security";
import SystemReport from "./components/SystemReport";

import DigitalAssets from "./components/DigitalAssets";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
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
        <Link to="/LawyerContactDetail" style={{ marginRight: 10 }}>
          LawyerContactDetail
        </Link>
        <Link to="/LawyerList" style={{ marginRight: 10 }}>
          LawyerList
        </Link>
        <br />
        <Link to="/UserProfileEdit" style={{ marginRight: 10 }}>
          UserProfileEdit
        </Link>
        <Link to="/LawyerProfileEdit" style={{ marginRight: 10 }}>
          LawyerProfileEdit
        </Link>
        <Link to="/ChatApp" style={{ marginRight: 10 }}>
          ChatApp
        </Link>
        <Link to="/LawyerDashboard" style={{ marginRight: 10 }}>
          LawyerDashboard
        </Link>
        <Link to="/ContractedUsers" style={{ marginRight: 10 }}>
          ContractedUsers
        </Link>
        <Link to="/AdminForm" style={{ marginRight: 10 }}>
          AdminForm
        </Link>
        <Link to="/AdminPanel" style={{ marginRight: 10 }}>
          AdminPanel
        </Link>
        <Link to="/AdminManagement" style={{ marginRight: 10 }}>
          AdminManagement
        </Link>
        <Link to="/AuditLogs" style={{ marginRight: 10 }}>
          AuditLogs
        </Link>
        <Link to="/LegalTemplates" style={{ marginRight: 10 }}>
          LegalTemplates
        </Link>
        <Link to="/PlatformSettings" style={{ marginRight: 10 }}>
          PlatformSettings
        </Link>
        <Link to="/Security" style={{ marginRight: 10 }}>
          Security
        </Link>
        <br />
        <Link to="/SystemReport" style={{ marginRight: 10 }}>
          SystemReport
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
        <Route path="/LawyerContactDetail" element={<LawyerContactDetail />} />
        <Route path="/LawyerList" element={<LawyerList />} />
        <Route path="/UserProfileEdit" element={<UserProfileEdit />} />
        <Route path="/LawyerProfileEdit" element={<LawyerProfileEdit />} />
        <Route path="/ChatApp" element={<ChatApp />} />
        <Route path="/LawyerDashboard" element={<LawyerDashboard />} />
        <Route path="/ContractedUsers" element={<ContractedUsers />} />
        <Route path="/AdminForm" element={<AdminForm />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/AdminManagement" element={<AdminManagement />} />
        <Route path="/AuditLogs" element={<AuditLogs />} />
        <Route path="/LegalTemplates" element={<LegalTemplates />} />
        <Route path="/PlatformSettings" element={<PlatformSettings />} />
        <Route path="/Security" element={<Security />} />
        <Route path="/SystemReport" element={<SystemReport />} />

        <Route path="/DigitalAssets" element={<DigitalAssets />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
