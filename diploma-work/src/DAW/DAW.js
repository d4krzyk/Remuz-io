import { React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WavesurferMultiTrackPlayer from './Multitrack/WavesurferMultiTrackPlayer';
import NavigationBar from './NavigationBar';
import SoundLib from './SoundLib/SoundLib';
import ToolsBar from './Multitrack/ToolsBar';
function DAW() {
  const tracks = [
    { url: '/DAW/flute_melody0.mp3', name: 'flute' },
    // Dodaj więcej ścieżek według potrzeb
  ];

  return (
    <div className='d-flex h-100 flex-column'>
      <NavigationBar />
      <div className="cover-container d-flex h-100 p-0 bg-dark">
        <div style={{ width: '9.5rem' }} className='d-flex flex-column flex-shrink-0 bg-body justify-content-start'>
          <SoundLib/>
        </div>
        <ToolsBar/>
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