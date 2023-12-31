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
import ApplyFormAddPage from "./pages/apply/ApplyFormAddPage";
import ApplyFormDeletePage from "./pages/apply/ApplyFormDeletePage";
import EventCalendar from "./pages/calendar/EventCalendar";
import AddEvent from "./pages/calendar/AddEvent";
import EditEvent from "./pages/calendar/EditEvent";
import EventDetails from "./pages/calendar/EventDetails";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import ApplicationList from "./pages/userList/ApplicationList";
import ApplicationDetails from "./pages/userList/ApplicationDetail";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Topbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/manager/club" />} />
                    <Route path="/manager/club" element={<Home />} />
                    <Route path='*' element={
                        <div className="container">
                            <Sidebar />
                            <Routes>
                                {/* <Route path='/manager/enrollment' element={<EventCalendar />} /> */}
                                <Route path='/manager/club/:clubId/plan' element={<EventCalendar />} />
                                <Route path="/manager/club/:clubId/notice" element={<NoticeListPage/>}/>
                                <Route path="/manager/club/:clubId/notice/:id" element={<NoticeReadPage/>} />
                                <Route path="/manager/club/:clubId/write" element={<NoticeWritePage/>} />
                                <Route path="/manager/club/:clubId/update/:id" element={<NoticeUpdatePage/>}/>
                                <Route path="/manager/club/:clubId/information" element={<DecoratePage />} />
                                <Route path="/manager/club/:clubId/information/fix" element={<DecorateFixPage/>}/>
                                <Route path="/manager/club/:clubId/users" element={<UserList/>} />
                                <Route path="/manager/club/:clubId/application" element={<ApplicationList/>} />
                                <Route path="/manager/club/:clubId/application/:id" element={<ApplicationDetails/>} />
                                <Route path='/manager/club/:clubId/plan/upload' element={<AddEvent/>} exact />
                                <Route path='/manager/club/:clubId/plan/:defid' element={<EventDetails/>} />
                                <Route path="/manager/club/:clubId/apply" element={<ApplyFormPage/>} />
                                <Route path="/manager/club/:clubId/apply/fix" element={<ApplyFormFixPage/>}/>
                                <Route path="/manager/club/:clubId/apply/add" element={<ApplyFormAddPage/>}/>
                                <Route path="/manager/club/:clubId/apply/delete" element={<ApplyFormDeletePage/>}/>
                                <Route path="/manager/club/:clubId/plan/edit/:defid" element={<EditEvent />} />
                            </Routes>
                        </div>
                    } />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
