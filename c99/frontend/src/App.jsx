import React from "react";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Landing from "./Pages/Landing";
import ChatBot from "./Pages/user/ChatBot";
import Intermediate from "./Pages/user/Phase1Intermediate";
import MCQ from "./Pages/user/Phase1Basic";
import Advance from "./Pages/user/Phase1Advanced";
import Phase2Basic from "./Pages/user/Phase2Basic";
import Phase2Intermediate from "./Pages/user/Phase2Intermediate";
import Phase2Advanced from "./Pages/user/Phase2Advanced";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/chatBot" element={<ChatBot />} />
          <Route path="/mcq" element={<MCQ />} />
          <Route path="/phase1intermediate" element={<Intermediate />} />
          <Route path="/phase1advance" element={<Advance />} />
          <Route path="/phase2basic" element={<Phase2Basic />} />
          <Route path="/phase2intermediate" element={<Phase2Intermediate />} />
          <Route path="/phase2advanced" element={<Phase2Advanced />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
