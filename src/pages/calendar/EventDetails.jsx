import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm';
import RedditIcon from '@material-ui/icons/Reddit';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom'; 
import api from '../../Axios';

// 더미 데이터
const dummyData = [
    {
      id: '1',
      startDate: '2023-11-16T15:00',
      endDate: '2023-11-16T17:00',
      title: 'Test Event 1',
      content: 'This is a test event 1',
    },
    {
      id: '2',
      startDate: '2023-11-11T10:00',
      endDate: '2023-11-13T07:00',
      title: 'Test Event 2',
      content: 'This is a test event 2',
    },
];

function EventDetails(props) {
    const navigate = useNavigate();
    const { defid, clubId } = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
      // 백엔드에서 데이터를 로드하는 로직
      api.get(`/manager/club/${clubId}/plan/${defid}`) // 엔드포인트 수정 필요
        .then(response => {
          setEvent(response.data);
        })
        .catch(error => {
          console.error('Error fetching event data', error);
        });
    }, [defid]);

    // let eventDetail = event.find(e => e.id === defid);
    let primaryData = dummyData.find(event => event.id === defid);

    const deleteEvent = () => {
      api.delete(`/manager/club/${clubId}/plan/${defid}`) // 백엔드 엔드포인트로 수정
      .then(() => {
        window.alert('일정이 삭제되었습니다.');
        navigate(`/manager/club/${clubId}/plan`); // 삭제 후 캘린더 페이지로 이동
      })
      .catch(error => {
        console.error('Error deleting event', error);
        window.alert('일정 삭제에 실패했습니다.');
        navigate(`/manager/club/${clubId}/plan`); // 삭제 후 캘린더 페이지로 이동
      });
    };

  // "일정 수정" 버튼 클릭 시 EditEvent 컴포넌트로 이동
  const goToEditPage = () => {
    navigate(`/manager/club/${clubId}/plan/edit/${defid}`);
  };

  return (
    <>
      <Container>
        <Modal>
          <GoBack
            onClick={() => navigate(`/manager/club/${clubId}/plan`)}
          >
            <ExitToAppIcon style={{ color: '#EC7063' }} />
          </GoBack>
          <h1>
            <AlarmIcon /> &nbsp;상세 일정
          </h1>
          <h2>
            <CalendarTodayIcon style={{ color: '#85C1E9' }} />
            &nbsp; 시작 날짜: {primaryData ? primaryData.startDate.split('T')[0]
              : ' '}{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <AccessTimeIcon style={{ color: '#85C1E9' }} />
            &nbsp; 시작 시간: &nbsp;
            {primaryData
              ? primaryData.startDate.split('T')[1].split(':')[0] > 11
                ? '오후'
                : '오전'
              : ''}
            &nbsp;&nbsp;
            {primaryData
              ? primaryData.startDate.split('T')[1].split(':')[0] > 12
                ? primaryData.startDate.split('T')[1].split(':')[0] -
                  12 +
                  ':' +
                  primaryData.startDate.split('T')[1].split(':')[1]
                : primaryData.startDate.split('T')[1].split(':')[0] +
                  ':' +
                  primaryData.startDate.split('T')[1].split(':')[1]
              : ''}
            <br />
            <br />
            <CalendarTodayIcon style={{ color: '#85C1E9' }} />
            &nbsp; 종료 날짜: {primaryData ? primaryData.endDate.split('T')[0]
              : ' '}{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <AccessTimeIcon style={{ color: '#85C1E9' }} />
            &nbsp; 종료 시간: &nbsp;
            {primaryData
              ? primaryData.endDate.split('T')[1].split(':')[0] > 11
                ? '오후'
                : '오전'
              : ''}
            &nbsp;&nbsp;
            {primaryData
              ? primaryData.endDate.split('T')[1].split(':')[0] > 12
                ? primaryData.endDate.split('T')[1].split(':')[0] -
                  12 +
                  ':' +
                  primaryData.endDate.split('T')[1].split(':')[1]
                : primaryData.endDate.split('T')[1].split(':')[0] +
                  ':' +
                  primaryData.endDate.split('T')[1].split(':')[1]
              : ''}
          </h2>
          <h2>
            <RedditIcon style={{ color: '#85C1E9' }} />
            &nbsp; 제목: {primaryData ? primaryData.title : ''}
          </h2>
          <h3>
            <RedditIcon style={{ color: '#85C1E9' }} />
            &nbsp; 내용: {primaryData ? primaryData.content : ''}
          </h3>
          <hr />
          <BtnGroup>
            <Button
                variant='contained'
                style={{ marginRight: '50px' }}
                onClick={deleteEvent}
            >
                일정 삭제
            </Button>
            <Button
                variant='contained'
                color='primary'
                style={{ marginRight: '5px' }}
                onClick={goToEditPage}
            >
                일정 수정
            </Button>
          </BtnGroup>
        </Modal>
      </Container>
      <Container2
        onClick={() => navigate(`/manager/club/${clubId}/plan`)}
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
  width: 1200px;
  height: 700px;
  box-sizing: border-box;
  z-index: 10;
  & h1 {
    text-align: center;
    color: #af7ac5;
  }
  & h2 {
    color: #34495e;
  }
  & h3 {
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
  left: -20px;
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