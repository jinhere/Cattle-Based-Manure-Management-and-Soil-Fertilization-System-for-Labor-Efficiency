// Code structure
/* The structure of the code consists of three main components
   - Styled component that decorates the page
   - Intro Page Configuration*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//styled component for start page
let Background = styled.div`
    width: 100vw;
    height : 100vh;
    background-color:#F0F0F0;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left
`
let Title = styled.h1`
    background-color: #F0F0F0;
    margin-top: 17vh;
    font-size: xxx-large;
    margin-left: 65px;
    margin-right: 65px;
`
let Start = styled.button`
    background-color: black;
    margin-top: 37vh;
    width: 65vw;
    height: 80px;
    border-radius: 30px;
    border-bottom: rgba(0, 0, 0, 0);
    color: #ffffff;
    font-size: x-large;
    font-weight: 700;
    cursor:pointer;
`
function Intro() {
    // React Router hook for navigation
    let navigate = useNavigate();

      return(
        <Background>
            {/* Intro page of CCH Web Application */}
            <Title>Check your<br></br>Farm's Soil Fertility</Title>
            {/* Button to initiate the fertility page */}
            <Start onClick={()=>{navigate('/fertility');}}>Get started</Start>
        </Background>
      )
}

export default Intro;
 