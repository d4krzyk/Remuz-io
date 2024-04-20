import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Modal, Button, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { motion } from 'framer-motion';
import NavStore from './NavigationStore.jsx';
const NavigationBar = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalSaveShow, setModalSaveShow] = useState(false);
  const {setTimeConverted,TimeMultiTrack,timeHour, timeMinute, timeSecond, timeMilisecond} = NavStore();
  const formattedHour = String(timeHour).padStart(2, '0');
  const formattedMinute = String(timeMinute).padStart(2, '0');
  const formattedSecond = String(timeSecond).padStart(2, '0');
  const formattedMilisecond = String(Math.round(timeMilisecond / 10)).padStart(2, '0');
  //console.log(timeSecond)
  const [bpm, setBpm] = useState(140.00);
  function handlePauseMusic() {
    setIsPlaying(!isPlaying)
  }
  function handleStopMusic() {
    setIsPlaying(false)
  }
  useEffect(() => { setTimeConverted(TimeMultiTrack) }, [TimeMultiTrack, setTimeConverted]);

  const handleBpmChange = (event) => {
    setBpm(parseFloat(event.target.value).toFixed(2));
  }
  return (
    <Navbar className=' sticky-top' bg="light" expand="sm">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav ms-0">
        <Nav className="mr-auto collapse navbar-collapse">
          <Link to={"/"}>
            <div className='btn mx-1'>Home</div>
          </Link>
          <div className='d-flex w-100 justify-content-between'>
            <div className='d-flex'>
              <div className='column p-2 pe-1 bg-primary' style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                <span className='text-white mx-1 '>
                  <motion.div id={'play-music-button'} className=' d-inline-flex' whileTap={{ scale: 0.6 }} onClick={() => handlePauseMusic()}>
                    <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}/>
                  </motion.div></span >
                <span className='text-white mx-1 '>
                  <motion.div id={'stop-music-button'} className=' d-inline-flex' whileTap={{ scale: 0.6 }} onClick={() => handleStopMusic()} >
                  <i className="bi bi-stop-fill"></i>
                  </motion.div></span>
                {/* <span className='text-white mx-1 '><i className="bi  bi-arrow-repeat"></i></span > */}
              </div>
              {/*<div id='bpm-box' className='column p-2 d-flex align-content-end bg-dark' 
                style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px',
                borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                onClick={() => setModalShow(true)}>
                <div id='bpm-value' className='d-flex justify-content-start text-white me-1 '>{bpm}</div >
                <span className='text-white ms-1 me-0 '>BPM</span >
              </div>*/}
              <div className='column ms-4 p-2 d-flex align-content-end bg-dark rounded-3'>
                <div id='hour' className='text-white '>{formattedHour}</div >
                <span className='text-white mx-1'>:</span >
                <span id='minute' className='text-white '>{formattedMinute}</span >
                <span className='text-white mx-1'>:</span >
                <span id='seconds' className='text-white '>{formattedSecond}</span>
                <span className='text-white mx-1'>:</span >
                <span id='miliseconds' className='text-white '>{formattedMilisecond}</span> {/* TU POWINNO BYC GRAY BO TO MINI SEKUNDY */}
                {/*<span className='text-white mx-1'>SEC</span>*/}
              </div>

            </div>
            <div className='d-flex me-3'>
              <Nav.Link href="#save" onClick={() => setModalSaveShow(true)}>File</Nav.Link>
              {/* <Nav.Link href="#contact">Edit</Nav.Link>
              <Nav.Link href="#contact">Settings</Nav.Link> */}
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Zmień BPM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FormControl
                type="number"
                value={bpm}
                onChange={handleBpmChange}
              />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalSaveShow}
        onHide={() => setModalSaveShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Zapisz jako...</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column gap-2'>
          <Button variant="primary" onClick={() => { /* Tutaj dodaj logikę zapisu jako WAV */ }}>
            Zapisz jako WAV
          </Button>
          <Button variant="secondary" onClick={() => { /* Tutaj dodaj logikę zapisu jako MP3 */ }}>
            Zapisz jako MP3
          </Button>
        </Modal.Body>
      </Modal>

    </Navbar>

  );
};

export default NavigationBar;