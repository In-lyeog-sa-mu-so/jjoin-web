import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from './Board';

const NoticeReadPage = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState({});
    const getBoard = async () => {
        try {
            const resp = await axios.get(`https://1f118712-b219-41ed-affe-7cdb92c95f04.mock.pstmn.io/notice/${id}`);
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