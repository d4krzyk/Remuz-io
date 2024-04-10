import { React, useState, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import WaveSurfer from 'wavesurfer.js';
import { motion } from 'framer-motion';
function SoundLib() {

  const [audioFiles, setAudioFiles] = useState([]); // Lista plików audio
  const [currentFileIndex, setCurrentFileIndex] = useState(null); // Indeks aktualnie odtwarzanego pliku
  const [isPlaying, setIsPlaying] = useState(false); // Stan odtwarzania
  const sound = useRef(null);
  const wavesurferRef = useRef(null);

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
          interact: false,
        });
        wavesurfer.load(file.audioSrc);


        // Aktualizacja stanu z nową instancją WaveSurfer
        setAudioFiles(prevFiles => {
          const newFiles = [...prevFiles];
          newFiles[index] = { ...newFiles[index], wavesurfer };
          return newFiles;
        });
      }
    });
  }, [audioFiles]);

  useEffect(() => {
    const currentAudioSrc = audioFiles[currentFileIndex]?.audioSrc;
    if (!currentAudioSrc) return;

    sound.current = new Howl({
      src: [currentAudioSrc],
      format: ["mp3", "wav"],
      onplay: () => {
        wavesurferRef.current.play();
      },
      onpause: () => {
        wavesurferRef.current.pause();
      },
      onstop: () => {
        wavesurferRef.current.stop();
      },
      onend: () => {
        wavesurferRef.current.stop();
      },
      onload: () => {
        // Tutaj już powinieneś mieć pewność, że sound.current istnieje
        wavesurferRef.current.on('ready', () => {
          wavesurferRef.current.setVolume(0);
        });
      },
          // Rozważ dodanie obsługi błędów
      onloaderror: (id, err) => {
        console.log('Wystąpił błąd podczas ładowania Howl:', err);
      },
      onplayerror: (id, err) => {
        console.log('Wystąpił błąd podczas odtwarzania Howl:', err);
      }
    });
  }, [audioFiles, currentFileIndex]);

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
      if (file.wavesurfer.isPlaying()) {
        setIsPlaying(false);
        file.wavesurfer.pause();
      } else {
        setIsPlaying(true);
        file.wavesurfer.play();
      }
    }
  };


  const deleteFile = (index) => {
    const file = audioFiles[index];
    file.wavesurfer && file.wavesurfer.destroy();

    setAudioFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <ul className='nav nav-pills flex-column mb-auto'>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="uploadInput"
      />
      <li className='nav-item'>
        <motion.label className='nav-link bg-primary text-white m-2' htmlFor="uploadInput" whileTap={{ scale: 0.95 }}>
          <i className="bi bi-upload me-2"></i>
          Upload
        </motion.label>
      </li>
      {audioFiles.map((file, index) => (
        <li key={index} className='nav-item'>
          <div className='nav-link bg-primary text-white m-1 py-1 px-0'>
            <div className="d-flex align-items-center justify-content-between p-2" >
              <i className={`bi ${currentFileIndex === index && isPlaying ? "bi-pause-fill" : "bi-play-fill"}`} onClick={() => togglePlayback(index)}></i>
              <div id={`waveform-container-${file.id}`} className='flex-grow-1 mx-1 waveform' ></div>
              <i className={`bi text-danger rounded-1 bi-trash-fill`} onClick={() => deleteFile(index)}></i>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default SoundLib;