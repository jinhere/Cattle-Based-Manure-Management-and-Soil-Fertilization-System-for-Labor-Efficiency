import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Fertility from './Components/Fertility';
import Intro from './Components/Start';

function App() {    
      // The main component that defines the structure of the entire app
      return(
        <div className="App">
          <Routes>
            {/* Route for the default home page */}
            <Route path='/' element={<Intro/>} exact />
            {/* Route for the fertility page */}
            <Route path='/fertility' element={<Fertility/>}></Route>
          </Routes>
        </div>
      )
}

export default App;
 