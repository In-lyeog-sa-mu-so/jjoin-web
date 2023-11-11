import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DecorateBoard from "./DecorateBoard";

const DecoratePage = () => {
    const [decorate, setDecorate] = useState({
        clubImage: null,
        backgroundImage: null,
        introduction: "",
        isFinished: false,
        startDate: null,
        endDate: null,
    });

    const baseUrl="https://1f118712-b219-41ed-affe-7cdb92c95f04.mock.pstmn.io";

    const getBoard = async () => {
        try {
            const resp = await axios.get(baseUrl+ "/" + "decorate");
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
                clubImage={decorate.clubImage}
                backgroundImage={decorate.backgroundImage}
                introduction= {decorate.introduction}
                isFinished= {decorate.isFinished}
                startDate={decorate.startDate}
                endDate={decorate.endDate}
                />
            </div>
        </div>
    );
};

export default DecoratePage;