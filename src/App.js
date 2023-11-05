import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import NoticeListPage from "./pages/Notice/NoticeList/NoticeListPage"
import NoticeReadPage from "./pages/Notice/NoticeReadPage";
import NoticeWritePage from "./pages/Notice/NoticeWritePage";
import NoticeUpdatePage from "./pages/Notice/NoticeUpdatePage";

function App(props) {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/notice" element={<NoticeListPage />} />
                    <Route path="/notice/:id" element={<NoticeReadPage/>} />
                    <Route path="/write" element={<NoticeWritePage/>} />
                    <Route path="/update/:id" element={<NoticeUpdatePage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
