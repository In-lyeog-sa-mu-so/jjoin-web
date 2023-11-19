import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../../Axios';
import styled from 'styled-components';

const H2 = styled.h2`
  margin-left: 7%;
  span{
    font-size: 13px;
    color: gray;
    margin-left: 10px;
  }
`;

const CONTENTS= styled.div`
  width: 95%;
  margin-left: 2%;
  height: 100%;
`;

const CONTENT = styled.table`
  min-height: 300px;
  a{
    position: relative;
    top: 13px;
  }
`

const BUTTONS = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2%;
  border-top : 2px solid black;
  button{
    margin-top: 20px;
    margin-left:1%;
    padding: 8px 25px; /* Increase size, adjust as needed */
    background-color: darkblue; /* Change color */
    font-size: 15px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: darkgrey;
    }
  }
`

function ApplicationDetails() {
    const navigate = useNavigate();
    const { clubId, applicationId } = useParams();
    const [application, setApplication] = useState({applicationDto: {}, applicationQAsets: []});

    const getApplication = async () => {
        try {
            const resp = await api.get(`/manager/club/${clubId}/application/${applicationId}`);
            if (resp && resp.data) {
                console.log(resp.data);
                setApplication(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const allowApplication = () => {
        api.patch(`/manager/club/${clubId}/application/${applicationId}`)
        .then(() => {
            alert('가입 신청을 수락했습니다!');
            navigate(`/manager/club/${clubId}/application`);
        })
        .catch(error => {
            console.error('Error deleting event', error);
            alert('가입 신청 수락에 실패했습니다.');
            navigate(`/manager/club/${clubId}/application`);
        });
    };

    const denyApplication = () => {
        api.delete(`/manager/club/${clubId}/application/${applicationId}`)
        .then(() => {
          alert('가입 신청을 거절했습니다!');
          navigate(`/manager/club/${clubId}/application`);
        })
        .catch(error => {
          console.error('Error deleting event', error);
          alert('가입 신청 거절에 실패했습니다.');
          navigate(`/manager/club/${clubId}/application`);
        });
    };

    useEffect(() => {
        getApplication();
    }, [clubId, applicationId]);

    return (
        <div>
            <H2>가입신청서</H2>
            <CONTENTS>
                <CONTENT>
                    <tbody>
                        <tr>
                            <td>이름: </td>
                            <td>{application.applicationDto.name}</td>
                        </tr>
                        <tr>
                            <td>학번: </td>
                            <td>{application.applicationDto.studentId}</td>
                        </tr>
                        <tr>
                            <td>학과: </td>
                            <td>{application.applicationDto.major}</td>
                        </tr>
                        <tr>
                            <td>이메일: </td>
                            <td>{application.applicationDto.email}</td>
                        </tr>
                        <tr>
                            <td>신청일: </td>
                            <td>{application.applicationDto.requestDate}</td>
                        </tr>
                        {application.applicationQAsets.map((qa, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>질문 {index + 1}: </td>
                                    <td>{qa.question}</td>
                                </tr>
                                <tr>
                                    <td>답변 {index + 1}: </td>
                                    <td>{qa.answer}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </CONTENT>
                <BUTTONS>
                <button onClick={allowApplication}>수락</button>
                <button onClick={denyApplication}>거절</button>
                </BUTTONS>
            </CONTENTS>
        </div>
    );
}

export default ApplicationDetails;