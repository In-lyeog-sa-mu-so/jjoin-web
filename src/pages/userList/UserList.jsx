import React from "react";
import './userList.css';
import ApplicationList from './ApplicationList';
import { DataGrid } from '@mui/x-data-grid';
// import { userRows } from '../../dummyData'
import { DeleteOutline } from '@mui/icons-material';

const userRows = [
    { id: 1, name: "조원준", student_id: '2019112060', department: '컴퓨터공학과', email: 'c68254@gmail.com', join_date: '2023-10-06', user_type: '회장'},
    { id: 2, name: "김태욱", student_id: '2019112061', department: '컴퓨터공학과', email: 'taewook@naver.com', join_date: '2023-10-06', user_type: '대국장'},
    { id: 3, name: "조성진", student_id: '2019112062', department: '컴퓨터공학과', email: 'csk00@gmail.com-xxxx', join_date: '2023-10-07', user_type: '부회장'},
    { id: 4, name: "박재형", student_id: '2019112063', department: '컴퓨터공학과', email: 'hyeong@dgu.ac.kr', join_date: '2023-10-07', user_type: '기획국장'},
    { id: 5, name: "손형준", student_id: '2019112064', department: '컴퓨터공학과', email: 'dcs.public.gmail.com', join_date: '2023-10-08', user_type: '사무국장'},
    { id: 6, name: "이선호", student_id: '2019112065', department: '컴퓨터공학과', email: 'prefer00@dongguk.edu', join_date: '2023-10-09', user_type: '관리국장'},
];

const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    { field: 'name', headerName: '이름', width: 150, },
    { field: 'student_id', headerName: '학번', width: 150, },
    { field: 'department', headerName: '학과', width: 150, },
    { field: 'email', headerName: '이메일', width: 150, },
    { field: 'join_date', headerName: '가입일', width: 150, },
    { field: 'user_type', headerName: '직책', width: 150, },
    { 
        field: 'modification', 
        headerName: '변경', 
        width: 150,
        renderCell: (params) => {
            return (
                <>
                    <button className="userListEdit">Edit</button>
                    <DeleteOutline className="userListDelete" />
                </>
            );
        },
    },
];

export default function UserList() {
    return (
        <div className="userList">
            <h3>멤버관리</h3>
            <hr color="darkBlue"/>
            <br />
            <DataGrid
                rows={userRows}
                disableRowSelectionOnClick
                columns={columns}
                pageSizeOptions={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            <br /><br />
            <ApplicationList />
        </div>
    );
}