import React, {useEffect, useState} from 'react';
import api from '../../Axios';
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

    const { clubId } = useParams();
    const getBoard = async () => {
        try {
            const resp = await api.get(`/manager/club/${clubId}/information`);
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
    }, [clubId]);

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