import React, { useEffect } from "react";
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
    gap: 30px;
    background: white;
    box-shadow: #ddd 0px 3px 8px;
    border-radius: 12px;
    width: 100%;
    height: 200px;
    justify-content: center;
    background: linear-gradient(45deg, white 90%, var(--primary) 10%);
    position: relative;
    box-sizing: border-box;

    &:hover {
        border: 1.5px solid var(--primary);
        background: linear-gradient(45deg, #eef3fe 90%, var(--primary) 10%);
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

function MainPage(){
    const [clubList, setClubList] = useRecoilState(clubListState);

    const getClubList = async () => {
        try {
            const resp = await api.get(`/manager/club`);
            if (resp && resp.data) {
                setClubList(resp.data.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    useEffect(() => {
        getClubList();
    }, []);

    return(
        <div>
            <H2>동아리 관리</H2>
            {clubList && clubList.length > 0 ? (
                <CLICK>
                    {clubList.map((club) => (
                        <StyledLink to={`/manager/club/${club.id}/notice`} key={club.id}>
                            <span>{club.name}</span>
                            <ArrowForwardIcon sx={{ color: 'var(--primary)' }} />
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
