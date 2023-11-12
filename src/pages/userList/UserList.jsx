import React from "react";
import './userList.css';
import ApplicationList from './ApplicationList';
import { DataGrid } from '@mui/x-data-grid';
import { userRows } from '../../dummyData';
import { DeleteOutline } from '@mui/icons-material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    { field: 'name', headerName: '이름', width: 150, },
    { field: 'student_id', headerName: '학번', width: 150, },
    { field: 'department', headerName: '학과', width: 150, },
    { field: 'phone', headerName: '전화번호', width: 150, },
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
]

export default function UserList() {
    return (
        <div className="userList">
            <h3>멤버관리</h3>
            <DataGrid
                rows={userRows}
                disableRowSelectionOnClick
                columns={columns}
                pageSizeOptions={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                autoPageSize
            />
            <ApplicationList />
        </div>
    );
}