import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  background-color: white;
  width: 90%;

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
`;
const H2 = styled.h2`
  margin-left: 5%;
`;
const CONTENT = styled.table`
  display: flex;
  flex-direction: column;
  // align-items: center;
  a {
    position: relative;
    // margin: 10px 45px;
    margin: 5px 20px;
    &:last-child{
      margin: 10px 25px;
      width: 650px;
      height: 100px;
      border: 1px solid #ddd;
      white-space: pre-line;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px
    }
  }

  p {
    margin: 20px;
  }
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
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
const IMAGE = styled.div`
  display: flex;
  flex-direction: row;
  
  align-items: center;
  & > * {
    margin: 25px 20px;
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
const CHECKBOX = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  & > div:not(:first-child) {
    margin-left: 5%;
  }

  p {
    margin: 20px;
  }
`

const SUBCHECKBOX = styled.div`
  display: flex;
  gap: 100px; 
  margin: 20px;
`

const DATE = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  & > div{
    margin-left: 5%;
    a:not(:first-child){
      margin-left: 10px;
    }
  }

  p {
    margin: 20px;
  }
`

const DecorateBoard = ({ clubImageUuid, backgroundImageUuid, introduction, isFinished, startDate, endDate }) => {
    const navigate = useNavigate();
    const { clubId } = useParams();
    const moveToUpdate = () => {
        navigate(`/manager/club/${clubId}/information/fix`);
    };

    return (<>
        <div>
            <H2>홍보페이지 관리</H2>
            <CONTAINER>
                <CONTENTS>
                    <IMAGE>
                      <div>
                        <p>프로필 사진</p>
                        <img src={clubImageUuid} alt="프로필사진"/>
                        </div>
                        <div>
                        <p>배경 사진</p>
                        <img src={backgroundImageUuid} alt="배경사진"/>
                        </div>
                    </IMAGE>
                    <CONTENT>
                        <p>소개</p>
                        <a>
                            {introduction}
                        </a>
                    </CONTENT>
                    <CHECKBOX>
                        <div>
                          <p>모집여부</p>
                        </div>
                        <SUBCHECKBOX>
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
                        </SUBCHECKBOX>
                    </CHECKBOX>
                    <DATE>
                        <p>모집일정</p>
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