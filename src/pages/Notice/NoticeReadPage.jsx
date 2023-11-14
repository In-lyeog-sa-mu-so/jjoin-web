import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from './Board';

const NoticeReadPage = () => {
    const { id,clubId } = useParams();
    const [notice, setNotice] = useState({});
    const baseUrl="https://18821b90-7c6b-4217-b68e-e5775ac40a41.mock.pstmn.io";
    const getBoard = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/manager/club/${clubId}/notice/${id}`);
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
                content={notice.content}
                createdDate={notice.createdDate}
                updatedDate={notice.updatedDate}
            />
        </div>
    );
};

export default NoticeReadPage;