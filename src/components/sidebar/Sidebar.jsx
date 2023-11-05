import React, { useState } from "react";
import "./sidebar.css";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignIcon from "@mui/icons-material/Campaign";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";

export default function Sidebar() {
const clubs = [
    {
        name: "세미콜론",
    },
    {
        name: "컴퓨터공학과 학생회",
    },
    {
        name: "JAVAS",
    },
];

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {clubs.map((club, index) => (
          <div className="sidebarMenu" key={index}>
            <h3 className="sidebarTitle">{club.name}</h3>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <PersonIcon className="sidebarIcon" />
                    <Link to="/users">인원관리</Link>
                </li>
                <li className="sidebarListItem">
                    <NotificationsIcon className="sidebarIcon" />
                    <Link to="/notice">공지사항</Link>
                </li>
                <li className="sidebarListItem">
                    <CalendarMonthIcon className="sidebarIcon" />
                    <Link to="/calendar">일정등록</Link>
                </li>
                <li className="sidebarListItem">
                    <CampaignIcon className="sidebarIcon" />
                    <Link to="/decorate">홍보페이지 관리</Link>
                </li>
                <li className="sidebarListItem">
                    <DescriptionIcon className="sidebarIcon" />
                    신청서 관리
                </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
