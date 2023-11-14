import React, { useState } from 'react';
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
  margin-left: 3%;
  height: 550px;
`;
const H2 = styled.h2`
  margin-left: 5%;
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
  }
  select{
    margin-left:30px;
    height: 30px;
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
    min-height: 300px;
    min-width: 94%;
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
    padding: 8px 20px; /* Increase size, adjust as needed */
    background-color: lightgrey; /* Change color */
    font-size: 15px;
    cursor: pointer;
    margin-right:5px;
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
    const baseUrl="https://7f43ee63-b0b8-4e87-9c96-a7c2c01a39f5.mock.pstmn.io";
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
        await axios.post(`${baseUrl}/manager/club/${clubId}/notice`, notice).then((res) => {
            alert('등록되었습니다.');
            navigate(`/manager/club/${clubId}/notice`);
        });
    };

    const backToList = () => {
        navigate(`/manager/club/${clubId}/notice`);
    };

    return (
        <div>
            <H2>공지등록</H2>
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