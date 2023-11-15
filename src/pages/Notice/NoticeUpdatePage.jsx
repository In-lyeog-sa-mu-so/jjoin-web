import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import api from '../../Axios';

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
const NoticeUpdatePage = () => {
    const navigate = useNavigate();
    const { clubId,id } = useParams();
    const [notice, setNotice] = useState({
        title: '',
        content: ''
    });

    const { title, content } = notice; //비구조화 할당
    
    const onChange = (event) => {
        const { value, name } = event.target;
        setNotice({
            ...notice,
            [name]: value,
        });
    };
    const getBoard = async () => {
        try {
            const resp = await api.get(`/manager/club/${clubId}/notice/${id}`);
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
            await api.put(`/manager/club/${clubId}/notice/${id}`, notice);
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
            <H2>공지사항<span>> 공지수정</span></H2>
            <CONTAINER>
                <CONTENTS>
                    <TITLE>
                        <span>제목</span>
                        <input type="text" name="title" value={title} onChange={onChange} />
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
                        <button onClick={updateBoard}>수정</button>
                        <button onClick={backToDetail}>취소</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default NoticeUpdatePage;