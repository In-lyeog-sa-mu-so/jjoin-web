import React, { useState, useEffect } from "react";
import './home.css'
import api from '../../Axios';

const Home = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/manager/club');
                setGroups(response.data.data); // JSON 구조에 따라서 접근
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div className='Home'>
            <h2>동아리 관리 목록</h2>
            <div className="clubInfo">
                {groups.map(group => (
                    <li key={group.groupId}>
                    {group.groupName}
                    </li>
                ))}
            </div>
        </div>
    );
}

export default Home;
// export default function Home() {
//     return (
//         <><div className="club">동아리 관리자</div>
//         <div className="service">서비스 관리자</div></>
//     );
// }