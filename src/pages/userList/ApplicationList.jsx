import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SignupList = () => {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const [signups, setSignups] = useState([]);

  const baseUrl="https://0ff33e21-0dba-4cd7-9b86-65372e66ab7e.mock.pstmn.io";
  const getSignupList = async () => {
    try {
        const resp = await axios.get(`${baseUrl}/manager/club/${clubId}/application`);
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
