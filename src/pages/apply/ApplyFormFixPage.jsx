import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  background-color: whitesmoke;
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
  span{
    min-width: 100px;
    max-width: 200px;
  }
  a{
    width: 300px;
    height: 30px;
    background-color: white;
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
    margin-left:20px;
  }
`
const H2 = styled.h2`
  margin-left: 5%;
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  button{
    margin-left:1%;
    padding: 8px 25px; /* Increase size, adjust as needed */
    background-color: lightgrey; /* Change color */
    font-size: 15px;
    cursor: pointer;
    &:hover {
      background-color: darkgrey;
    }
  }
`

const ApplyFormFixPage = () => {
    const [applyform, setapplyform] = useState([]); // 초기값을 빈 배열로 설정
    const navigate = useNavigate();
    const baseUrl="https://7f43ee63-b0b8-4e87-9c96-a7c2c01a39f5.mock.pstmn.io";
    const getApply = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/apply`);
            if(resp && resp.data) {
                setapplyform(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const updateApply = async () => {
        try {
            await axios.patch(`${baseUrl}/apply`);
            alert('수정되었습니다.');
            navigate('/apply');
        } catch (error) {
            console.error('Error updating the board: ', error);
        }
    };
    const addApply = () => {
        setapplyform([...applyform,[]]);
    }

    const deleteApply = (index) => {
        const newFields = [...applyform];
        newFields.splice(index, 1);
        setapplyform(newFields);
    }
    const backToDetail = () => {
        navigate('/apply');
    };

    useEffect(() => {
        getApply();
    }, []);

    return(
        <div>
            <H2>신청서 수정</H2>
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
                                    <button onClick={() => deleteApply(index)}>삭제</button>
                                </div>
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