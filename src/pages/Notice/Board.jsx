import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  background-color: #EFEFEF;
  width: 90%;
`
const CONTENTS= styled.div`
  width: 95%;
  margin-left: 2%;
  height: 550px;
`;
const H2 = styled.h2`
  margin-left: 5%;
`;
const TITLE = styled.div`
  border-bottom : 2px solid black;
  display: flex;
`;
const DATE = styled.div`
  border-bottom : 2px solid black;
  a{
    position: relative;
    top: 13px;
    font-size: 16px;
    &:first-child{
      margin-right: 2%;
    }
  }
  height: 10%;
`;
const CONTENT = styled.table`
  min-height: 300px;
  a{
    position: relative;
    top: 13px;
  }
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: flex-end;
  button{
    margin-left:1%;
    padding: 8px 25px; /* Increase size, adjust as needed */
    background-color: lightgrey; /* Change color */
    font-size: 15px;
    cursor: pointer;
    &:hover {
      background-color: darkgrey;
    }
  }
`
const Board = ({ id, title, contents, updateddata }) => {
    const navigate = useNavigate();
    const { clubId } = useParams();
    const moveToUpdate = () => {
        navigate(`/manager/club/${clubId}/update/${id}`);
    };

    const baseUrl="https://7f43ee63-b0b8-4e87-9c96-a7c2c01a39f5.mock.pstmn.io";

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`${baseUrl}/manager/club/${clubId}/notice/${id}`).then((res) => {
                alert('삭제되었습니다.');
                navigate(`/manager/club/${clubId}/notice`);
            });
        }
    };

    const moveToList = () => {
        navigate(`/manager/club/${clubId}/notice`);
    };

    return (<>
        <div>
            <H2>공지사항</H2>
            <CONTAINER>
                <CONTENTS>
                    <TITLE>
                        <h1>{title}</h1>
                    </TITLE>
                    <DATE>
                        <a>작성일</a>
                        <a>{updateddata}</a>
                    </DATE>
                    <CONTENT>
                        <a>
                            {contents}
                        </a>
                    </CONTENT>
                    <BUTTONS>
                        <button onClick={moveToUpdate}>수정</button>
                        <button onClick={deleteBoard}>삭제</button>
                        <button onClick={moveToList}>목록</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    </>);
};

export default Board;