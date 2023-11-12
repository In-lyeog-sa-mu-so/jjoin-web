import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm';
import RedditIcon from '@material-ui/icons/Reddit';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

function EventDetails(props) {
    const navigate = useNavigate();

    let calendarId = props.match.params.defid;
    let primaryData;

//   for (let i = 0; i < data.length; i++) {
//     if (data[i].id === calendarId) {
//       primaryData = data[i];
//     }
//   }

  return (
    <>
      <Container>
        <Modal>
          <GoBack
            onClick={() => navigate(-1)}
          >
            <ExitToAppIcon style={{ color: '#EC7063' }} />
          </GoBack>
          <h1>
            <AlarmIcon /> &nbsp;상세 일정 보기
          </h1>
          <h2>
            <CalendarTodayIcon style={{ color: '#85C1E9' }} />
            &nbsp; 날짜: {primaryData
              ? primaryData.date.split('T')[0]
              : ' '}{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {primaryData
              ? primaryData.date.split('T')[1].split(':')[0] > 11
                ? '오후'
                : '오전'
              : ''}
            &nbsp;&nbsp;
            {primaryData
              ? primaryData.date.split('T')[1].split(':')[0] > 12
                ? primaryData.date.split('T')[1].split(':')[0] -
                  12 +
                  ':' +
                  primaryData.date.split('T')[1].split(':')[1]
                : primaryData.date.split('T')[1].split(':')[0] +
                  ':' +
                  primaryData.date.split('T')[1].split(':')[1]
              : ''}
          </h2>
          <h2>
            <RedditIcon style={{ color: '#85C1E9' }} />
            &nbsp; 할일: {primaryData ? primaryData.title : ''}
          </h2>
          <hr />

          <BtnGroup>
            <Button
              variant='contained'
              style={{ marginRight: '50px' }}
              onClick={() => navigate(-1)}
            >
              일정 삭제
            </Button>
            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: '5px' }}
              onClick={() => navigate(-1)}
            >
              일정 완료
            </Button>
          </BtnGroup>
        </Modal>
      </Container>
      <Container2
        onClick={() => navigate(-1)}
      />
    </>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 24px 50px;
  border-radius: 4px;
  width: 600px;
  height: 400px;
  box-sizing: border-box;
  z-index: 10;
  & h1 {
    text-align: center;
    color: #af7ac5;
  }
  & h2 {
    color: #34495e;
  }

  & Button {
    min-width: 200px;
  }
`;
const GoBack = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
  left: -30px;
`;
const BtnGroup = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    & Button {
      width: 100%;
    }
  }
`;

export default EventDetails;