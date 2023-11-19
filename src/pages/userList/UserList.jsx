import React, { useEffect, useState } from "react";
import './userList.css';
import '../Notice/NoticeList/CommonTable.css';
import CommonTable from "../Notice/NoticeList/CommonTable";
import api from '../../Axios';
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

const Dropdown = styled.select`
  padding: 5px 10px;
  margin-right: 10px;
  border: 2px solid #D2D2FF;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-size: 15px;
  cursor: pointer;
  option {
    padding: 5px;
  }
`;

const ChangeButton = styled.button`
  padding: 5px 15px;
  margin-right: 10px;
  background-color: var(--primary);
  color: white;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: darkblue;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 15px;
  margin-right: 10px;
  background-color: red;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: darkblue;
  }
  &:last-child {
    margin-right: 0;
  }
`;

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
  float: right;
  display: flex;
  padding-bottom:10px;
  margin-right:5%;
  button{
    width: 150px;
    height: 100px;
    margin-top: 20px;
    margin-left: 1%;
    background-color: var(--primary);
    font-size: 18px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
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
    const [selectedRank, setSelectedRank] = useState("");

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

    const changePosition = async (userId, newRank) => {
        try {
            const response = await api.patch(`/manager/club/${clubId}/member/${userId}/rank/${newRank}`);
            if (response.status === 200) {
                alert('직책이 변경되었습니다.');
                getMemberList(currentPage); // 멤버 목록 업데이트
            }
        } catch (error) {
            console.error('직책 변경 실패: ', error);
            alert('직책 변경에 실패했습니다.');
        }
    };

    const handleRankChange = (userId) => {
        if (selectedRank) {
            changePosition(userId, selectedRank);
        } else {
            alert('변경할 직책을 선택해주세요.');
        }
    };

    const moveToPage = (page) => { // 페이지 이동 함수 추가
        setCurrentPage(page);
    };

    const goToApplicationList = () => {
        navigate(`/manager/club/${clubId}/application`);
    }

    const deleteMember = (memberId) => {
        const isConfirmed = window.confirm("정말 퇴출하시겠습니까?");
        if (isConfirmed) {
            api.delete(`/manager/club/${clubId}/member/${memberId}`)
            .then(() => {
                alert('멤버가 퇴출되었습니다.');
                getMemberList(currentPage); // 현재 페이지의 멤버 목록을 다시 불러옴
                navigate(`/manager/club/${clubId}/users`); // 멤버 퇴출
            })
            .catch(error => {
                console.error('Error deleting member', error);
                alert('멤버 삭제에 실패했습니다.');
                navigate(`/manager/club/${clubId}/users`);
            });
        }
        else {
            navigate(`/manager/club/${clubId}/users`);
        }
    };

    return (
        <div className="userList">
            <h3>멤버관리</h3>
            <hr color="darkBlue"/>
            <br />
            <CommonTable headersName={['ID', '이름', '학번', '학과', '이메일', '가입일', '직책', '변경']}>
                {memberList && memberList.data.map((member)=> (
                    <Tr key={member.userId}>
                        <Td>{member.userId}</Td>
                        <Td>{member.userName}</Td>
                        <Td>{member.studentId}</Td>
                        <Td>{member.major}</Td>
                        <Td>{member.email}</Td>
                        <Td>{member.registerDate ? member.registerDate.split('T')[0] : ' '}</Td>
                        <Td>{member.position}</Td>
                        <Td>
                            {member.position !== 'LEADER' && (
                                <>
                                <Dropdown onChange={(e) => setSelectedRank(e.target.value)}>
                                  <option value="">직책 선택</option>
                                  <option value="LEADER">LEADER</option>
                                  <option value="MANAGER">MANAGER</option>
                                  <option value="MEMBER">MEMBER</option>
                                </Dropdown>
                                <ChangeButton onClick={() => handleRankChange(member.userId)}>직책 변경</ChangeButton>
                                <DeleteButton onClick={() => deleteMember(member.userId)}>퇴출</DeleteButton>
                                </>
                            )}
                        </Td>
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
                <button onClick={goToApplicationList}>가입 신청 현황</button>
            </Container>
        </div>
    );
}

export default MemberList;