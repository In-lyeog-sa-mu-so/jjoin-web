import React, { useState } from 'react';
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
  display: flex;
  align-items: center;
  padding-top: 30px;
  font-weight: bold;
  input{
    margin-left: 20px;
    width: 400px;
    height: 30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(150,150,150,0.1);
  }
  select{
    margin-left:30px;
    height: 30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(150,150,150,0.1);
  }
`;

const CONTENT = styled.table`
  display: flex;
  align-items: center;
  min-height: 300px;
  padding-top: 30px;
  font-weight: bold;
  textarea{
    margin-left: 20px;
    height: 300px;
    width: 94%;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(150,150,150,0.1);
    resize: none;
  }
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top:2%;
  button + button {
    margin-left: 10px;
  }
  button{
    margin-right:1%;
    padding: 12px 25px; /* Increase size, adjust as needed */ /* Change color */
    font-size: 15px;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    background: darkblue;
    color: white;

    &:hover {
      background-color: darkgrey;
    }
  }
`

const NoticeWrite = () => {
    const navigate = useNavigate();
    const { clubId } = useParams();
    const [notice, setNotice] = useState({
        title: '',
        content: '',
        isPrivate: 1
    });

    const { title, content } = notice; //비구조화 할당
    
    const onChange = (event) => {
        const { value, name } = event.target;
        let modifiedValue = value;

        if(name === 'isPrivate') {
            modifiedValue = value === '전체' ? 0 : 1;
        }

        setNotice({
            ...notice,
            [name]: modifiedValue,
        });
    };

    const saveBoard = async () => {
        if (title.trim() === '') {
            alert('제목을 입력해주세요');
            return;
        }
        if (content.trim() === '') {
            alert('내용을 입력해주세요');
            return;
        }
        await api.post(`/manager/club/${clubId}/notice`, notice).then((res) => {
            alert('등록되었습니다.');
            navigate(`/manager/club/${clubId}/notice`);
        });
    };
    const backToList = () => {
        navigate(`/manager/club/${clubId}/notice`);
    };

    return (
        <div>
            <H2>공지사항 <span>> 공지등록</span></H2>
            <CONTAINER>
                <CONTENTS>
                    <TITLE>
                        <div>
                        <span>제목</span>
                        <input type="text" name="title" value={title} onChange={onChange} />
                        </div>
                        <select name="isPrivate" onChange={onChange}>
                            <option>동아리원</option>
                            <option>전체</option>
                        </select>
                    </TITLE>
                    <CONTENT>
                        <span>내용</span>
                        <textarea
                            name="content"
                            cols="30"
                            rows="10"
                            value={content}
                            onChange={onChange}
                        ></textarea>
                    </CONTENT>
                    <BUTTONS>
                        <button onClick={saveBoard}>저장</button>
                        <button onClick={backToList}>취소</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default NoticeWrite;