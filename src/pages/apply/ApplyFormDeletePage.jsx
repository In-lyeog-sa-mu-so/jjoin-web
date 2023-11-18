import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
const ApplyFormDeletePage=()=>{
    const [applyForm, setApplyForm] = useState([]);
    const navigate = useNavigate();
    const { clubId } = useParams();

    const onChange = (e, index) => {
        const newApplyForm = [...applyForm];
        setApplyForm(newApplyForm);
    };

    const getApply = async () => {
        try {
            const resp = await api.get(`/manager/club/${clubId}/question`);
            if(resp && resp.data && Array.isArray(resp.data.data)) {
                setApplyForm(resp.data.data);
            } else {
                console.error('No data received or data is not an array');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const deleteApply = (index) => {
        const newFields = [...applyForm];
        setApplyForm(newFields);
    };
    const saveBoard = async () => {
        try {
            const requestBody = applyForm.map(question => ({ id: question.id }));
            await api.delete(`/manager/club/${clubId}/question`, requestBody);
            alert('삭제되었습니다.');
            navigate(`/manager/club/${clubId}/apply`);
        } catch (error) {
            console.error('Error updating the board: ', error);
        }
    };
    const backToDetail = () => {
        navigate(`/manager/club/${clubId}/apply`);
    };

    useEffect(() => {
        getApply();
    }, []);
    return(
        <div>
            <H2>신청서 관리 <span> > 삭제</span></H2>
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
                            {Array.isArray(applyForm) && applyForm.map((question, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={question.content}
                                            onChange={(e) => onChange(e, index)}
                                        />
                                        <button onClick={() => deleteApply(index)}>삭제</button>
                                    </div>
                            ))}
                        </ADDCONTENT>
                    </CONTENT>
                    <BUTTONS>
                        <button onClick={saveBoard}>저장</button>
                        <button onClick={backToDetail}>취소</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default ApplyFormDeletePage;