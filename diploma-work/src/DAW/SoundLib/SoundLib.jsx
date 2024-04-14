import { React, useState, useEffect } from 'react';
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
  const [currentFileID, setCurrentFileID] = useState(null); // Indeks aktualnie odtwarzanego pliku
  const [isPlaying, setIsPlaying] = useState(false); // Stan odtwarzania
  const [sounds, setSounds] = useState([]); // Lista dźwięków

  useEffect(() => {
    sounds.forEach((sound) => {
      if (!sound.wavesurfer) {
        const wavesurfer = WaveSurfer.create({
          container: `#waveform-container-${sound.id}`,
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
        wavesurfer.load(sound.audioSrc).then(() => { console.log("Sound " + sound.name + " loaded" ) })
        .catch(() => { console.log("Sound" + sound.name + "not loaded" )});

        wavesurfer.on('finish', () => {
          wavesurfer.stop(); // zatrzymuje i resetuje na początek
          setCurrentFileID(null); // resetuje obecnie odtwarzany indeks
          setIsPlaying(false); // ustawia stan odtwarzania na false
        });

        setSounds(prevSounds => prevSounds.map(s =>
          s.id === sound.id ? { ...s, wavesurfer: wavesurfer } : s
        ));
      }
  // Funkcja czyszcząca
  return () => {
    sounds.forEach((sound) => {
      sound.wavesurfer && sound.wavesurfer.destroy();
    });
  };
  
    });
  }, [sounds]);

  const addSounds = (newFiles) => {
    // Tworzenie tablicy nowych dźwięków
    const newSounds = newFiles.map(file => ({
      id: (Date.now() + Math.random()).toString().replace('.', '-'),
      name: file.name,
      audioSrc: URL.createObjectURL(file),
      isPlaying: false,
    }));

    // Aktualizacja stanu
    setSounds(prevSounds => [...prevSounds, ...newSounds]);
  };
  const removeSound = (idToRemove) => {
    //Usuwanie wybranego dźwięku po ID
    const soundToRemove = sounds.find(sound => sound.id === idToRemove);
    if (soundToRemove && soundToRemove.wavesurfer) {
      soundToRemove.wavesurfer.destroy();
    }
    setSounds(sounds.filter(sound => sound.id !== idToRemove));
  };

  const togglePlayback = (id) => {
    // Znajdywanie dźwięku na podstawie jego id
    const file = sounds.find(sound => sound.id === id);

    // Sprawdzanie czy dźwięk został znaleziony
    if (!file || !file.wavesurfer) {
      console.log('Nie znaleziono wybranego dźwięku')
      return;
    }

    //Zatrzymanie odtwarzania
    if (file.wavesurfer.isPlaying()) {
      file.wavesurfer.pause();
      setIsPlaying(false);
    } else {
      // Zastpowoanie wszystkich innych dźwięków przed odtworzeniem nowego
      sounds.forEach(sound => {
        if (sound.id !== id && sound.wavesurfer) {
          sound.wavesurfer.stop();
        }
      });
      //Włączenie odtwarzania wybranego dźwięku
      file.wavesurfer.play();
      setCurrentFileID(id); // Uaktualnij stan aktualnie odtwarzanego ID
      setIsPlaying(true);
    }
  };

  const CheckAndAddSound = (files ) => {
    const allowedTypes = ['audio/mpeg', 'audio/wav'];
    const filteredFiles = files.filter(file => allowedTypes.includes(file.type));
    addSounds(filteredFiles);
  }
  return (
    <ul className='nav nav-pills flex-column mb-auto'>
      <input
        type="file"
        accept="audio/mpeg, audio/wav"
        onChange={(e) => {
          const files = Array.from(e.target.files);
          CheckAndAddSound(files)
        }}
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
        {sounds.map(sound => (
          <motion.li key={sound.id}
            initial='hidden'
            animate='visible'
            variants={showSound}
            className='nav-item'>
            <div className='nav-link bg-primary text-white m-1 py-1 px-0'>
              <div className="d-flex align-items-center justify-content-between p-2" >
                <motion.div className=' d-inline-flex' whileTap={{ scale: 0.8 }}>
                  <i className={`bi ${currentFileID === sound.id && isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}
                    onClick={() => togglePlayback(sound.id)} />
                </motion.div>
                <div id={`waveform-container-${sound.id}`} className='flex-grow-1 mx-1 waveform' ></div>
                <motion.div className=' d-inline-flex' whileTap={{ scale: 0.8 }}>
                  <i className={`bi text-danger rounded-1 bi-trash-fill`} onClick={() => removeSound(sound.id)} />
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