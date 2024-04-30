import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { motion } from 'framer-motion';
import NavStore from './NavigationStore.tsx';


const NavigationBar = () => {

  const {isPlaying} = NavStore();
  const [modalSaveShow, setModalSaveShow] = useState(false);
  const {setRenderAudioWAV} = NavStore();
  const {setRenderAudioMP3} = NavStore();
  const {setTimeConverted,TimeMultiTrack,timeHour, timeMinute, timeSecond, timeMilisecond} = NavStore();
  const formattedHour = String(timeHour).padStart(2, '0');
  const formattedMinute = String(timeMinute).padStart(2, '0');
  const formattedSecond = String(timeSecond).padStart(2, '0');
  const formattedMilisecond = String(Math.round(timeMilisecond / 10)).padStart(2, '0');

  const progressBar = NavStore( state => state.progressBar);
  const setProgressBar = NavStore(state => state.setProgressBar);
  const [showExitButton, setShowExitButton] = useState(true);
  const { ProjectName, setProjectName } = NavStore();
  const { bitrate, setBitrate } = NavStore();


  useEffect(() => {

    if (modalSaveShow) {
      setShowExitButton(progressBar === 0);
    }
    if (progressBar === 100) {
      setProgressBar(0);
      setShowExitButton(progressBar === 0);
      setModalSaveShow(false);
    }
    setTimeConverted(TimeMultiTrack)
  }, [progressBar, setProgressBar,
    modalSaveShow, TimeMultiTrack, setTimeConverted]);


  return (
    <Navbar className=' sticky-top' bg="light" expand="sm">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav ms-0">
        <Nav className="mr-auto collapse navbar-collapse">
          <Link to={"/"} onClick={(event) => {
            event.preventDefault();
            window.location.href = '/';
          }}>
            <div className='btn mx-1'>Home</div>
          </Link>
          <div className='d-flex w-100 justify-content-between'>
            <div className='d-flex'>
              <div className='column p-2 pe-1 bg-primary' style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                <span className='text-white mx-1 '>
                  <motion.div id={'play-music-button'} className=' d-inline-flex' whileTap={{ scale: 0.6 }} >
                    <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}/>
                  </motion.div></span >
                <span className='text-white mx-1 '>
                  <motion.div id={'stop-music-button'} className=' d-inline-flex' whileTap={{ scale: 0.6 }} >
                  <i className="bi bi-stop-fill"></i>
                  </motion.div></span>

              </div>

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
              <Nav.Link onClick={() => {setModalSaveShow(true);setProgressBar(0);} }>File</Nav.Link>
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>

      <Modal
        show={modalSaveShow}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="d-flex justify-content-between">
            <Modal.Title>Zapisz jako...</Modal.Title>
            <Button variant="secondary" disabled={!showExitButton} onClick={() => setModalSaveShow(false)}>Cancel</Button>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column gap-2'>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Nazwa pliku</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz nazwę pliku"
                value={ProjectName}
                onChange={e => setProjectName(e.target.value)}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Bitrate (kbps) dla MP3</Form.Label>
              <Form.Select value={bitrate} onChange={e => setBitrate(e.target.value)}>
                <option value="320">320 kbps</option>
                <option value="256">256 kbps</option>
                <option value="224">224 kbps</option>
                <option value="192">192 kbps</option>
                <option value="160">160 kbps</option>
                <option value="128">128 kbps</option>
                <option value="112">112 kbps</option>
                <option value="96">96 kbps</option>
              </Form.Select>
            </Form.Group>

          </Form>

          <Button disabled={!showExitButton} variant="primary" onClick={() => { setRenderAudioWAV(true); setShowExitButton(false) }}>
            Zapisz jako WAV
          </Button>
          <Button disabled={!showExitButton} variant="secondary" onClick={() => { setRenderAudioMP3(true); setShowExitButton(false)}}>
            Zapisz jako MP3
          </Button>
          <div className='mt-3  progress'>
          <div role='progressbar' className='progress-bar progress-bar-striped progress-bar-animated' aria-valuenow={progressBar} aria-valuemin="0" aria-valuemax="100" style={{width: `${progressBar}%`, backgroundColor: 'hsl(245, 30%, 45%)'}}>
          {progressBar > 0 ? `${progressBar}%` : ''}
          </div>
          </div>
        </Modal.Body>
      </Modal>

    </Navbar>

  );
};

export default NavigationBar;