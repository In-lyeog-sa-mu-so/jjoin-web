import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function EditEvent() {
  const { defid } = useParams();
  const navigate = useNavigate();

  // 수정할 일정 데이터 로드 및 처리 로직
  const [event, setEvent] = useState({
    startDate: '',
    endDate: '',
    title: '',
    content: '',
});
  // 백엔드에서 데이터를 가져오거나, 글로벌 상태 관리 라이브러리에서 데이터를 로드
  useEffect(() => {
    // 백엔드에서 데이터를 로드하는 로직
    api.get(`/manager/club/{clubId}/plan/${defid}`) // 엔드포인트 수정 필요
      .then(response => {
        setEvent({
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          title: response.data.title,
          content: response.data.content,
        });
      })
      .catch(error => {
        console.error('Error fetching event data', error);
      });
  }, [defid]);
  // 수정을 처리하는 함수

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleEdit = () => {
    // 수정 로직 구현
    // axios.put
    api.put(`/manager/club/{clubId}/plan/${defid}`, event) // 엔드포인트 수정 필요
      .then(() => {
        navigate('/calendar'); // 수정 후 캘린더 페이지로 이동
      })
      .catch(error => {
        console.error('Error updating event', error);
      });
  };

  return (
    <div>
      {/* 수정 폼 구현 */}
      <TextField
        label="Start Date"
        type="datetime-local"
        name="startDate"
        value={event.startDate}
        onChange={handleInputChange}
      />
      <TextField
        label="End Date"
        type="datetime-local"
        name="endDate"
        value={event.endDate}
        onChange={handleInputChange}
      />
      <TextField
        label="Title"
        name="title"
        value={event.title}
        onChange={handleInputChange}
      />
      <TextField
        label="Content"
        name="content"
        value={event.content}
        onChange={handleInputChange}
      />
      <Button onClick={handleEdit}>수정 완료</Button>
    </div>
  );
}

export default EditEvent;
