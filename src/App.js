import React from "react";
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
          {/* <Route path="/users" element={<UserList/>} />
          <Route path="/calendar" element={<ReactCalendar/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
