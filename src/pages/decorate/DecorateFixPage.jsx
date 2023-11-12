import React, {useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  background-color: whitesmoke;
  width: 90%;
`

const CONTENTS= styled.div`
  width: 95%;
  margin-left: 2%;
  height: 550px;
`

const H2 = styled.h2`
  margin-left: 5%;
`
const CONTENT = styled.table`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 45px;
    textarea{
      margin: 10px 65px;
      white-space: pre-line;
      display: flex;
      align-items: center;
      justify-content: center;
    }
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
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
const IMAGE = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin: 45px 20px 10px 20px;
  }
  img {
    width: 150px;
    height: 150px;
    &:last-child {
      width: 300px;
      height: 150px;
    }
  }
`
const IMAGEINPUT=styled.div`
  display: flex;
  margin-left: 13%;
  & > div:nth-child(2) {
    margin-left: 120px;
  }
`
const CHECKBOX=styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.5%;
  margin-top: 10px;
  & > div:not(:first-child) {
    margin-left: 5%;
  }
`
const DATE = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.5%;
  margin-top: 30px;
  & > div:not(:first-child){
      margin-left: 50px;
    input{
      margin-left:10px;
    }
  }
`
const DecorateFixPage=()=>{
    const navigate = useNavigate();
    const { clubId } = useParams();
    const [decorate, setDecorate] = useState({
        clubImage: null,
        backgroundImage: null,
        introduction: "",
        isFinished: false,
        startDate: null,
        endDate: null,
    });
    const {clubImage,backgroundImage,introduction,isFinished,startDate,endDate}=decorate;
    const onChange = (event) => {
        const { value, name } = event.target;
        setDecorate({
            ...decorate,
            [name]: value,
        });
    };
    const baseUrl="https://7f43ee63-b0b8-4e87-9c96-a7c2c01a39f5.mock.pstmn.io";
    const getBoard = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/manager/club/${clubId}/information`);
            if(resp && resp.data) {
                setDecorate(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const updateBoard = async () => {
        try {
            await axios.patch(`${baseUrl}/manager/club/${clubId}/information`, decorate);
            alert('수정되었습니다.');
            navigate(`/manager/club/${clubId}/information`);
        } catch (error) {
            console.error('Error updating the board: ', error);
        }
    };
    const backToDetail = () => {
        navigate(`/manager/club/${clubId}/information`);
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div>
            <H2>홍보페이지 수정</H2>
            <CONTAINER>
                <CONTENTS>
                    <IMAGE>
                        <p>프로필 사진</p>
                        <img src={clubImage} alt="프로필사진" />
                        <p>배경 사진</p>
                        <img src={backgroundImage} alt="배경사진" />
                    </IMAGE>
                    <IMAGEINPUT>
                        <div>
                        <input
                            type="file"
                            onChange={event => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setDecorate({...decorate, clubImage: reader.result});
                                };
                                reader.readAsDataURL(event.target.files[0]);
                            }}
                        />
                        </div>
                        <div>
                        <input
                            type="file"
                            onChange={event => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setDecorate({...decorate, backgroundImage: reader.result});
                                };
                                reader.readAsDataURL(event.target.files[0]);
                            }}
                        />
                        </div>
                    </IMAGEINPUT>
                    <CONTENT>
                        <a>소개</a>
                        <textarea
                            name="contents"
                            cols="80"
                            rows="5"
                            value={introduction}
                            onChange={onChange}
                        ></textarea>
                    </CONTENT>
                    <CHECKBOX>
                        <div>
                        <a>모집여부</a>
                        </div>
                        <div>
                        <a>모집</a>
                        <input
                            type="radio"
                            name="recruit"
                            value="모집"
                            checked={isFinished === false}
                            onChange={event => setDecorate({...decorate, isFinished: event.target.value === '모집'})}
                        />
                        </div>
                        <div>
                        <a>모집안함</a>
                        <input
                            type="radio"
                            name="recruit"
                            value="모집안함"
                            checked={isFinished === true}
                            onChange={event => setDecorate({...decorate, isFinished: event.target.value === '모집안함'})}
                        />
                        </div>
                    </CHECKBOX>
                    <DATE>
                        <div>
                        <a>모집일정</a>
                        </div>
                        <div>
                        <a>시작날짜</a>
                        <input type="text" name="title" value={startDate} onChange={onChange} />
                        </div>
                        <div>
                        <a>종료날짜</a>
                        <input type="text" name="title" value={endDate} onChange={onChange} />
                        </div>
                    </DATE>
                    <BUTTONS>
                        <button onClick={updateBoard}>수정</button>
                        <button onClick={backToDetail}>취소</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default DecorateFixPage;