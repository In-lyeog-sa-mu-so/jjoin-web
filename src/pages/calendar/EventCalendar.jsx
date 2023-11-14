import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const data = [
    {
        "eventId" : 1,
		"content" : "update plan success",
		"end_date" : "2023-11-20 12:50:00",
		"start_date" : "2023-11-18 23:59:59",
		"title" : "update plan test",
	},
	{
        "eventId" : 2,
		"content" : "This is 3rd test plan",
		"end_date" : "2023-11-06 23:59:59",
		"start_date" : "2023-11-01 23:59:59",
		"title" : "3rd test plan",
	},
	{
        "eventId" : 3,
		"content" : "make plan success",
		"end_date" : "2023-11-20 23:59:59",
		"start_date" : "2023-11-18 23:59:59",
		"title" : "make plan test",
	},
    {
        "eventId" : 4,
		"content" : "make plan success",
		"end_date" : "2023-11-16 14:00:00",
		"start_date" : "2023-11-16 15:00:00",
		"title" : "창의문제해결 프로젝트 발표",
	},
    {
        "eventId" : 5,
		"content" : "make plan success",
		"end_date" : "2023-11-16 13:00:00",
		"start_date" : "2023-11-16 15:00:00",
		"title" : "암호학 수업",
	},
]

// 새로운 버튼 컴포넌트 정의
const AddEventButton = () => {
  const navigate = useNavigate();

  return (
      <PositionBtn>
          <Fab
              color='primary'
              aria-label='add'
              onClick={() => navigate('/manager/club/:clubId/plan/upload')}
          >
              <AddIcon />
          </Fab>
      </PositionBtn>
  );
};

function EventCalendar() {
  const { clubId } = useParams();
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();
  
  const getEventList = async () => {
    try {
      const resp = await axios.get(`/manager/club/${clubId}/plan`);
      if(resp && resp.data) {
          setEventList(resp.data);
      } else {
          console.error('No data received');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    axios.get(`/manager/club/${clubId}/plan`) // 백엔드 엔드포인트
      .then(response => {
        // 백엔드에서 받은 데이터를 적절히 변환하여 상태에 저장합니다.
        const eventData = response.data.map(val => ({
          title: val.title,
          start: val.start_date,
          end: val.end_date,
          publicId: val.id, // 예시 id
          color: val.completed ? '#E74C3C' : '#ABEBC6',
        }));
        setEventList(eventData);
      })
      .catch(error => {
        console.error('Error fetching events', error);
      });
  }, [clubId]);

  const data_list = data.map((val) => {
    return {
      title: val.title,
      start: val.start_date,
      end: val.end_date,
      publicId: val.id,
      completed: val.completed,
      color: val.completed ? '#E74C3C' : '#ABEBC6',
    };
  });

  const completedDate = data_list.filter((val) => val.completed);
  const [btn, setBtn] = useState(true);
  const btnEvent = () => {
    setBtn(!btn);
  };

  const handleEventClick = () => {
    // navigate(`manager/club/${clubId}/plan/${defId}`);
  };

    return (
        <div>
        <FullCalendar
            plugins={[dayGridPlugin]}
            headerToolbar={{
                start: 'prev next today',
                center: 'title',
                end: '',
            }}
            titleFormat={{ year: 'numeric', month: 'short' }}
            events={btn ? data_list : completedDate}
            eventClick={handleEventClick}
            height={'100vh'}
        />
        <AddEventButton />
        </div>
    );
}

const PositionBtn = styled.div`
  position: fixed;
  top: 90%;
  right: 50px;
  z-index: 10;
  @media only screen and (max-width: 768px) {
    top: 90%;
    left: 10px;
  }
`;

export default EventCalendar;