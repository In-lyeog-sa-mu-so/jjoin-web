import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import api from '../../Axios';
import styled from 'styled-components';
import {useRecoilState} from 'recoil';
import { clubListState } from '../../state';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 60px;
`
const CLICK = styled.div`
  display: grid;
  margin: 20px 250px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color:#5a6077;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    background: white;
    box-shadow: #ddd 0px 3px 8px;
    border-radius: 12px;
    width: 100%;
    height: 450px;
    justify-content: center;
    background: linear-gradient(45deg, white 92%, var(--primary) 8%);
    position: relative;
    box-sizing: border-box;
  span{
    width:90%;
    font-size: 14px;
    display: flex;
    justify-content: center;
    color: black;
  }
  h2{
    color: black;
  }
  img{
    height:180px;
    width: 250px;
  }

    &:hover {
        border: 1.5px solid var(--primary);
        background: linear-gradient(45deg, #eef3fe 91%, var(--primary) 9%);
    }

    &:hover svg{
        display: block;
    }
    svg {
        position: absolute;
        bottom: 20px;
        display: none;
    }
`;

function MainPage() {
    const [clubList, setClubList] = useRecoilState(clubListState);
    const [loading, setLoading] = useState(true);

    const getClubList = async () => {
        try {
            const resp = await api.get(`/manager/club`);
            if (resp && resp.data && resp.data.data) {
                setClubList(resp.data.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClubList();
    }, []);

    return (
        <div>
            <H2>동아리 관리</H2>
            {loading ? (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    fontSize: '50px',
                    margin: '100px',
                    color: '#888'
                }}>
                    데이터를 불러오는 중입니다...
                </div>
            ) : clubList.length > 0 ? (
                <CLICK>
                    {clubList.map((club) => (
                        <StyledLink to={`/manager/club/${club.id}/notice`} key={club.id}>
                            <img src={`https://jjoin.dcs-hyungjoon.com/images/${club.profileImageUuid}`} alt="프로필사진"/>
                            <h3>{club.name}</h3>
                            <span>{club.introduction}</span>
                            <span>회장: {club.leaderName}</span>
                            <span>가입자 수: {club.numberOfMembers}명</span>
                            <ArrowForwardIcon sx={{color: 'var(--primary)'}}/>
                        </StyledLink>
                    ))}
                </CLICK>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    fontSize: '50px',
                    margin: '100px',
                    color: '#888'
                }}>
                    등록된 동아리가 없습니다. 😔
                </div>
            )}
        </div>
    );
}

export default MainPage;
