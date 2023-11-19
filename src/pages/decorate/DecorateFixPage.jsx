import React, {useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const CONTAINER = styled.div`
  margin-left: 5%;
  background-color: white;
  width: 90%;
  border-top: 1px solid black;
  * > p {
    border-bottom: 3px solid darkblue;
    line-height: 24px;
    min-width: 100px;
    width: fit-content;
    text-align: center;
  }
`
const CONTENTS= styled.div`
  width: 95%;
  margin-left: 2%;
  height: 550px;
`
const H2 = styled.h2`
  margin-left: 5%;
  span{
    font-size: 13px;
    color: gray;
    margin-left: 10px;
  }
`
const CONTENT = styled.table`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 20px;
  margin-top: 10px;
  textarea{
    width: 650px;
    height: 100px;
    border: 1px solid #ddd;
    white-space: pre-line;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    resize: none;
  }
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  border-bottom: 30px;
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
const IMAGE = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin: 10px 20px 10px 20px;
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
  margin-left: 100px;
  & > div:nth-child(2) {
    margin-left: 205px;
  }
  label{
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    padding: 5px 10px;
    background-Color: darkblue;
    color: white;
    border: none;
    border-radius: 4px;
    text-Align: center;
    text-Decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
  }
`
const CHECKBOX=styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.5%;
  & > div:not(:first-child) {
    margin-left: 5%;
  }
`
const DATE = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.5%;
  & > div:not(:first-child){
    margin-left: 50px;
    input{
      margin-left:10px;
      width: 100px;
      height: 30px;
      background-color: white;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      border: 1px solid rgba(150,150,150,0.1);
    }
`
const DecorateFixPage = () => {
    const navigate = useNavigate();
    const { clubId } = useParams();
    const [decorate, setDecorate] = useState({
        clubImageUuid: null,
        backgroundImageUuid: null,
        clubImageFile: null,
        backgroundImageFile: null,
        introduction: "",
        isFinished: null,
        startDate: null,
        endDate: null,
    });

    const { clubImageUuid, backgroundImageUuid, introduction, isFinished, clubImageFile, backgroundImageFile, startDate, endDate } = decorate;
    const onChange = (event) => {
        const { value, name } = event.target;
        setDecorate({
            ...decorate,
            [name]: value,
        });
    };

    const getBoard = async () => {
        try {
            const resp = await axios.get(`https://jjoin.dcs-hyungjoon.com/api/v1/manager/club/${clubId}/information`);
            if (resp && resp.data) {
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
            const formData = new FormData();

            if (decorate.clubImageFile) {
                formData.append('clubImageFile', decorate.clubImageFile);
            }
            if (decorate.backgroundImageFile) {
                formData.append('backgroundImageFile', decorate.backgroundImageFile);
            }
            const data = {
                introduction,
                startDate,
                endDate
            };

            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            formData.append('data', blob);

            await axios({
                method: 'PUT',
                url: `https://jjoin.dcs-hyungjoon.com/api/v1/manager/club/${clubId}/information`,
                mode: 'cors',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });

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
            <H2>홍보페이지 관리 <span> > 수정</span></H2>
            <CONTAINER>
                <CONTENTS>
                    <IMAGE>
                        <div>
                            <p>프로필 사진</p>
                            <img src={clubImageUuid && clubImageUuid.startsWith('data:image')
                                ? clubImageUuid : `https://jjoin.dcs-hyungjoon.com/images/${clubImageUuid}`} alt="프로필사진" />
                        </div>
                        <div>
                            <p>배경 사진</p>
                            <img src={backgroundImageUuid && backgroundImageUuid.startsWith('data:image')
                                ? backgroundImageUuid : `https://jjoin.dcs-hyungjoon.com/images/${backgroundImageUuid}`} alt="배경사진" />
                        </div>
                    </IMAGE>
                    <IMAGEINPUT>
                        <div>
                            <input
                                type="file"
                                id="profileUpload"
                                style={{display: 'none'}}
                                onChange={event => {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setDecorate({
                                            ...decorate,
                                            clubImageUuid: reader.result,
                                            clubImageFile: event.target.files[0]
                                        });
                                    };
                                    reader.readAsDataURL(event.target.files[0]);
                                }}
                            />
                            <label htmlFor="profileUpload" style={{cursor: 'pointer'}}>프로필 이미지 파일 선택</label>
                        </div>
                        <div>
                            <input
                                type="file"
                                id="backUpload"
                                style={{display: 'none'}}
                                onChange={event => {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setDecorate({
                                            ...decorate,
                                            backgroundImageUuid: reader.result,
                                            backgroundImageFile: event.target.files[0]
                                        });
                                    };
                                    reader.readAsDataURL(event.target.files[0]);
                                }}
                            />
                            <label htmlFor="backUpload" style={{cursor: 'pointer'}}>배경 이미지 파일 선택</label>
                        </div>
                    </IMAGEINPUT>
                    <CONTENT>
                        <p>소개</p>
                        <textarea
                            name="introduction"
                            cols="80"
                            rows="5"
                            value={introduction}
                            onChange={onChange}
                        ></textarea>
                    </CONTENT>
                    <CHECKBOX>
                        <div>
                            <p>모집여부</p>
                        </div>
                        <div>
                            <a>모집</a>
                            <input
                                type="radio"
                                name="recruit"
                                value="모집"
                                checked={isFinished === false}
                                disabled
                            />
                        </div>
                        <div>
                            <a>모집안함</a>
                            <input
                                type="radio"
                                name="recruit"
                                value="모집안함"
                                checked={isFinished === true}
                                disabled
                            />
                        </div>
                    </CHECKBOX>
                    <DATE>
                        <div>
                            <p>모집일정</p>
                        </div>
                        <div>
                            <a>시작날짜</a>
                            <input type="text" name="startDate" value={startDate ? startDate.split('T')[0] : ' '} onChange={onChange} />
                        </div>
                        <div>
                            <a>종료날짜</a>
                            <input type="text" name="endDate" value={endDate ? endDate.split('T')[0] : ' '} onChange={onChange} />
                        </div>
                    </DATE>
                    <BUTTONS>
                        <button onClick={updateBoard}>수정완료</button>
                        <button onClick={backToDetail}>취소</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    );
};

export default DecorateFixPage;