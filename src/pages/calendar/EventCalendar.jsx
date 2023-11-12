import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import SearchIcon from '@material-ui/icons/Search';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';

const data = [
    {
		"content" : "update plan success",
		"end_date" : "2023-10-20 23:59:59",
		"start_date" : "2023-10-18 23:59:59",
		"title" : "update plan test",
	},
	{
		"content" : "This is 3rd test plan",
		"end_date" : "2023-10-10 23:59:59",
		"start_date" : "2023-10-01 23:59:59",
		"title" : "3rd test plan",
	},
	{
		"content" : "make plan success",
		"end_date" : "2023-10-20 23:59:59",
		"start_date" : "2023-10-18 23:59:59",
		"title" : "make plan test",
	},
]

function EventCalendar(props) {
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.calendar.list);

//   useEffect(() => {
//     dispatch(getCalendarFB());

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  const data_list = data.map((val) => {
    return {
      title: val.title,
      date: val.date,
      publicId: val.id,
      completed: val.completed,
      color: val.completed ? '#E74C3C' : '#ABEBC6',
    };
  });

  const completedDate = data_list.filter((val) => {
    return val.completed === true;
  });

  const [btn, setBtn] = useState(true);
  const btnEvent = () => {
    setBtn(!btn);
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
            eventClick={(e) => {
                props.history.push('/detail/' + e.event._def.extendedProps.publicId);
            }}
            height={'100vh'}
        />
        <PositionBtn>
            <Fab
            color='secondary'
            aria-label='filter'
            variant='extended'
            onClick={btnEvent}
            >
            <SearchIcon />
            <p style={{ fontSize: '1rem' }}>
                {btn ? '완료된 일정 보기' : '모든 일정 보기'}
            </p>
            </Fab>
        </PositionBtn>
        </div>
    );
}

const PositionBtn = styled.div`
    position: fixed;
    top: 80%;
    right: 10px;
    z-index: 10;
    @media only screen and (max-width: 768px) {
        top: 70%;
        left: 10px;
        & p {
        display: none;
        }
    }
`;

export default EventCalendar;