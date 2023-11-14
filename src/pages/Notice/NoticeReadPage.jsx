import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './Board';
import api from '../../Axios';

const NoticeReadPage = () => {
    const { id,clubId } = useParams();
    const [notice, setNotice] = useState({});
    
    const getBoard = async () => {
        try {
            const resp = await api.get(`/manager/club/${clubId}/notice/${id}`);
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