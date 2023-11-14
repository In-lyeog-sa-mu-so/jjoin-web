import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import DecorateBoard from "./DecorateBoard";

const DecoratePage = () => {
    const [decorate, setDecorate] = useState({
        clubImageUuid: null,
        backgroundImageUuid: null,
        introduction: "",
        startDate: null,
        endDate: null
    });

    const baseUrl="https://18821b90-7c6b-4217-b68e-e5775ac40a41.mock.pstmn.io";
    const { clubId } = useParams();
    const getBoard = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/manager/club/${clubId}/information`);
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
            <div>
                <DecorateBoard
                clubImageUuid={decorate.clubImageUuid}
                backgroundImageUuid={decorate.backgroundImageUuid}
                introduction= {decorate.introduction}
                startDate={decorate.startDate}
                endDate={decorate.endDate}
                />
            </div>
        </div>
    );
};

export default DecoratePage;