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
                        <a>모집여부</a>
                        <a>모집</a>
                        <input
                            type="checkbox"
                            name="모집"
                            checked={!isFinished}
                            disabled={true}
                        />
                        <a>모집안함</a>
                        <input
                            type="checkbox"
                            name="모집안함"
                            checked={isFinished}
                            disabled={true}
                        />
                    </CHECKBOX>
                    <DATE>
                        <a>모집일정</a>
                        <a>
                            {startDate}
                        </a>
                        <a>
                            {endDate}
                        </a>
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