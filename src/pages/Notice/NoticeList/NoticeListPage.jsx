import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import CommonTable from "./CommonTable";
import { useLocation } from 'react-router-dom';

const Tr = styled.tr`
  &:hover {
    background-color: #eceaea;
    cursor: pointer;
  }
`;
const Td = styled.td`
  padding: 10px 5px;
  border-bottom: 2px solid lightgray;
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
    text-decoration: underline;
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

/*const PageButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
`;*/
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function NoticeList() {
    const navigate = useNavigate();
    const [noticeList, setNoticeList] = useState([]);
    const baseUrl="https://18821b90-7c6b-4217-b68e-e5775ac40a41.mock.pstmn.io";
    const {clubId} = useParams();
    const query = useQuery();
    const page = query.get('page');
    const size = query.get('size');
    const getBoardList = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/manager/club/${clubId}/notice?page=${page}&size=${size}`);
            if(resp && resp.data) {
                setNoticeList(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, [clubId,page]);
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
                        <Td>{notice.updatedDate}</Td>
                    </Tr>
                ))}
            </CommonTable>
            <br />
            <Container>
                <button onClick={moveToWrite}>글쓰기</button>
            </Container>
        </div>
    );
}

export default NoticeList;