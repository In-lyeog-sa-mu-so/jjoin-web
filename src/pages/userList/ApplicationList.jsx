import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../Axios';
import { DataGrid } from '@mui/x-data-grid';

const applicationRows = [
  { id: 11, name: "이용탁", student_id: '2019112010', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-14'},
  { id: 12, name: "정구연", student_id: '2019112011', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-15'},
  { id: 13, name: "차재식", student_id: '2019112012', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-16'},
  { id: 14, name: "이태규", student_id: '2019112013', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-17'},
  { id: 15, name: "김도훈", student_id: '2019112014', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-18'},
  { id: 16, name: "김동훈", student_id: '2019112015', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-19'},
  { id: 17, name: "이형준", student_id: '2019112016', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-20'},
  { id: 18, name: "한상민", student_id: '2019112017', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-21'},
  { id: 19, name: "김건우", student_id: '2019112018', department: '컴퓨터공학과', phone: '010-xxxx-xxxx', join_date: '2023-10-22'},
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70, },
  { field: 'name', headerName: '이름', width: 150, },
  { field: 'student_id', headerName: '학번', width: 150, },
  { field: 'department', headerName: '학과', width: 150, },
  { field: 'email', headerName: '이메일', width: 150, },
  { field: 'join_date', headerName: '가입신청일', width: 150, },
]

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
    <div>
      <h3>가입신청관리</h3>
      <hr color='darkBlue'/>
      <br />
      <DataGrid
                rows={applicationRows}
                disableRowSelectionOnClick
                columns={columns}
                pageSizeOptions={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
      />
    {/* <table>
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
    </table> */}
    </div>
  );
};

export default SignupList;
