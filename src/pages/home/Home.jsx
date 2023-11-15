import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import api from '../../Axios';
import styled from 'styled-components';
import {useRecoilState} from 'recoil';
import { clubListState } from '../../state';

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`
const CLICK = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 20px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    font-weight: bold;
    background-color: lightblue;
}
  display: inline-block;
  text-align: center;
  font-size: 20px;
  width: 500px;
  line-height: 50px;
  height: 50px;
  padding: 10px 20px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 25px;
  background-color: #f8f9fa;
  color: #343a40;
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
                        <div key={club.id}>
                            <div>
                                <StyledLink to={`/manager/club/${club.id}/notice`}>
                                    <span>{club.name}</span>
                                </StyledLink>
                            </div>
                        </div>
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