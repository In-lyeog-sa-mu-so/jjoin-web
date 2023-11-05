import React, { useState } from "react";
import "./sidebar.css";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignIcon from "@mui/icons-material/Campaign";
import DescriptionIcon from "@mui/icons-material/Description";

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
                    인원관리
                </li>
                <li className="sidebarListItem">
                    <NotificationsIcon className="sidebarIcon" />
                    공지사항
                </li>
                <li className="sidebarListItem">
                    <CalendarMonthIcon className="sidebarIcon" />
                    일정등록
                </li>
                <li className="sidebarListItem">
                    <CampaignIcon className="sidebarIcon" />
                    홍보페이지 관리
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
