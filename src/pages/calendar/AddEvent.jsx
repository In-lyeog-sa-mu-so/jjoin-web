import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import api from '../../Axios';

function AddEvent() {
    const navigate = useNavigate();
    const { clubId } = useParams();
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
  
    const addContent = () => {
      // const new_item = {
      //   startDate: event.startDate,
      //   endDate: event.endDate,
      //   title: event.title,
      //   content: event.content,
      // };

    if (event.startDate === '' || event.endDate === '') {
        window.alert('날짜를 입력해주세요');
        return;
    } else if (event.title === '') {
        window.alert('일정 제목을 입력해주세요');
        return;
    } else if (event.content === '') {
        window.alert('일정 내용을 입력해주세요.');
        return;
    }

    api.post(`/manager/club/${clubId}/plan`, event)
    .then(response => {
        // 성공적으로 전송되었을 때의 처리
        alert('일정이 등록되었습니다!');
    })
    .catch(error => {
        // 에러 처리
        console.error('Error posting event', error);
        alert('일정 등록에 실패했습니다.');
    });

    navigate(`/manager/club/${clubId}/plan`);
  };

  return (
    <>
      <Container>
        <Modal>
          <h1>
            <BorderColorIcon /> &nbsp;일정 등록하기
          </h1>
          <hr />
          <TextField
            style={{ marginBottom: '1rem' }}
            name='startDate'
            label='시작 날짜'
            type='datetime-local'
            defaultValue='0000-00-00T00:00'
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
            defaultValue='0000-00-00T00:00'
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
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </Button>
            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: '5px' }}
              onClick={addContent}
            >
              일정 추가
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

export default AddEvent;