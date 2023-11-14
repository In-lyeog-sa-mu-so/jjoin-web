import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Axios';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  width: 90%;
`
const CONTENTS= styled.div`
  width: 95%;
  margin-left: 2%;
  height: 100%;
`;
const H2 = styled.h2`
  margin-left: 7%;
  span{
    font-size: 13px;
    color: gray;
    margin-left: 10px;
  }
`;
const TITLE = styled.div`
  border-bottom : 2px solid darkblue;
  display: flex;
`;
const DATE = styled.div`
  border-bottom : 2px solid black;
  padding-bottom: 30px;
  span{
    position: relative;
    top: 13px;
    font-size: 16px;
    margin-right: 2%;
  }
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
  padding-bottom: 2%;
  border-top : 2px solid black;
  button{
    margin-top: 20px;
    margin-left:1%;
    padding: 8px 25px; /* Increase size, adjust as needed */
    background-color: darkblue; /* Change color */
    font-size: 15px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: darkgrey;
    }
  }
`
const Board = ({ id, title, content, createdDate, updatedDate}) => {
    const navigate = useNavigate();
    const { clubId } = useParams();
    const moveToUpdate = () => {
        navigate(`/manager/club/${clubId}/update/${id}`);
    };

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await api.delete(`/manager/club/${clubId}/notice/${id}`).then((res) => {
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
            <H2>공지사항 <span>> 공지상세</span></H2>
            <CONTAINER>
                <CONTENTS>
                    <TITLE>
                        <h1>{title}</h1>
                    </TITLE>
                    <DATE>
                        <span>최초 작성 날짜</span>
                        <span>{createdDate}</span>
                        <span>수정된 날짜</span>
                        <span>{updatedDate}</span>
                    </DATE>
                    <CONTENT>
                        <a>
                            {content}
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