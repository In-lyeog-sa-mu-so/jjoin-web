import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

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
    padding: 8px 15px; /* Increase size, adjust as needed */
    background-color: lightgrey; /* Change color */
    font-size: 15px;
    cursor: pointer;
    margin-right:5px;
    &:hover {
      background-color: darkgrey;
    }
  }
`
const NoticeUpdatePage = () => {
    const navigate = useNavigate();
    const { clubId,id } = useParams();
    const [notice, setNotice] = useState({
        id: 0,
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
    const getBoard = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/manager/club/${clubId}/notice/${id}`);
            if(resp && resp.data) {
                setNotice(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const updateBoard = async () => {
        try {
            await axios.patch(`${baseUrl}/manager/club/${clubId}/notice/${id}`, notice);
            alert('수정되었습니다.');
            navigate(`/manager/club/${clubId}/notice/${id}`);
        } catch (error) {
            console.error('Error updating the board: ', error);
        }
    };

    const backToDetail = () => {
        navigate(`/manager/club/${clubId}/notice/${id}`);
    };

    useEffect(() => {
        getBoard();
    }, []);

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
                        <button onClick={updateBoard}>수정</button>
                        <button onClick={backToDetail}>취소</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default NoticeUpdatePage;