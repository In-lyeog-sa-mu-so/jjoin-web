import React, { useEffect, useState } from "react";
import "./sidebar.css";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignIcon from "@mui/icons-material/Campaign";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link, useParams } from "react-router-dom";
import {useRecoilValue} from 'recoil';
import { clubListState } from '../../state';

export default function Sidebar() {
    const clubList = useRecoilValue(clubListState);
    const {clubId} = useParams();
    const [activeIndex, setActiveIndex] = useState(-1);  // 펼쳐진 메뉴를 관리하는 상태

    useEffect(() => {
        const index = clubList.findIndex(club => club.clubId === Number(clubId));
        setActiveIndex(index !== -1 ? index : -1);
    }, [clubId, clubList]);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {clubList.map((club, index) => (
                    <div className="sidebarMenu" key={index}>
                        <h3 className="sidebarTitle"
                            style={{
                                backgroundColor: activeIndex === index ? 'lightblue' : 'transparent',
                                borderRadius: '10px'  // 모서리를 둥글게 만드는 속성 추가
                            }}
                            onClick={() => handleClick(index)}>
                            {club.name}
                        </h3>
                        {activeIndex === index && (  // 펼쳐진 메뉴만 보이도록 조건부 렌더링
                            <ul className="sidebarList">
                                <li className="sidebarListItem">
                                    <PersonIcon className="sidebarIcon" />
                                    <Link to={`/manager/club/${club.id}/users`}>인원관리</Link>
                                </li>
                                <li className="sidebarListItem">
                                    <NotificationsIcon className="sidebarIcon" />
                                    <Link to={`/manager/club/${club.id}/notice`}>공지사항</Link>
                                </li>
                                <li className="sidebarListItem">
                                    <CalendarMonthIcon className="sidebarIcon" />
                                    <Link to={`/manager/club/${club.id}/calendar`}>일정등록</Link>
                                </li>
                                <li className="sidebarListItem">
                                    <CampaignIcon className="sidebarIcon" />
                                    <Link to={`/manager/club/${club.id}/information`}>홍보페이지 관리</Link>
                                </li>
                                <li className="sidebarListItem">
                                    <DescriptionIcon className="sidebarIcon" />
                                    <Link to={`/manager/club/${club.id}/apply`}>신청서 관리</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
