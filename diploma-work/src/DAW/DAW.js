import { React, useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WavesurferMultiTrackPlayer from './WavesurferMultiTrackPlayer';
import { Howl } from 'howler';
import NavigationBar from './NavigationBar';
import WaveSurfer from 'wavesurfer.js';
function DAW() {
  const tracks = [
    { url: '/DAW/flute_melody0.mp3', name: 'flute' },
    // Dodaj więcej ścieżek według potrzeb
  ];
  const [audioSrc, setAudioSrc] = useState(null);
  const [waveformId, setWaveformId] = useState(null);
  const sound = useRef(null);
  const wavesurferRef = useRef(null);
  const fileInputRef = useRef(null);
  // Funkcja do uzyskiwania rozszerzenia pliku
const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};
  useEffect(() => {
    if (waveformId) {
      wavesurferRef.current = WaveSurfer.create({
        container: `#waveform-${waveformId}`,
        waveColor: 'white',
        progressColor: 'purple',
        height: 25, 
      });
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
      if (sound.current) {
        sound.current.unload();
        sound.current = null;
      }
    };
  }, [waveformId]);

  const pSound = () =>{
    wavesurferRef.current.play();
  }  
  const playSound = () => {
    if (audioSrc) {
      if (sound.current) {
        sound.current.unload();
        sound.current = null;
      }

      sound.current = new Howl({
        src: [audioSrc],
        onend: () => {
          wavesurferRef.current.stop();
        },
      });

      sound.current.play();
      wavesurferRef.current.load(audioSrc);
      //wavesurferRef.current.play();
    } else {
      alert('Wybierz plik dźwiękowy przed odtworzeniem.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAudioSrc(objectUrl);
      // Generuj unikalny identyfikator dla nowego elementu
      const newWaveformId = Math.random().toString(36).substring(7);
      setWaveformId(newWaveformId);
    }
  };

  return (
    <div className='d-flex h-100 flex-column'>
      <NavigationBar />
      <div className="cover-container d-flex h-100 p-0 bg-dark">
        <div style={{ width: '9.5rem' }} className='d-flex flex-column flex-shrink-0 bg-body justify-content-start'>
          <ul className='nav nav-pills flex-column mb-auto'>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              id="uploadInput"
              style={{ display: 'none' }} // Ukrywamy input, ale nadal można go aktywować przez etykietę
            />
            <li className='nav-item'  >
              <label className='nav-link bg-primary text-white m-2' htmlFor="uploadInput">
                <i className="bi bi-upload me-2"></i>
                Upload
              </label>
            </li>
            {audioSrc && (<li className='nav-item'  >
              <label className='nav-link bg-primary text-white m-1'>
                  <div onClick={playSound}>
                  <i onClick={pSound} className="bi bi-upload me-0"></i>
                    <div id={`waveform-${waveformId}`} style={{ margin: '0px' }}></div>
                  </div>
              </label>
            </li>)}

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