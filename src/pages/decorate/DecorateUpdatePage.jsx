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
  margin-left: 2%;
  height: 550px;
`;
const H2 = styled.h2`
  margin-left: 5%;
`;

const CONTENT = styled.table`
  display: flex;
  align-items: center;
  a {
    position: relative;
    margin-right: 3%;
  }
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: flex-end;
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
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    &:last-child {
      width: 180px;
      height: 100px;
    }
  }
`
const CHECKBOX=styled.div`
 
  `
const DATE = styled.div`

`
const DecorateUpdatePage=()=>{
    const navigate = useNavigate();
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
    const getBoard = async () => {
        try {
            const resp = await axios.get(`https://1f118712-b219-41ed-affe-7cdb92c95f04.mock.pstmn.io/decorate`);
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
            await axios.patch(`https://1f118712-b219-41ed-affe-7cdb92c95f04.mock.pstmn.io/decorate`, decorate);
            alert('수정되었습니다.');
            navigate('/decorate');
        } catch (error) {
            console.error('Error updating the board: ', error);
        }
    };
    const backToDetail = () => {
        navigate('/decorate');
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
                        <p>배경 사진</p>
                        <img src={backgroundImage} alt="배경사진" />
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
                    </IMAGE>
                    <CONTENT>
                        <span>소개</span>
                        <textarea
                            name="contents"
                            cols="100"
                            rows="5"
                            value={introduction}
                            onChange={onChange}
                        ></textarea>
                    </CONTENT>
                    <CHECKBOX>
                        <a>모집여부</a>
                        <a>모집</a>
                        <input
                            type="radio"
                            name="recruit"
                            value="모집"
                            checked={isFinished === false}
                            onChange={event => setDecorate({...decorate, isFinished: event.target.value === '모집'})}
                        />
                        <a>모집안함</a>
                        <input
                            type="radio"
                            name="recruit"
                            value="모집안함"
                            checked={isFinished === true}
                            onChange={event => setDecorate({...decorate, isFinished: event.target.value === '모집안함'})}
                        />
                    </CHECKBOX>
                    <DATE>
                        <span>모집일정</span>
                        <span>시작날짜</span>
                        <input type="text" name="title" value={startDate} onChange={onChange} />
                        <span>종료날짜</span>
                        <input type="text" name="title" value={endDate} onChange={onChange} />
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

export default DecorateUpdatePage;