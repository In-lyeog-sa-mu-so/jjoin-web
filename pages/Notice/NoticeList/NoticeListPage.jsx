import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import CommonTable from "./CommonTable";

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
  & > button {
    height: 25px; 
    margin-left: 10px;
    cursor: pointer;
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

function NoticeList() {
    const navigate = useNavigate();
    const [noticeList, setNoticeList] = useState([]);
    /*const [page, setPage] = useState(0);
    const size = 10;*/
    const getBoardList = async () => {
        const resp = await axios.get('https://fe54c381-c22f-4101-b015-1d8ef0ec8ff9.mock.pstmn.io/notice');
        setNoticeList(resp.data);
    }
    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);
    const moveToWrite = () => {
        navigate('/write');
    };

    return (
        <div>
            <H2>공지사항</H2>
            <Container>
                <select>
                    <option value="">-선택-</option>
                    <option value="title">제목</option>
                    <option value="contents">내용</option>
                </select>
                <input type="text"/>
                <button>검색</button>
            </Container>
            <CommonTable headersName={['글번호', '제목', '작성일']}>
                {noticeList&&noticeList.map((notice)=> (
                    <Tr key={notice.id}>
                        <Td>{notice.id}</Td>
                        <Td>
                            <StyledLink to={`/notice/${notice.id}`}>
                                {notice.title}
                            </StyledLink>
                        </Td>
                        <Td>{notice.updateddata}</Td>
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