import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../Axios';
import { useRecoilState } from 'recoil';
import { eventListState } from '../../state';

const AddEventButton = () => {
  const navigate = useNavigate();
  const { clubId } = useParams();
  return (
      <PositionBtn>
          <Fab
              color='primary'
              aria-label='add'
              onClick={() => navigate(`/manager/club/${clubId}/plan/upload`)}
          >
              <AddIcon />
          </Fab>
      </PositionBtn>
  );
};

function EventCalendar() {
  const { clubId } = useParams();
  const [eventList, setEventList] = useRecoilState(eventListState);
  const navigate = useNavigate();
  
  const getEventList = async () => {
    try {
      const resp = await api.get(`/manager/club/${clubId}/plan`);
      if(resp && resp.data) {
          const formattedEvents = resp.data.data.map(event => ({
            title: event.title,
            start: event.startDate,
            end: event.endDate,
            id: event.id,  // 고유 식별자를 추가
            color: '#ABEBC6', // #E74C3C
        }));
        setEventList(formattedEvents);
      } else {
          console.error('No data received');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    getEventList();
  }, [clubId]);

  const handleEventClick = (eventInfo) => {
    navigate(`/manager/club/${clubId}/plan/${eventInfo.event.id}`);
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
              events={eventList}
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