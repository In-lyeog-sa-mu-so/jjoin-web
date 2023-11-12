import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    margin: 10px 45px;
    &:last-child{
      margin: 10px 25px;
      width: 600px;
      height: 100px;
      border: 1px solid dimgray;
      white-space: pre-line;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
    margin: 45px 20px;
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
const CHECKBOX=styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.5%;
  margin-top: 30px;
  & > div:not(:first-child) {
    margin-left: 5%;
  }

`
const DATE = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.5%;
  margin-top: 30px;
  & > div{
    margin-left: 5%;
    a:not(:first-child){
      margin-left: 10px;
    }
  }
`

const DecorateBoard = ({ clubImage, backgroundImage, introduction, isFinished, startDate, endDate }) => {
    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate('/update');
    };

    return (<>
        <div>
            <H2>홍보페이지 관리</H2>
            <CONTAINER>
                <CONTENTS>
                    <IMAGE>
                        <p>프로필 사진</p>
                        <img src={clubImage} alt="프로필사진"/>
                        <p>배경 사진</p>
                        <img src={backgroundImage} alt="배경사진"/>
                    </IMAGE>
                    <CONTENT>
                        <a>소개</a>
                        <a>
                            {introduction}
                        </a>
                    </CONTENT>
                    <CHECKBOX>
                        <div>
                        <a>모집여부</a>
                        </div>
                        <div>
                        <a>모집</a>
                        <input
                            type="checkbox"
                            name="모집"
                            checked={!isFinished}
                            disabled={true}
                        />
                        </div>
                        <div>
                        <a>모집안함</a>
                        <input
                            type="checkbox"
                            name="모집안함"
                            checked={isFinished}
                            disabled={true}
                        />
                        </div>
                    </CHECKBOX>
                    <DATE>
                        <a>모집일정</a>
                        <div>
                        <a>
                            {startDate}
                        </a>
                        <a>~</a>
                        <a>
                            {endDate}
                        </a>
                        </div>
                    </DATE>
                    <BUTTONS>
                        <button onClick={moveToUpdate}>수정</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    </>);
};

export default DecorateBoard;