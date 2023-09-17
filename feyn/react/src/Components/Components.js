import React from "react";
import Home from "./Home/Home.js";
import Pages from "./Pages/Pages.js"
import Playback from "./Playback/Playback.js"
import Record from "./Record/Record.js"
import Results from "./Results/Results.js"
import Upload from "./Upload/Upload.js"
import Loading from "./Loading/Loading.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Main Parent Component that compiles all Child Components
const Components = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pages" element={<Pages />}></Route>
        <Route path="/playback" element={<Playback />}></Route>
        <Route path="/record" element={<Record />}></Route>
        <Route path="/results" element={<Results />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
      </Routes>
    </Router>
  );
};

export default Components;
