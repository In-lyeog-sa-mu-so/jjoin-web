import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import api from '../../Axios';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  border-top: 1px solid black;
  width: 90%;
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
    min-width: 180px;
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
  button{
    margin-left:1%;
    width: 80px;
    font-size: 15px;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    background: lightgray;

    &:hover {
      background-color: darkgrey;
    }
  }
  input{
    width: 500px;
    height: 30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(150,150,150,0.1);
    display: block;
  }
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
    const [applyForm, setApplyForm] = useState([]);
    const navigate = useNavigate();
    const {clubId} = useParams();

    const MoveToUpdate = () => {
        navigate(`/manager/club/${clubId}/apply/fix`);
    };
    const MoveToAdd = () => {
        navigate(`/manager/club/${clubId}/apply/add`);
    };
    const MoveToDelete = () => {
        navigate(`/manager/club/${clubId}/apply/delete`);
    };
    const getApply = async () => {
        try {
            const resp = await api.get(`/manager/club/${clubId}/question`);
            if(resp && resp.data) {
                setApplyForm(resp.data.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        getApply();
    }, [clubId]);

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
                            {applyForm && applyForm.map((apply) => (
                                <div key={apply.id}>
                                    <span>{apply.content}</span>
                                    <a></a>
                                </div>
                            ))}
                        </ADDCONTENT>
                    </CONTENT>
                    <BUTTONS>
                        <button onClick={MoveToAdd}>추가하기</button>
                        <button onClick={MoveToUpdate}>수정하기</button>
                        <button onClick={MoveToDelete}>삭제하기</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default ApplyFormPage;