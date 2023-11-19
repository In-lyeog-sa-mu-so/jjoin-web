import React, { useEffect, useState } from "react";
import './userList.css';
import '../Notice/NoticeList/CommonTable.css';
import CommonTable from "../Notice/NoticeList/CommonTable";
import api from '../../Axios';
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

const Tr = styled.tr`
  &:hover {
    background-color: aliceblue;
    cursor: pointer;
  }
`;
const Td = styled.td`
  padding: 10px 5px;
  border-bottom: 2px solid #D2D2FF;
`;

const Container = styled.div`
  float: left;
  display: flex;
  padding-bottom:10px;
  margin-right:5%;
  button{
    width: 150px;
    height: 80px;
    margin-top: 20px;
    margin-left:1%;
    background-color: var(--primary); /* Change color */
    font-size: 15px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: darkblue;
    }
  }
  & > input {
    height: 20px;
    margin-left: 10px;
    border: 2px solid gray;
  }
`;

const PAGEBUTTON = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  button {
    border: none;
    font-size: 15px;
    margin-right: 5px;
    background-color: white;
    color: ${props => props.current ? 'red' : 'black'};
    &:hover {
      font-weight:bold;
      cursor: pointer;
    }
  }
`;

function MemberList() {
    const navigate = useNavigate();
    const [memberList, setMemberList] = useState({data:[], pageInfo:{}});
    const { clubId } = useParams();
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가
    
    const getMemberList = async (page = 0) => {
        try {
            const resp = await api.get(`/manager/club/${clubId}/member?page=${page}&size=10`);
            if (resp && resp.data) {
                setMemberList(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    useEffect(() => {
        getMemberList(currentPage);
    }, [clubId, currentPage]);

    const moveToPage = (page) => { // 페이지 이동 함수 추가
        setCurrentPage(page);
    };

    const goToApplicationList = () => {
        navigate(`/manager/club/${clubId}/application`);
    }

    // const deleteMember = () => {
    //     api.delete(`/manager/club/${clubId}/member/${userId}`)
    //     .then(() => {
    //       alert('멤버가 퇴출되었습니다.');
    //       navigate(`/manager/club/${clubId}/member`); // 멤버 퇴출
    //     })
    //     .catch(error => {
    //       console.error('Error deleting member', error);
    //       alert('일정 삭제에 실패했습니다.');
    //       navigate(`/manager/club/${clubId}/member`); // 삭제 후 캘린더 페이지로 이동
    //     });
    //   };

    return (
        <div className="userList">
            <h3>멤버관리</h3>
            <hr color="darkBlue"/>
            <br />
            <CommonTable headersName={['ID', '이름', '학번', '학과', '이메일', '가입일', '직책']}>
                {memberList && memberList.data.map((member)=> (
                    <Tr key={member.userId}>
                        <Td>{member.userId}</Td>
                        <Td>{member.userName}</Td>
                        <Td>{member.studentId}</Td>
                        <Td>{member.major}</Td>
                        <Td>{member.email}</Td>
                        <Td>{member.registerDate ? member.registerDate.split('T')[0] : ' '}</Td>
                        <Td>{member.position}</Td>
                    </Tr>
                ))}
            </CommonTable>
            <PAGEBUTTON>
                {[...Array(memberList.pageInfo.totalPages)].map((_, index) => (
                    <button onClick={() => moveToPage(index)}
                            style={{
                                color: currentPage === index ? 'darkblue' : 'black',
                                fontWeight: currentPage === index ? 'bold' : 'normal', // 현재 페이지이면 굵게
                                textDecoration: currentPage === index ? 'underline' : 'none' // 현재 페이지이면 밑줄
                            }}
                    >{index + 1}</button>
                ))}
            </PAGEBUTTON>
            <Container>
                <button onClick={goToApplicationList}>가입 신청 목록</button>
            </Container>
        </div>
    );
}

export default MemberList;