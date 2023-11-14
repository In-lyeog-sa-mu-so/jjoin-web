import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../Axios';

const SignupList = () => {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const [signups, setSignups] = useState([]);

  const getSignupList = async () => {
    try {
        const resp = await api.get(`/manager/club/${clubId}/application`);
        if(resp && resp.data) {
            setSignups(resp.data);
        } else {
            console.error('No data received');
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    getSignupList();
  }, [clubId]);

  const handleRowClick = (applicationId) => {
    navigate(`/manager/club/${clubId}/application/${applicationId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Student ID</th>
          <th>Major</th>
          <th>Email</th>
          <th>Request Date</th>
        </tr>
      </thead>
      <tbody>
        {signups.map(signup => (
          <tr key={signup.applicationId} onClick={() => handleRowClick(clubId, signup.applicationId)}>
            <td>{signup.name}</td>
            <td>{signup.studentId}</td>
            <td>{signup.major}</td>
            <td>{signup.email}</td>
            <td>{new Date(signup.requestDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SignupList;
