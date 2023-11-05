import React from "react";
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar"
import NoticeListPage from "./pages/Notice/NoticeList/NoticeListPage"
import NoticeReadPage from "./pages/Notice/NoticeReadPage";
import NoticeWritePage from "./pages/Notice/NoticeWritePage";
import NoticeUpdatePage from "./pages/Notice/NoticeUpdatePage";
import Home from './pages/home/Home';
import UserList from "./pages/userList/UserList";
import ReactCalendar from "./pages/calendar/Calendar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/notice" element={<NoticeListPage />} />
          <Route path="/notice/:id" element={<NoticeReadPage/>} />
          <Route path="/write" element={<NoticeWritePage/>} />
          <Route path="/update/:id" element={<NoticeUpdatePage/>}/>
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<UserList/>} />
          <Route path="/calendar" element={<ReactCalendar/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
