import React from "react";
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar"
import NoticeListPage from "./pages/Notice/NoticeList/NoticeListPage"
import NoticeReadPage from "./pages/Notice/NoticeReadPage";
import NoticeWritePage from "./pages/Notice/NoticeWritePage";
import NoticeUpdatePage from "./pages/Notice/NoticeUpdatePage";
import DecoratePage from "./pages/decorate/DecoratePage";
import DecorateUpdatePage from "./pages/decorate/DecorateUpdatePage";
import Home from './pages/home/Home';
import UserList from "./pages/userList/UserList";
import EventCalendar from "./pages/calendar/EventCalendar";
import AddEvent from "./pages/calendar/AddEvent";
import EventDetails from "./pages/calendar/EventDetails";
import ApplicationForm from "./pages/apply/ApplicationForm";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

// 새로운 버튼 컴포넌트 정의
const AddEventButton = () => {
    const navigate = useNavigate();
  
    return (
      <PositionBtn>
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => navigate('/upload')}
        >
          <AddIcon />
        </Fab>
      </PositionBtn>
    );
};

function App() {
    return (
        <Router>
            <Topbar />
            <div className="container">
                <Sidebar />
                <Routes>
                    <Route path='/calendar' element={
                        <>
                            <EventCalendar />
                            <AddEventButton />
                        </>
                    } />
                    <Route exact path="/" element={<Home />} />
                    <Route path="/notice" element={<NoticeListPage/>}/>
                    <Route path="/notice/:id" element={<NoticeReadPage/>} />
                    <Route path="/write" element={<NoticeWritePage/>} />
                    <Route path="/update/:id" element={<NoticeUpdatePage/>}/>
                    <Route path="/decorate" element={<DecoratePage />} />
                    <Route path="/update" element={<DecorateUpdatePage/>}/>
                    <Route path="/users" element={<UserList/>} />
                    <Route path='/upload' element={<AddEvent/>} exact />
                    <Route path='/detail/:defid' element={<EventDetails/>} exact />
                    <Route path="/apply" element={<ApplicationForm/>} />
                </Routes>
            </div>
        </Router>
    );
}

const PositionBtn = styled.div`
  position: fixed;
  top: 90%;
  right: 50px;
  z-index: 10;
  @media only screen and (max-width: 768px) {
    top: 90%;
    left: 10px;
  }
`;

export default App;
