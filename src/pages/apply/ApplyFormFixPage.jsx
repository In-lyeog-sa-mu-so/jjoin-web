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

const ApplyFormFixPage = () => {
    const [applyform, setapplyform] = useState([]); // 초기값을 빈 배열로 설정
    const navigate = useNavigate();
    const { clubId } = useParams();
    
    const onChange = (e, index) => {
        const newApplyform = [...applyform];
        newApplyform[index].QuestionContent = e.target.value;
        if (!newApplyform[index].isNew) { // 추가된 항목이 아닐 경우에만 수정 여부를 판단
            newApplyform[index].isModified = newApplyform[index].originalContent !== e.target.value;
        }
        setapplyform(newApplyform);
    };
    const getApply = async () => {
        try {
            const resp = await api.get(`/manager/club/${clubId}/application`);
            if(resp && resp.data) {
                setapplyform(resp.data.map(question => ({
                    ...question,
                    originalContent: question.QuestionContent,
                    isDeleted: false,
                    isNew: false,
                    isModified: false
                })));
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const deleteApply = (index) => {
        const newFields = [...applyform];
        newFields[index].isDeleted = true;
        setapplyform(newFields);
    };
    const addApply = () => {
        const newQuestionId = Math.max(...applyform.map(question => question.isDeleted ? -Infinity : question.question_id), 0) + 1;
        setapplyform([...applyform, { QuestionContent: "", question_id: newQuestionId, isNew: true }]);
    };
    const updateApply = async () => {
        try {
            const requestBody = {
                added: applyform.filter(question => question.isNew).map(question => ({ QuestionContent: question.QuestionContent })),
                modified: applyform.filter(question => question.isModified).map(question => ({ question_id: question.question_id, QuestionContent: question.QuestionContent })),
                deleted: applyform.filter(question => question.isDeleted).map(question => ({question_id: question.question_id})),
            };
            await api.patch(`/manager/club/${clubId}/application`, requestBody);
            alert('수정되었습니다.');
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
            <H2>신청서 관리 <span> > 수정</span></H2>
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
                                !question.isDeleted && (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={question.QuestionContent}
                                            onChange={(e) => onChange(e, index)}
                                        />
                                        <button onClick={() => deleteApply(index)}>삭제</button>
                                    </div>
                                )
                            ))}
                        </ADDCONTENT>
                    </CONTENT>
                    <BUTTONS>
                        <button onClick={addApply}>필드 추가</button>
                        <button onClick={updateApply}>수정</button>
                        <button onClick={backToDetail}>취소</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default ApplyFormFixPage;