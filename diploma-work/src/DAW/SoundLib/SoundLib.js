import { React, useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { motion } from 'framer-motion';
import '../../App.css'
function SoundLib() {
  const showSound = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: '0.5',
        ease: 'easeInOut',
      },
    },
  };
  const [audioFiles, setAudioFiles] = useState([]); // Lista plików audio
  const [currentFileIndex, setCurrentFileIndex] = useState(null); // Indeks aktualnie odtwarzanego pliku
  const [isPlaying, setIsPlaying] = useState(false); // Stan odtwarzania

  useEffect(() => {
    audioFiles.forEach((file, index) => {
      if (!file.wavesurfer && document.querySelector(`#waveform-container-${file.id}`)) {
        const wavesurfer = WaveSurfer.create({
          container: `#waveform-container-${file.id}`,
          waveColor: 'white',
          progressColor: 'purple',
          height: 30,
          barWidth: 2.5,
          barRadius: 3,
          barGap: 0,
          normalize: false,
          barMinHeight: 5,
          cursorWidth: 0,
          interact: true,
        });
        wavesurfer.load(file.audioSrc);

        wavesurfer.on('finish', () => {
          wavesurfer.stop(); // zatrzymuje i resetuje na początek
          setCurrentFileIndex(null); // resetuje obecnie odtwarzany indeks
          setIsPlaying(false); // ustawia stan odtwarzania na false
        });

        // Aktualizacja stanu z nową instancją WaveSurfer
        setAudioFiles(prevFiles => {
          const newFiles = [...prevFiles];
          newFiles[index] = { ...newFiles[index], wavesurfer };
          return newFiles;
        });
      }
    });
  }, [audioFiles]);

  const handleFileChange = e => {
    const files = Array.from(e.target.files).map(file => {
      // Zamiana kropki na myślnik, aby ID było kompatybilne z selektorem CSS
      const uniqueId = (Date.now() + Math.random()).toString().replace('.', '-');
      return {
        id: uniqueId,
        audioSrc: URL.createObjectURL(file),
        name: file.name,
        isPlaying: false,
      };
    });

    setAudioFiles(prevFiles => [...prevFiles, ...files]);
  };

  const togglePlayback = (index) => {
    setCurrentFileIndex(index);
    const file = audioFiles[index];
    if (file.wavesurfer) {
      if (currentFileIndex === index) {
        if (file.wavesurfer.isPlaying()) {
        setIsPlaying(false);
        file.wavesurfer.pause();
        } else {
        setIsPlaying(true);
        file.wavesurfer.play();
        }
      }
      else{
        if (currentFileIndex !== null) {
          audioFiles[currentFileIndex].wavesurfer.stop();
        }
        setCurrentFileIndex(index);
        file.wavesurfer.play();
        setIsPlaying(true);
      }
    }
  };

  const deleteFile = (index) => {
    const file = audioFiles[index];
    if (file && file.wavesurfer) {
      file.wavesurfer.destroy();
    }
    
    // Usuń plik z listy
    setAudioFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
    // Jeśli usunięty plik był aktualnie odtwarzanym plikiem, zresetuj odtwarzacz
    if (currentFileIndex === index) {
      setCurrentFileIndex(null);
      setIsPlaying(false);
    }
    // Jeśli usunięty plik miał niższy indeks niż aktualnie odtwarzany,
    // to zmniejsz aktualny indeks o jeden, żeby odzwierciedlić nowy stan tablicy
    else if (index < currentFileIndex) {
      setCurrentFileIndex(currentFileIndex - 1);
    }
  };

  return (
    <ul className='nav nav-pills flex-column mb-auto'>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="uploadInput"
        multiple
      />
      <li className='nav-item'>
        <motion.label className='nav-link bg-primary text-white m-2' htmlFor="uploadInput" whileTap={{ scale: 0.95 }}>
          <i className="bi bi-upload me-2"></i>
          Upload
        </motion.label>
      </li>
      <div style={{ maxHeight: '85vh' }} className='mt-2 rounded-2 overflow-y-auto scrollable-sidebar'>
        {audioFiles.map((file, index) => (
          <motion.li key={index}
            initial='hidden'
            animate='visible'
            variants={showSound}
            className='nav-item'>
            <div className='nav-link bg-primary text-white m-1 py-1 px-0'>
              <div className="d-flex align-items-center justify-content-between p-2" >
                <motion.div className=' d-inline-flex' whileTap={{ scale: 0.8 }}>
                  <i className={`bi ${currentFileIndex === index && isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}
                    onClick={() => togglePlayback(index)} />
                </motion.div>
                <div id={`waveform-container-${file.id}`} className='flex-grow-1 mx-1 waveform' ></div>
                <motion.div className=' d-inline-flex' whileTap={{ scale: 0.8 }}>
                  <i className={`bi text-danger rounded-1 bi-trash-fill`} onClick={() => deleteFile(index)} />
                </motion.div>
              </div>
            </div>
          </motion.li>
        ))}
      </div>
    </ul>
  );
}
export default SoundLib;