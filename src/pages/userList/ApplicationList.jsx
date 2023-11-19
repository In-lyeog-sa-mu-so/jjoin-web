import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../Axios';
import styled from 'styled-components';
import '../Notice/NoticeList/CommonTable.css';
import CommonTable from "../Notice/NoticeList/CommonTable";
import './userList.css'

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

const StyledTd = styled.td`
  cursor: pointer;
  background-color: var(--primary);
  color: white;
  &:hover {
    font-weight: bold;
    text-decoration: underline;
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

function ApplicationList() {
    const navigate = useNavigate();
    const { clubId } = useParams();
    const [applicationList, setApplicationList] = useState({data:[], pageInfo:{}});
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가

    const getApplicationList = async (page = 0) => {
      try {
          const resp = await api.get(`/manager/club/${clubId}/application?page=${page}&size=10`);
          if (resp && resp.data) {
              setApplicationList(resp.data);
          } else {
              console.error('No data received');
          }
      } catch (error) {
          console.error('Error fetching data: ', error);
      }
    }

    useEffect(() => {
      getApplicationList(currentPage);
    }, [clubId, currentPage]);

    const moveToPage = (page) => { // 페이지 이동 함수 추가
      setCurrentPage(page);
    };

    const handleRowClick = (application) => {
      navigate(`/manager/club/${clubId}/application/${application}`);
    };

    return (
      <div className="userList">
        <h3>가입신청관리</h3>
        <hr color='darkBlue'/>
        <br />
        <CommonTable headersName={['이름', '학번', '학과', '이메일', '신청일', '신청서']}>
            {applicationList && applicationList.data.map((application)=> (
                <Tr key={application.id}>
                    <Td>{application.name}</Td>
                    <Td>{application.studentId}</Td>
                    <Td>{application.major}</Td>
                    <Td>{application.email}</Td>
                    <Td>{application.requestDate ? application.requestDate.split('T')[0] : ' '}</Td>
                    <StyledTd onClick={() => handleRowClick(application.id)}>가입 신청서 보기</StyledTd>
                </Tr>
            ))}
        </CommonTable>
        <PAGEBUTTON>
            {[...Array(applicationList.pageInfo.totalPages)].map((_, index) => (
                <button onClick={() => moveToPage(index)}
                        style={{
                            color: currentPage === index ? 'darkblue' : 'black',
                            fontWeight: currentPage === index ? 'bold' : 'normal', // 현재 페이지이면 굵게
                            textDecoration: currentPage === index ? 'underline' : 'none' // 현재 페이지이면 밑줄
                        }}
                >{index + 1}</button>
            ))}
        </PAGEBUTTON>
      </div>
    );
}

export default ApplicationList;
