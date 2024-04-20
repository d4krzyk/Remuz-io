import React, { useEffect, useState, useRef } from 'react';
import Multitrack from './multitrack-module/multitrack.tsx';
import './multitrack-module/multitrack.css'
import ToolsStore from './ToolsStore.jsx';
import { useDrop } from 'react-dnd';
import NavStore from '../NavigationStore.jsx';
import { Modal, Button } from 'react-bootstrap';
import VolumeMeterStore from '../VolumeMeterStore.jsx';


const MultiTrackPlayer = () => {
  const [showTrashModal, setShowTrashModal] = useState(false);



  const handleTrashCloseNo = () => { setShowTrashModal(false); };
  const handleTrashShow = () => setShowTrashModal(true);
  const handleTrashCloseYes = () => {
    setShowTrashModal(false);
    multitrackInstance.removeTrack(selectedTrackId);
    setTimeMultiTrack(0);
    multitrackInstance.stop();
    initRef.current = false;
  };


  const handleDelFragOption = () => {
    console.log('Usunięto fragment');
    console.log(selectedTrackId, layerAudioSrc[selectedTrackId], selectedTrackPosition, layerName[selectedTrackId]);
    multitrackInstance.stop();
    multitrackInstance.addTrack({
      id: selectedTrackId,
      url: layerAudioSrc[selectedTrackId],
      startPosition: selectedTrackPosition,
      draggable: false,
      options: {
        waveColor: `hsl(25, 47%, 69%)`,
        progressColor: `hsl(25, 47%, 40%)`,
      },
      intro: {
        label: layerName[selectedTrackId] + ' - fragment usunięty',
      },
      envelope: [],
      markers: [DeleteMarkerParams]
    });
  }

  
  const initRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const {TimeMultiTrack, setTimeMultiTrack } = NavStore();
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [selectedTrackPosition, setSelectedTrackPosition] = useState(null);
  const DeleteMarkerParams = {
    time: 0,
    label: 'Region',
    color: 'hsla(345, 50%, 30%, 0.7)',
  }
  
  //const [layerAudio, setLayerAudio] = useState([]);
  const [CurrentLayer, setCurrentLayer] = useState([]);
  const [multitrackInstance, setMultitrackInstance] = useState(null); // przechowujemy instancję multitrack
  const isTrashOption = ToolsStore(state => state.isTrashOption);
  const isDelFragOption = ToolsStore(state => state.isDelFragOption);
  const [layerAudioSrc, setLayerAudioSrc] = useState({});
  const [layerDurations, setLayerDurations] = useState({});
  const [layerName, setLayerName] = useState({});

  //console.log(isTrashOption);
  // Funkcja, która zostanie wywołana po kliknięciu na track

  function handleTrackClick(id, multitrack) {
    //console.log(TimeMultiTrack);
    console.log('Kliknięto na track o id: ' + id);
    setSelectedTrackId(id);
    if (isTrashOption) {
      handleTrashShow();
    }
    if(isDelFragOption){
      handleDelFragOption();
    }

  }
  //console.log('Opcja usuniecia main: ' + trashOption);
  const [, drop] = useDrop(() => ({
    accept: 'sound',
    drop: (item, monitor) => {
      //await setLayerAudio(item);
      //console.log(item);

      //Zapisanie czasu trwania audio do mapy
      
      const hue = Math.floor(Math.random() * 360);
      if (multitrackInstance) { // jeśli instancja multitrack jest dostępna, dodajemy ścieżkę
        
        const newLayerAudioSrc = {...layerAudioSrc, [CurrentLayer]: item.src};
        setLayerAudioSrc(newLayerAudioSrc);
        const newLayerName = {...layerName, [CurrentLayer]: item.name};
        setLayerName(newLayerName);
        const newLayerDurations = {...layerDurations, [CurrentLayer]: item.duration - 1};
        setLayerDurations(newLayerDurations);
        console.log('Dodano ścieżkę: ', layerAudioSrc[CurrentLayer] );
        multitrackInstance.addTrack({
          id: CurrentLayer,
          url: newLayerAudioSrc[CurrentLayer],
          startPosition: 0,
          draggable: true,
          options: {
            waveColor: `hsl(${hue}, 47%, 69%)`,
            progressColor: `hsl(${hue}, 47%, 40%)`,
          },
          intro: {
            label: newLayerName[CurrentLayer],
          },
          envelope: [
            { time: 0, volume: 1 },
            { time: newLayerDurations[CurrentLayer], volume: 1 },
          ],
          //markers: [DeleteMarkerParams]
        });
        

      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [multitrackInstance, CurrentLayer]);



  useEffect(() => {
    if (initRef.current === true) { return }
    initRef.current = true;

    // Call Multitrack.create to initialize a multitrack mixer
    // Pass a tracks array and WaveSurfer options with a container element
    const multitrack = Multitrack.create(
      [
        {
          id: 0,
          startPosition: 0,
        },
        {
          id: 1,
          startPosition: 0,
        },
        {
          id: 2,
          startPosition: 0,
        },
        {
          id: 3,
          startPosition: 0,
        },
        {
          id: 4,
          startPosition: 0,
        },
        {
          id: 5,
          startPosition: 0,
        },
        {
          id: 6,
          startPosition: 0,
        },
        {
          id: 7,
          startPosition: 0,
        },
        {
          id: 8,
          startPosition: 0,
        },
        {
          id: 9,
          startPosition: 0,
        },
      ],
      {
        container: document.querySelector('#container-multitrack'), // required!
        minPxPerSec: 50, // zoom level
        rightButtonDrag: false, // set to true to drag with right mouse button
        cursorWidth: 4,
        cursorColor: '#6c75f0',
        trackBackground: '#3d3c66',
        trackBorderColor: '#424569',
        dragBounds: true,
        envelopeOptions: {
          lineColor: 'rgba(255, 0, 0, 0.7)',
          lineWidth: 3,
          dragPointSize: window.innerWidth < 600 ? 20 : 10,
          dragPointFill: 'rgba(255, 255, 255, 0.8)',
          dragPointStroke: 'rgba(255, 255, 255, 0.3)',
        },
        timelineOptions: {
          height: 20,
        },
      },
    )
    setMultitrackInstance(multitrack); // zapisujemy instancję multitrack w stanie


    // Events
    multitrack.on('start-position-change', ({ id, startPosition }) => {
      setSelectedTrackPosition(startPosition);
      console.log(`Track ${id} start position updated to ${startPosition}`)
    })

    multitrack.on('start-cue-change', ({ id, startCue }) => {
      console.log(`Track ${id} start cue updated to ${startCue}`)
    })

    multitrack.on('end-cue-change', ({ id, endCue }) => {
      console.log(`Track ${id} end cue updated to ${endCue}`)
    })

    multitrack.on('volume-change', ({ id, volume }) => {
      console.log(`Track ${id} volume updated to ${volume}`)
    })

    multitrack.on('fade-in-change', ({ id, fadeInEnd }) => {
      console.log(`Track ${id} fade-in updated to ${fadeInEnd}`)
    })

    multitrack.on('fade-out-change', ({ id, fadeOutStart }) => {
      console.log(`Track ${id} fade-out updated to ${fadeOutStart}`)
    })

    multitrack.on('intro-end-change', ({ id, endTime }) => {
      console.log(`Track ${id} intro end updated to ${endTime}`)
    })

    multitrack.on('envelope-points-change', ({ id, points }) => {
      console.log(`Track ${id} envelope points updated to`, points)
    })


    let intervalTime = setInterval(() => {
      setTimeMultiTrack(multitrack.currentTime);
    }, 10);

    multitrack.on('drop', async ({ id }) => {

      setCurrentLayer(id);

    })





    // Play/pause button
    const button_start_pause = document.querySelector('#play-music-button')

    multitrack.once('canplay', () => {
      button_start_pause.onclick = async () => {
        if (multitrack.isPlaying()) {
          multitrack.pause();
        } else {
          try {
            await multitrack.play();
          } catch (error) {
            console.error("Error playing audio: ", error);
          }
        }
      }
    })

    // Stop button
    const button_stop = document.querySelector('#stop-music-button')

    multitrack.once('canplay', () => {
      button_stop.onclick = () => {
        multitrack.stop();
      }
    })

    // Repeat button
    //const button_repeat = document.querySelector('#repeat-music-button')

    const slider = document.getElementById('ZoomRange');
    if (slider) {
      slider.oninput = (e) => {
        multitrack.zoom(e.target.valueAsNumber);
      }
    }

    multitrack.once('decode', () => {
      
    })
    // Zoom



    // Destroy all wavesurfer instances on unmount
    // This should be called before calling initMultiTrack again to properly clean up
    window.onbeforeunload = () => {
      clearInterval(intervalTime);
      setTimeMultiTrack(0);
      multitrack.destroy()
    }

    // Set sinkId
    multitrack.once('canplay', async () => {
      await multitrack.setSinkId('')

      console.log('Set sinkId to default')
    })


  }, [ multitrackInstance]);


  useEffect(() => {


    // Pobierz wszystkie elementy ścieżek
    let tracks = document.querySelectorAll('.track');

    function selectIndex(event) {
      // Wywołaj funkcję z id klikniętego tracka
      const id = event.currentTarget.getAttribute('track-id');
      handleTrackClick(id, multitrackInstance);
    }

    tracks.forEach((track) => {
      track.addEventListener('click', selectIndex);
    });
    return () => {
      tracks.forEach((track) => {
        track.removeEventListener('click', selectIndex);
      });
    }



  }, [isTrashOption,isDelFragOption, layerAudioSrc, selectedTrackId, layerDurations, layerName, multitrackInstance, selectedTrackPosition]);



  return (
    <>
      <div className='w-100'>
        <div ref={drop} id="container-multitrack" />
      </div>


      <Modal show={showTrashModal} onHide={handleTrashCloseNo}>
        <Modal.Header closeButton>
          <Modal.Title>Usunięcie ścieżki</Modal.Title>
        </Modal.Header>
        <Modal.Body>Czy na pewno chcesz usunąć tę ścieżkę?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTrashCloseNo}>
            Nie
          </Button>
          <Button variant="primary" onClick={() => {handleTrashCloseYes()}}>
            Tak
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default MultiTrackPlayer;