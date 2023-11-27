import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WavesurferMultiTrackPlayer from './WavesurferMultiTrackPlayer';


import NavigationBar from './NavigationBar';
function DAW() {
  const tracks = [
    { url: '/DAW/flute_melody0.mp3', name: 'flute' },
    // Dodaj więcej ścieżek według potrzeb
  ];



  return (
    <div className='d-flex h-100 flex-column'>
    <NavigationBar/>
    <div className="cover-container d-flex h-100 p-0 bg-dark">
    <div style={{width: '9.5rem'}} className='d-flex flex-column flex-shrink-0 bg-body justify-content-start'>
        <ul className='nav nav-pills flex-column mb-auto'>
          <li className='nav-item'>
            <a className='nav-link bg-primary text-white m-2'><i class="bi bi-upload me-2"></i>Upload</a></li>
        </ul>
        </div>
    <WavesurferMultiTrackPlayer tracks={tracks} />
      {/*<div className='row'>
        
        <div className='cover-container text-center w-100 '>
        </div>
        </div>*/}
    </div>
    </div>
  );
}

export default DAW;