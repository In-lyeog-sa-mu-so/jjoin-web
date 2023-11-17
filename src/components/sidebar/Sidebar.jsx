import React, { useState, useEffect } from "react";
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
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
    const [clubList, setClubList] = useRecoilState(clubListState);
    const [activatedClub, setActivatedClub] = useState();
    const [activatedMenu, setActivatedMenu] = useState();
    const location = useLocation();

    const clubMenuList = [
        {
            path: 'users',
            menuName: '인원관리',
            icon: <PersonIcon className="sidebarIcon" />
        },
        {
            path: 'notice',
            menuName: '공지사항',
            icon: <NotificationsIcon className="sidebarIcon" />
        },
        {
            path: 'plan',
            menuName: '일정등록',
            icon: <CalendarMonthIcon className="sidebarIcon" />
        },
        {
            path: 'information',
            menuName: '홍보페이지 관리',
            icon: <CampaignIcon className="sidebarIcon" />
        },
        {
            path: 'apply',
            menuName: '신청서 관리',
            icon: <DescriptionIcon className="sidebarIcon" />
        },
    ]

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

    useEffect(() => {
        const path = location.pathname;
        const matches = path.match(/\/(\d+)\/(\w+)(\/.*)?$/);

        if (!matches) return;
        const clubId = matches[1];
        const menu = matches[2];

        setActivatedClub(Number(clubId));
        setActivatedMenu(menu);

        console.log(activatedClub, activatedMenu)
      }, [location]);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {clubList.map((club, index) => (
                    <div className="sidebarMenu" key={index}>
                        <h3 className="sidebarTitle">{club.name}</h3>
                        <ul className="sidebarList">
                            {
                                clubMenuList.map((menu) => (
                                    <li className={`sidebarListItem ${activatedClub === club.id && activatedMenu === menu.path ? 'sidebarListItemActivated' : ''}`} key={menu.menuName}>
                                        {menu.icon}
                                        <Link to={`/manager/club/${club.id}/${menu.path}`}>{menu.menuName}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
