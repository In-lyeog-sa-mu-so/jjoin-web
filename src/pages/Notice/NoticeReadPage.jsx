import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from './Board';

const NoticeReadPage = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState({});
    const baseUrl="https://7f43ee63-b0b8-4e87-9c96-a7c2c01a39f5.mock.pstmn.io";
    const getBoard = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/notice/${id}`);
            if(resp && resp.data) {
                setNotice(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div>
            <Board
                id = {notice.id}
                title={notice.title}
                contents={notice.contents}
                updateddata={notice.updateddata}
            />
        </div>
    );
};

export default NoticeReadPage;