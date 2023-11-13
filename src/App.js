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
import EditEvent from "./pages/calendar/EditEvent";
import EventDetails from "./pages/calendar/EventDetails";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import {RecoilRoot} from 'recoil';

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
        <RecoilRoot>
            <Router>
                <Topbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/manager" />} />
                    <Route path="/manager" element={<Home />} />
                    <Route path='*' element={
                        <div className="container">
                            <Sidebar />
                            <Routes>
                                <Route path='/manager/club/{clubId}/calendar' element={
                                    <>
                                        <EventCalendar />
                                        <AddEventButton />
                                    </>
                                } />
                                <Route path="/manager/club/:clubId/notice" element={<NoticeListPage/>}/>
                                <Route path="/manager/club/:clubId/notice/:id" element={<NoticeReadPage/>} />
                                <Route path="/manager/club/:clubId/write" element={<NoticeWritePage/>} />
                                <Route path="/manager/club/:clubId/update/:id" element={<NoticeUpdatePage/>}/>
                                <Route path="/manager/club/:clubId/information" element={<DecoratePage />} />
                                <Route path="/manager/club/:clubId/information/fix" element={<DecorateFixPage/>}/>
                                <Route path="/manager/club/:clubId/users" element={<UserList/>} />
                                <Route path='/manager/club/:clubId/upload' element={<AddEvent/>} exact />
                                <Route path='/manager/club/:clubId/detail/:defid' element={<EventDetails/>} exact />
                                <Route path="/manager/club/:clubId/apply" element={<ApplyFormPage/>} />
                                <Route path="/manager/club/:clubId/apply/fix" element={<ApplyFormFixPage/>}/>
                                <Route path="/manager/club/:clubId/calendar/edit/:defid" element={<EditEvent />} />
                            </Routes>
                        </div>
                    } />
                </Routes>
            </Router>
        </RecoilRoot>
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
