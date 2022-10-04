import React from 'react';

import './index.css';
//  import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainNavbar from './components/MainNavbar/MainNavbar';
// import UploadMedia from './components/UploadMedia/UploadMedia';
// import NewProfileMedia from './components/NewProfile/NewProfile-Media';
import NewProfile from './components/NewProfile/NewProfile';

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Container>
        {/* <NewProfileMedia /> */}
        <NewProfile />
      </Container>

      {/* <Routes> */}
      {/*  <Route path="/" element={<Home />} /> */}
      {/*  <Route path="about" element={<About />} /> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
