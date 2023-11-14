import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  width: 90%;
  border-top: 1px solid black;
`
const CONTENTS= styled.div`
  width: 95%;
  height: 100%;
  div:not(:first-child){
    margin-top: 40px;
  }
`
const CONTENT = styled.div`
  padding-top: 30px;
  margin-left: 5%;
  margin-top:20px;
  span{
    min-width: 100px;
    max-width: 200px;
    font-weight: 500;
    color: #495057;
  }
  a{
    width: 500px;
    height: 30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(150,150,150,0.1);
    display: block;
  }

  div{
    display: flex;
  }

`
const ADDCONTENT = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const H2 = styled.h2`
  margin-left: 5%;
  span{
    font-size: 13px;
    color: gray;
    margin-left: 10px;
  }
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  button{
    margin-left:1%;
    padding: 12px 25px; /* Increase size, adjust as needed */
    background-color: lightgrey; /* Change color */
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
const ApplyFormPage = () => {
    const [applyform, setapplyform] = useState([]); // 초기값을 빈 배열로 설정

    const navigate = useNavigate();
    const {clubId} = useParams();
    const baseUrl="https://18821b90-7c6b-4217-b68e-e5775ac40a41.mock.pstmn.io";

    const moveToUpdate = () => {
        navigate(`/manager/club/${clubId}/apply/fix`);
    };
    const getApply = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/manager/club/${clubId}/application`);
            if(resp && resp.data) {
                setapplyform(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        getApply();
    }, []);

    return(
        <div>
            <H2>신청서 관리 <span> > 조회</span></H2>
            <CONTAINER>
                <CONTENTS>
                    <CONTENT>
                    <div>
                        <span>성함</span>
                        <a></a>
                    </div>
                    <div>
                        <span>학번</span>
                        <a></a>
                    </div>
                    <div>
                        <span>학과</span>
                        <a></a>
                    </div>
                    <div>
                        <span>전화번호</span>
                        <a></a>
                    </div>
                    <ADDCONTENT>
                        {Array.isArray(applyform) && applyform.map((question, index) => (
                            <div key={index}>
                                <span>{question.QuestionContent}</span>
                                <a></a>
                            </div>
                        ))}
                    </ADDCONTENT>
                    </CONTENT>
                    <BUTTONS>
                        <button onClick={moveToUpdate}>수정</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default ApplyFormPage;