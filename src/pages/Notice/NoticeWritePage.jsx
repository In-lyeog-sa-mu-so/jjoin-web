import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const [notice, setNotice] = useState({
        title: '',
        updateddata: '',
        contents: '',
    });

    const { title, updateddata, contents } = notice; //비구조화 할당
    const baseUrl="https://7f43ee63-b0b8-4e87-9c96-a7c2c01a39f5.mock.pstmn.io";
    const onChange = (event) => {
        const { value, name } = event.target;
        setNotice({
            ...notice,
            [name]: value,
        });
    };

    const saveBoard = async () => {
        await axios.post(`${baseUrl}/notice`, notice).then((res) => {
            alert('등록되었습니다.');
            navigate('/notice');
        });
    };

    const backToList = () => {
        navigate('/notice');
    };

    return (
        <div>
            <H2>공지등록</H2>
            <CONTAINER>
                <CONTENTS>
                    <TITLE>
                        <span>제목</span>
                        <input type="text" name="title" value={title} onChange={onChange} />
                    </TITLE>
                    <CONTENT>
                        <span>내용</span>
                        <textarea
                            name="contents"
                            cols="30"
                            rows="10"
                            value={contents}
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