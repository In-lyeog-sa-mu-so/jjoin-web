import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import api from '../../../Axios';
import styled from "styled-components";
import CommonTable from "./CommonTable";

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
const H2 = styled.h2`
  padding-left: 5%;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; // 혹은 원하는 색상
  float: left;
  margin-left: 200px;
  &:hover {
    font-weight: bold;
  }
`;
const Container = styled.div`
  float: right;
  display: flex;
  padding-bottom:10px;
  margin-right:5%;
  button{
    width: 80px;
    height: 40px;
    margin-top: 20px;
    margin-left:1%;
    background-color: darkblue; /* Change color */
    font-size: 15px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: darkgrey;
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

function NoticeList() {
    const navigate = useNavigate();
    const [noticeList, setNoticeList] = useState([]);
    
    const {clubId} = useParams();
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가

    const getBoardList = async (page = 0) => { // page 파라미터 추가
        try {
            const resp = await api.get(`/manager/club/${clubId}/notice?page=${page}&size=10`);
            if(resp && resp.data) {
                setNoticeList(resp.data.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        getBoardList(currentPage); // 현재 페이지로 게시글 목록 조회 함수 호출
    }, [clubId, currentPage]); // currentPage가 변경되면 useEffect 재실행

    const moveToPage = (page) => { // 페이지 이동 함수 추가
        setCurrentPage(page);
    };
    const moveToWrite = () => {
        navigate(`/manager/club/${clubId}/write`);
    };

    return (
        <div>
            <H2>공지사항</H2>
            <CommonTable headersName={['글번호', '제목', '작성일']}>
                {noticeList&&noticeList.map((notice)=> (
                    <Tr key={notice.id}>
                        <Td>{notice.id}</Td>
                        <Td>
                            <StyledLink to={`/manager/club/${clubId}/notice/${notice.id}`}>
                                {notice.title}
                            </StyledLink>
                        </Td>
                        <Td>{notice.updatedDate ? notice.updatedDate.split('T')[0] : ' '}</Td>
                    </Tr>
                ))}
            </CommonTable>
            <PAGEBUTTON>
                {[...Array(10)].map((_, index) => (
                    <button onClick={() => moveToPage(index)}>{index + 1}</button>
                ))}
            </PAGEBUTTON>
            <Container>
                <button onClick={moveToWrite}>글쓰기</button>
            </Container>
        </div>
    );
}

export default NoticeList;