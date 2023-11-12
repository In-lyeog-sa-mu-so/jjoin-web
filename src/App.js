import React from "react";
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar"
import NoticeListPage from "./pages/Notice/NoticeList/NoticeListPage"
import NoticeReadPage from "./pages/Notice/NoticeReadPage";
import NoticeWritePage from "./pages/Notice/NoticeWritePage";
import NoticeUpdatePage from "./pages/Notice/NoticeUpdatePage";
import DecoratePage from "./pages/decorate/DecoratePage";
import DecorateFixPage from "./pages/decorate/DecorateFixPage";
import Home from './pages/home/Home';
import UserList from "./pages/userList/UserList";
import ApplyFormPage from "./pages/apply/ApplyFormPage";
import ApplyFormFixPage from "./pages/apply/ApplyFormFixPage";
import EventCalendar from "./pages/calendar/EventCalendar";
import AddEvent from "./pages/calendar/AddEvent";
import EventDetails from "./pages/calendar/EventDetails";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import EditEvent from "./pages/calendar/EditEvent";

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
                    <Route path="/update" element={<DecorateFixPage/>}/>
                    <Route path="/users" element={<UserList/>} />
                    <Route path='/upload' element={<AddEvent/>} exact />
                    <Route path='/calendar/:defid' element={<EventDetails/>} exact />
                    <Route path="/calendar/edit/:defid" element={<EditEvent />} />
                    <Route path="/apply" element={<ApplyFormPage/>} />
                    <Route path="/apply/fix" element={<ApplyFormFixPage/>}/>
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
