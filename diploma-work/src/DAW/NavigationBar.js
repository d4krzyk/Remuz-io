import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { motion } from 'framer-motion';
const NavigationBar = () => {

  const [isPlaying, setIsPlaying] = useState(false);

  function handlePauseMusic() {
    setIsPlaying(!isPlaying)
  }
  return (
    <Navbar className=' sticky-top' bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav ms-0">
        <Nav className="mr-auto collapse navbar-collapse">
          <Link to={"/"}>
            <div className='btn mx-1'>Home</div>
          </Link>
          <div className='d-flex w-100 justify-content-between'>
            <div className='d-flex'>
              <div className='column p-2 pe-1 bg-primary' style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                <span className='text-white mx-1 '>
                  <motion.div className=' d-inline-flex' whileTap={{ scale: 0.6 }} onClick={() => handlePauseMusic()}>
                    <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}/>
                  </motion.div></span >
                <span className='text-white mx-1 '>
                  <motion.div className=' d-inline-flex' whileTap={{ scale: 0.6 }} >
                  <i class="bi bi-stop-fill"></i>
                  </motion.div></span>
                <span className='text-white mx-1 '><i className="bi  bi-arrow-repeat"></i></span >
              </div>
              <div className='column p-2 d-flex align-content-end bg-dark' style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>
                <div className='d-flex justify-content-start text-white me-1 '>140.00</div >
                <span className='text-white ms-1 me-0 '>BPM</span >
              </div>
              <div className='column ms-4 p-2 d-flex align-content-end bg-dark rounded-3'>
                <div className='text-white '>0</div >
                <span className='text-white mx-1'>:</span >
                <span className='text-white '>00</span>
                <span className='text-white mx-1'>:</span >
                <span className='text-white '>000</span> {/* TU POWINNO BYC GRAY BO TO MINI SEKUNDY */}
                <span className='text-white mx-1'>SEC</span>
              </div>

            </div>
            <div className='d-flex me-3'>
              <Nav.Link href="#about">File</Nav.Link>
              <Nav.Link href="#contact">Edit</Nav.Link>
              <Nav.Link href="#contact">Settings</Nav.Link>
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;