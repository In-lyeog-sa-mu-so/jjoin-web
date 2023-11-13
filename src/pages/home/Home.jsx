import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
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
    text-decoration: underline;
    background-color: lightblue;
}
  display: inline-block;
  width: 400px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 25px;  // 타원 형태를 만들기 위한 border-radius 값입니다.
  background-color: #f8f9fa;  // 배경 색상입니다. 원하는 색상으로 변경하세요.
  color: #343a40;  // 텍스트 색상입니다. 원하는 색상으로 변경하세요.
`;
function MainPage(){
    const [clubList, setClubList] = useRecoilState(clubListState);
    const baseUrl="https://7f43ee63-b0b8-4e87-9c96-a7c2c01a39f5.mock.pstmn.io";

    const getClubList = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/manager`);
            if(resp && resp.data) {
                setClubList(resp.data);
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
            <CLICK>
                {clubList&&clubList.map((club) => (
                    <div key={club.id}>
                        <div>
                            <StyledLink to={`/manager/club/${club.id}/users`}>
                                {club.name}
                            </StyledLink>
                        </div>
                    </div>
                ))}
            </CLICK>
        </div>
    );
}

export default MainPage;