import { React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiTrackPlayer from './Multitrack/MultiTrackPlayer';
import NavigationBar from './NavigationBar';
import SoundLib from './SoundLib/SoundLib';
import ToolsBar from './Multitrack/ToolsBar';
import VolumeMeterContainer from './VolumeMeterContainer';
function DAW() {


  return (
    <div className='d-flex h-100 flex-column'>
      <NavigationBar />
      <div className="cover-container d-flex h-100 p-0 bg-dark">
        <div style={{ width: '11rem' }} className='d-flex  flex-column flex-shrink-0 bg-body justify-content-start'>
          <SoundLib/>
        </div>
        <div className='d-flex flex-column w-100'>
        <ToolsBar/>
        
        <div className='d-flex w-100 h-100'>
       
        <div id='VolumeMeter' style={{ width: '3.5rem', height: '100%' }} className='d-flex bg-dark flex-column border-2 flex-shrink-0 justify-content-end'>
          {/* <VolumeMeterContainer/> */}
        </div>
        <div className='flex-grow-1 flex-column mt-0'>
          <MultiTrackPlayer/>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default DAW;