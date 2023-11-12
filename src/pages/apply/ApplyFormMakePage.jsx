import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  background-color: whitesmoke;
  width: 90%;
`
const CONTENTS= styled.div`
  width: 95%;
  margin-left: 2%;
  height: 550px;
  a{
    width:100px;
    height:50px;
    background-color: white;
  }
`
const H2 = styled.h2`
  margin-left: 5%;
`

const ApplyFormMakePage = () => {
    const [ApplyForm, setApplyForm] = useState({});

    const baseUrl="https://1f118712-b219-41ed-affe-7cdb92c95f04.mock.pstmn.io";
    const getApply = async () => {
        try {
            const resp = await axios.get(baseUrl+ "/" + "apply");
            if(resp && resp.data) {
                setApplyForm(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        getApply();
    }, []);

    return(
        <div>
        <H2>신청서 관리</H2>
        <CONTAINER>
           <CONTENTS>
               <div>
                   <a>성함</a>
                   <a></a>
               </div>
               <div>
                   <a>학번</a>
                   <a></a>
               </div>
               <div>
                   <a>학과</a>
                   <a></a>
               </div>
               <div>
                   <a>전화번호</a>
                   <a></a>
               </div>
           </CONTENTS>
        </CONTAINER>
        </div>
    );
};

export default ApplyFormMakePage;