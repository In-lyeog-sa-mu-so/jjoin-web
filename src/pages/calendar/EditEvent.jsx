import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import BorderColorIcon from '@material-ui/icons/BorderColor';

function EditEvent() {
  const { defid, clubId } = useParams();
  const navigate = useNavigate();

  // 수정할 일정 데이터 로드 및 처리 로직
  const [event, setEvent] = useState({
    startDate: '',
    endDate: '',
    title: '',
    content: '',
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setEvent({
        ...event,
        [name]: value,
    });
  };

  useEffect(() => {
    // 백엔드에서 데이터를 로드하는 로직
    api.get(`/manager/club/${clubId}/plan/${defid}`) // 엔드포인트 수정 필요
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error('Error fetching event data', error);
      });
  }, [clubId, defid]);
  // 수정을 처리하는 함수

  const handleEdit = async () => {
    // 수정 로직 구현
    await api.put(`/manager/club/${clubId}/plan/${defid}`, event) // 엔드포인트 수정 필요
      .then(() => {
        alert('수정되었습니다.');
        navigate(`/manager/club/${clubId}/plan`); // 수정 후 캘린더 페이지로 이동
      })
      .catch(error => {
        alert('수정 실패!');
        console.error('Error updating event', error);
      });
  };

  return (
    <>
    <Container>
        <Modal>
          <h1>
            <BorderColorIcon /> &nbsp;일정 수정하기
          </h1>
          <hr />
          <TextField
            style={{ marginBottom: '1rem' }}
            name='startDate'
            label='시작 날짜'
            type='datetime-local'
            defaultValue={event.startDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
          <TextField
            style={{ marginBottom: '2rem' }}
            name='endDate'
            label='종료 날짜'
            type='datetime-local'
            defaultValue={event.endDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
          <input
            type='text'
            name='title'
            style={{
              borderRadius: '5px',
              border: '1px solid #888',
              padding: '16px',
              fontSize: '16px',
              marginBottom: '2rem',
            }}
            placeholder='일정 제목'
            onChange={onChange}
          />
          <textarea
            name='content'
            style={{
              borderRadius: '5px',
              border: '1px solid #888',
              padding: '16px',
              fontSize: '16px',
              marginBottom: '3rem',
              height: '150px',
              resize: 'vertical', // 사용자가 수직으로만 크기 조절 가능하도록 설정
            }}
            placeholder='일정 내용'
            onChange={onChange}
          />

          <BtnGroup>
            <Button
              variant='contained'
              style={{ marginRight: '50px' }}
              onClick={() => navigate(`/manager/club/${clubId}/plan/${defid}`)}
            >
              뒤로가기
            </Button>
            <Button 
              variant='contained'
              color='primary'
              style={{ marginTop: '5px' }}
              onClick={handleEdit}
            >
              수정 완료
              </Button>
          </BtnGroup>
        </Modal>
      </Container>
      <Container2
        onClick={() => navigate(`/manager/club/${clubId}/plan/${defid}`)}
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
  width: 800px;
  height: 650px;
  box-sizing: border-box;
  z-index: 10;
  & h1 {
    text-align: center;
    color: #af7ac5;
  }

  & Button {
    min-width: 200px;
  }
`;

const BtnGroup = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    & Button {
      width: 100%;
    }
  }
`;

export default EditEvent;
