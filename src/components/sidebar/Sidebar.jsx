import React, { useEffect } from "react";
import "./sidebar.css";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignIcon from "@mui/icons-material/Campaign";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import {useRecoilState} from 'recoil';
import { clubListState } from '../../state';
import api from '../../Axios';

export default function Sidebar() {
    const [clubList, setClubList] = useRecoilState(clubListState);

    useEffect(() => {
        const fetchClubList = async () => {
            try {
                const resp = await api.get('/manager/club');
                if (resp && resp.data) {
                    setClubList(resp.data.data);
                } else {
                    console.error('No data received');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchClubList();
    }, []);
    // const clubList = useRecoilValue(clubListState);
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {clubList.map((club, index) => (
                    <div className="sidebarMenu" key={index}>
                        <h3 className="sidebarTitle">{club.name}</h3>
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
                                <Link to={`/manager/club/${club.id}/plan`}>일정등록</Link>
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
                    </div>
                ))}
            </div>
        </div>
    );
}
