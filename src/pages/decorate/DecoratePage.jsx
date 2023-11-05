import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const DecoratePage = () => {
    const navigate = useNavigate();

    const moveToUpdate = () =>{
        navigate('/update/');
    };

    const [decorate, setDecorate] = useState({
        clubImage: null,
        backgroundImage: null,
        introduction: "",
        isFinished: false,
        startDate: null,
        endDate: null,
    });

    const getBoard = async () => {
        try {
            const resp = await axios.get(`https://fe54c381-c22f-4101-b015-1d8ef0ec8ff9.mock.pstmn.io/decorate`);
            if(resp && resp.data) {
                setDecorate(resp.data);
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

    return(
        <div>
            <h2>홍보페이지 관리</h2>
            <div>
                <div>{decorate.clubImage}</div>
                <div>{decorate.backgroundImage}</div>
                <div>{decorate.introduction}</div>
                <div>{decorate.isFinished}</div>
                <div>{decorate.startDate}</div>
                <div>{decorate.endDate}</div>
                <button onClick={moveToUpdate}>수정</button>
            </div>
        </div>
    );
};

export default DecoratePage;