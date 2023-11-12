import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import api from '../../Axios.js';
import AddEvent from './AddEvent.jsx';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); // 더 부드러운 오버레이 효과
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px; // 모달 창의 모서리를 둥글게
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); // 모달 창에 그림자 추가
  width: 90%; // 모달 창의 너비 조정
  max-width: 500px; // 모달 창의 최대 너비
  position: relative;
  display: flex;
  flex-direction: column; // 폼 요소들을 세로로 정렬
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50; // 버튼 색상 변경
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049; // 호버 시 버튼 색상 변경
  }
`;

const CancelButton = styled(SubmitButton)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Input = styled.input`
  width: 100%; // 폭을 모달 너비에 맞춤
  padding: 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc; // 경계선 색상
  border-radius: 4px; // 경계선 둥글게
  box-sizing: border-box; // padding과 border를 너비에 포함
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%; // 폭을 모달 너비에 맞춤
  padding: 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc; // 경계선 색상
  border-radius: 4px; // 경계선 둥글게
  box-sizing: border-box; // padding과 border를 너비에 포함
  font-size: 1rem;
  height: 100px; // 초기 높이 설정
  resize: vertical; // 사용자가 수직으로만 크기 조절 가능하도록 설정
`;

const Modal = ({ isOpen, onClose, onSave }) => {
    const [eventState, setEventState] = useState({ title: '', content: '' });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEventState({ ...eventState, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(eventState);
      setEventState({ title: '', content: '' }); // 상태를 초기화합니다.
      onClose(); // 모달을 닫습니다.
    };
  
    // 조건부 렌더링을 반환문으로 옮겼습니다.
    if (!isOpen) return null;
  
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="제목"
            value={eventState.title}
            onChange={handleChange}
            required
            />
          <TextArea
            name="content"
            placeholder="내용"
            value={eventState.content}
            onChange={handleChange}
            required
          />
            <SubmitButton type="submit">등록</SubmitButton>
            <CancelButton type="button" onClick={onClose}>취소</CancelButton>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </form>
        </ModalContent>
      </ModalOverlay>
    );
  };

const EventCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [clubId, setClubId] = useState(''); // 예를 들어 '123'과 같이 실제 clubId로 초기화
    const [eventDetails, setEventDetails] = useState({
      title: '', 
      content: '', 
      startTime: '00:00', 
      endTime: '00:00'
    });

    const handleSelectRange = (range) => {
        setSelectedDates(range);
    };

    const openModalToCreateEvent = () => {
        if (selectedDates.length > 0) {
          setModalOpen(true);
        }
    };
    
    const handleEventDetailsChange = (e) => {
        setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    };

    const handleSaveEvent = () => {
        const newEvent = {
          ...eventDetails,
          startDate: moment(selectedDates[0]).format('YYYY-MM-DD') + ' ' + eventDetails.startTime,
          endDate: (selectedDates.length > 1 ? moment(selectedDates[1]) : moment(selectedDates[0])).format('YYYY-MM-DD') + ' ' + eventDetails.endTime,
        };

        // axios를 사용하여 서버에 일정을 등록
        api.post(`/manager/club/${clubId}/plan`, newEvent)
            .then(response => {
            // 성공적으로 데이터가 전송되었을 때의 처리
                alert('등록 완료되었습니다.');
                setModalOpen(false);
                console.log('Event successfully saved', response.data);
            })
            .catch(error => {
                // 에러 처리
                console.error('There was an error saving the event', error);
            });
    }

  return (
    <div>
      <Calendar
        selectRange={true}
        onChange={handleSelectRange}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format("DD")}
        showNeighboringMonth={false}
      />
      <div className='text-gray-500 mt-4'>
        {moment(selectedDate).format("YYYY년 MM월 DD일")}
      </div>
      <button onClick={openModalToCreateEvent}>일정 등록</button>
      <AddEvent />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default EventCalendar;