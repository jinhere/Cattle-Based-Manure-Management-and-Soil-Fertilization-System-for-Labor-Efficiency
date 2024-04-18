// Code structure
/* The structure of the code consists of three main components
   - Styled component that decorates the page
   - Code part that controls the feeder
   - Part that is printed on the page*/

   import React from 'react';
   import {useEffect, useState} from 'react';
   import styled from 'styled-components';
   import axios from 'axios';
   import './land.css';
   
   const today = new Date();  //Today's date
   function Fertility() {
   
     //styled component for fertility page
     let Background = styled.div`
       width: 100vw;
       height: 115vh;
       background-color: #F0F0F0;
       display: flex;
       align-items: center;
       flex-direction: column;
     `
   
     let Title = styled.div`
       width: 90vw;
       height: 55px;
       background-color: white;
       margin-top : 20px;
       margin-bottom: 7px;
       border-radius : 15px;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: x-large;
       font-weight: 700;
     `
     //Include area1, area2
     let Farm1 = styled.div`
       width: 100%;
       height: 50%;
       background-color: #ffffff00;
       display: flex;
     `
     //Include area3, area4
     let Farm2 = styled.div`
       width: 100%;
       height: 60%;
       display: flex;
   `
     let Soil = styled.div`
       width: 50%;
       height: 100%;
       background-color: #ffffff00;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: large;
       font-weight: bold;
     `
   
     let Date = styled.div`
       width: 90vw;
       height : 50px;
       background-color : #ffffff00;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: x-large;
       font-weight: bold;
       font-style: italic;
     `
   
     let Update = styled.button`
       width: 175px;
       height: 40px;
       margin-left: 15px;
       align-items: center;
       justify-content: center;
       color: white;
       background-color :green;
       border-radius: 15px;
       font-size: large;
       border-style: none;
     `
     let Feeder = styled.div`
       width: 90vw;
       height : auto;
       display: flex;
       align-items: center;
       justify-content: center;
       background-color :  #ffffff00;
       flex-direction: column;
       margin-top: 8px;
     `
   
     let SwitchTitle = styled.div`
       width: 90vw;
       height: 50px;
       background-color: white;
       display: flex;
       justify-content: center;
       align-items: center;
       border-radius: 15px 15px 0 0;
       font-size: x-large;
       font-weight: 700;
       border-bottom: solid 4px #F0F0F0;
     `
     let Switch = styled.div`
       width: 90vw;
       height: 50px;
       background-color: white;
       display: flex;
       align-items: center;
       justify-content: space-around;
       font-size: midium;
       font-weight: 700;
     `
     let Switchbottom = styled.div`
       width: 90vw;
       height: 10px;
       background-color: white;
       display: flex;
       align-items: center;
       justify-content: space-around;
       border-radius: 0 0 15px 15px;
     `
     const ToggleContainer = styled.div`
     position: relative;
     cursor: pointer;
     > .toggle-container {
       width: 50px;
       height: 24px;
       border-radius: 30px;
       background-color: rgb(233,233,234);}
     > .toggle--checked {
       background-color: rgb(0,200,102);
       transition : 0.5s
     }
   
     > .toggle-circle {
       position: absolute;
       top: 1px;
       left: 1px;
       width: 22px;
       height: 22px;
       border-radius: 50%;
       background-color: rgb(255,254,255);
       transition : 0.5s
     } >.toggle--checked {
       left: 27px;
       transition : 0.5s
     }
   `
     const NPK = styled.div`
       width: 90vw;
       height: 120px;
       display: flex;
       justify-content: center;
       align-items: center;
       font-weight: 700;
   `
     let Card = styled.div`
       width: 160px;
       height: 70px;
       padding: 20px;
       flex-direction: column;
       background-color: white;
       display: flex;
       justify-content: center;
       align-items: center;
       border-radius: 15px;
       font-size: medium;
       font-weight: 600;
       box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
     `
     let TipCard = styled.div`
       width: 120px;
       height: 70px;
       padding: 20px;
       flex-direction: column;
       margin-left: 10px;
       background-color: white;
       display: flex;
       justify-content: center;
       border-radius: 15px;
       text-align: center;
       font-size: small;
       font-weight: 600;
       box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
     `
     let Cardtitle =  styled.div`
       font-size: 19px;
       color : #335D2D;
       font-weight: 700;
     `
   // Part that controls the feeder
   // Data from server - received(location, NPK data, last open time, feeder status)
   const [data, setData] = useState(0);
   
   // toggle view, feeder status variable
   const [feeder1, setFeeder1] = useState(0);
   const [feeder2, setFeeder2] = useState(0);
   const [feeder3, setFeeder3] = useState(0);
   const [feeder4, setFeeder4] = useState(0);
   
   //Information of soil fertility
      useEffect(() => {
       // Fetching data from the server for soil fertility
       axios
         .get('https://www.chaerim.site/fertilityLevel')
         .then((response)=> {
           setData(response.data);
           setFeeder1(response.data.units[0].feeder_status);
           setFeeder2(response.data.units[1].feeder_status);
           setFeeder3(response.data.units[2].feeder_status);
           setFeeder4(response.data.units[3].feeder_status);
       })
       .catch(error => {
         console.log(error);
       });
     }, []);
   // Code part that controls the feeder: 0 means close, 1 means open
   // Feeder1 button
   const firstHandler = () => {
       setFeeder1(!feeder1); // Changing the switch view for Feeder1
       // Sending a signal to open or close Feeder1
       if(feeder1 == 0) {
         // Opening Feeder1
         axios({
           url: 'https://www.chaerim.site/feederSignal',
           method: "POST",
           headers: {
             'Content-Type' : 'application/x-www-form-urlencoded'
           },
           data: {location: 1, signal: 1}
         }).then((res)=> {
         },(err)=> {
           console.log(err);
         })
         setFeeder1(1)
       }
       else if(feeder1 == 1) {
         // Closing Feeder1
         axios({
           url: 'https://www.chaerim.site/feederSignal',
           method: "POST",
           headers: {
             'Content-Type' : 'application/x-www-form-urlencoded'
           },
           data: {location: 1, signal: 0}
         }).then((res)=> {
         },(err)=> {
           console.log(err);
         })
         setFeeder1(0)
       }
   }
   //Feeder2 button
   const secondHandler = () => {
       setFeeder2(!feeder2); // Changing the switch view for Feeder2
       // Sending a signal to open or close Feeder2
       if(feeder2 == 0) {
         // Opening Feeder2
         axios({
           url: 'https://www.chaerim.site/feederSignal',
           method: "POST",
           headers: {
             'Content-Type' : 'application/x-www-form-urlencoded'
           },
           data: {location: 2, signal: 1}
         }).then((res)=> {
         },(err)=> {
           console.log(err);
         })
         setFeeder2(1)
       }
       else if(feeder2 == 1) {
         // Closing Feeder2
         axios({
           url: 'https://www.chaerim.site/feederSignal',
           method: "POST",
           headers: {
             'Content-Type' : 'application/x-www-form-urlencoded'
           },
           data: {location: 2, signal: 0}
         }).then((res)=> {
         },(err)=> {
           console.log(err);
         })
         setFeeder2(0)
       }
     }
   //Feeder3 button
   const thirdHandler = () => {
     setFeeder3(!feeder3); // Changing the switch view for Feeder3
     // Sending a signal to open or close Feeder3
     if(feeder3 == 0) {
       // Opening Feeder3
       axios({
         url: 'https://www.chaerim.site/feederSignal',
         method: "POST",
         headers: {
           'Content-Type' : 'application/x-www-form-urlencoded'
         },
         data: {location: 3, signal: 1}
       }).then((res)=> {
       },(err)=> {
         console.log(err);
       })
       setFeeder3(1)
     }
     else if(feeder3 == 1) {
       // Closing Feeder3
       axios({
         url: 'https://www.chaerim.site/feederSignal',
         method: "POST",
         headers: {
           'Content-Type' : 'application/x-www-form-urlencoded'
         },
         data: {location: 3, signal: 0}
       }).then((res)=> {
       },(err)=> {
         console.log(err);
       })
       setFeeder3(0)
     }
   }
   //Feeder4 button
   const fourthHandler = () => {
     setFeeder4(!feeder4); // Changing the switch view for Feeder4
     // Sending a signal to open or close Feeder4
     if(feeder4 == 0) {
       // Opening Feeder4
       axios({
         url: 'https://www.chaerim.site/feederSignal',
         method: "POST",
         headers: {
           'Content-Type' : 'application/x-www-form-urlencoded'
         },
         data: {location: 4, signal: 1}
       }).then((res)=> {
       },(err)=> {
         console.log(err);
       })
       setFeeder4(1)
     }
     else if(feeder4 == 1) {
       // Closing Feeder4
       axios({
         url: 'https://www.chaerim.site/feederSignal',
         method: "POST",
         headers: {
           'Content-Type' : 'application/x-www-form-urlencoded'
         },
         data: {location: 4, signal: 0}
       }).then((res)=> {
       },(err)=> {
         console.log(err);
       })
       setFeeder4(0)
     }
   }    
       // Formatted date for today
       const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
       //Page view
         return(
           <Background>
               <Title>
                   Soil Fertility
               </Title>
               <div className='image-bg'>
               {/* Farm view - soil fertility of each area */}
                   <Farm1>
                       <Soil>Area 1<br></br>N: {data&&data.units[0].N}<br></br>P: {data&&data.units[0].P}<br></br>K: {data&&data.units[0].K}</Soil>
                       <Soil>Area 2<br></br>N: {data&&data.units[1].N}<br></br>P: {data&&data.units[1].P}<br></br>K: {data&&data.units[1].K}</Soil>
                   </Farm1>
                   <Farm2>
                       <Soil>Area 3<br></br>N: {data&&data.units[2].N}<br></br>P: {data&&data.units[2].P}<br></br>K: {data&&data.units[2].K}</Soil>
                       <Soil>Area 4<br></br>N: {data&&data.units[3].N}<br></br>P: {data&&data.units[3].P}<br></br>K: {data&&data.units[3].K}</Soil>
                   </Farm2>
               </div>
               <Date>{formattedDate}<Update onClick={()=> window.location.reload(false)}>Update Fertility</Update></Date>
               {/* Recommendation for ideal NPK value and tips */}
               <NPK>
                 <Card><Cardtitle>Ideal NPK value?</Cardtitle>N : 11~30 <br></br>P : 21 ~ 30 <br></br>K : 121 ~ 155</Card>
                 <TipCard><Cardtitle>Tip!</Cardtitle>If either P or K meets the needs, we recommend closing the feeder</TipCard>
               </NPK>
               {/* Feeder controller */}
               <Feeder>
                   <SwitchTitle>Feeder Controller</SwitchTitle>
                   {/* Last open time of each area, toggle switch styled using styled components.
                       If the toggle switch is turned on, the style of toggle--checked is activated*/}
                   <Switch>Area 1-last open: {data&&data.units[0].last_open} <ToggleContainer onClick={firstHandler}><div className={`toggle-container ${feeder1 ? "toggle--checked" : null}`}/><div className={`toggle-circle ${feeder1 ? "toggle--checked" : null}`}/></ToggleContainer></Switch>
                   <Switch>Area 2-last open: {data&&data.units[1].last_open} <ToggleContainer onClick={secondHandler}><div className={`toggle-container ${feeder2 ? "toggle--checked" : null}`}/><div className={`toggle-circle ${feeder2 ? "toggle--checked" : null}`}/></ToggleContainer></Switch>
                   <Switch>Area 3-last open: {data&&data.units[2].last_open} <ToggleContainer onClick={thirdHandler}><div className={`toggle-container ${feeder3 ? "toggle--checked" : null}`}/><div className={`toggle-circle ${feeder3 ? "toggle--checked" : null}`}/></ToggleContainer></Switch>
                   <Switch>Area 4-last open: {data&&data.units[3].last_open} <ToggleContainer onClick={fourthHandler}><div className={`toggle-container ${feeder4 ? "toggle--checked" : null}`}/><div className={`toggle-circle ${feeder4 ? "toggle--checked" : null}`}/></ToggleContainer></Switch>
                   <Switchbottom></Switchbottom>
               </Feeder>
           </Background>
         )
   }
   
   export default Fertility;