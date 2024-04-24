import React, { useEffect, useState, useRef } from 'react';
import Multitrack from './multitrack-module/multitrack.tsx';
import './multitrack-module/multitrack.css'
import { ToolsStore } from './ToolsStore.tsx';
import { useDrop } from 'react-dnd';
import NavStore from '../NavigationStore.jsx';
import { Modal, Button } from 'react-bootstrap';
import VolumeMeterStore from '../VolumeMeterStore.jsx';


const MultiTrackPlayer = () => {
  const [showTrashModal, setShowTrashModal] = useState(false);
  const TrashButtonRef = useRef();
  const idTempRef = useRef();
  const handleTrashCloseNo = () => { setShowTrashModal(false) };
  const handleTrashShow = () => { setShowTrashModal(true) };
  const handleTrashCloseYes = (id) => {
    setShowTrashModal(false);
    console.log('Usunięto ścieżkę o id: ' + id);
    multitrackInstance.removeTrack(id);
    setTimeMultiTrack(0);
    multitrackInstance.stop();
    //initRef.current = false;
  };

  const handleEditFragConfirm = (id, option) => {

    let colorOption = '';
    let labelOption = '';
    if (option === 'delete') {
      colorOption = 'hsla(345, 50%, 30%, 0.7)'
      labelOption = 'X Region X';
    } else if (option === 'mute') {
      colorOption = 'hsla(125, 30%, 20%, 0.7)'
      labelOption = '_ Region _';
    }
    if (multitrackInstance.tracks[id]?.url) {
      multitrackInstance.addTrack({
        id: multitrackInstance.tracks[id].id,
        url: multitrackInstance.tracks[id].url,
        startPosition: multitrackInstance.tracks[id].startPosition,
        draggable: false,
        options: {
          waveColor: multitrackInstance.tracks[id].options.waveColor,
          progressColor: multitrackInstance.tracks[id].options.progressColor,
        },
        intro: {
          label: multitrackInstance.tracks[id]?.intro?.label || '',
          endTime: 0,
        },
        markers: [{
          time: multitrackInstance.tracks[id]?.markers?.time || layerMarkerStart[id] || 0,
          label: labelOption,
          color: colorOption,
          end: multitrackInstance.tracks[id]?.markers?.end || layerMarkerEnd[id] || 2
        }]
      });
      setTimeMultiTrack(0);
      multitrackInstance.stop();

      if (option === 'mute') {
        multitrackInstance.EditSegment(multitrackInstance.tracks[id].id,
          layerMarkerStart[id], layerMarkerEnd[id], 'mute');
      }
      else if (option === 'delete') {
        multitrackInstance.EditSegment(multitrackInstance.tracks[id].id,
          layerMarkerStart[id], layerMarkerEnd[id], 'delete');
      }
    }
    multitrackInstance.hideLoadingScreen(multitrackInstance.tracks[id].id.toString());

  };
  

  
  const initRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const {TimeMultiTrack, setTimeMultiTrack } = NavStore();
  const DeleteMarkerParams = {
    time: 0,
    label: 'Region',
    color: 'hsla(345, 50%, 30%, 0.7)',
  }
  
  //const [layerAudio, setLayerAudio] = useState([]);
  const [CurrentLayerID, setCurrentLayerID] = useState([]);
  const [multitrackInstance, setMultitrackInstance] = useState(null); // przechowujemy instancję multitrack
  const isTrashOption = ToolsStore(state => state.isTrashOption);
  const isDelFragOption = ToolsStore(state => state.isDelFragOption);
  const isMuteFragOption = ToolsStore(state => state.isMuteFragOption);
  const [layerEnvelope, setLayerEnvelope] = useState({});
  const [layerMarkerStart, setLayerMarkerStart] = useState({});
  const [layerMarkerEnd, setLayerMarkerEnd] = useState({});


  //console.log(isTrashOption);
  // Funkcja, która zostanie wywołana po kliknięciu na track



  
  //console.log('Opcja usuniecia main: ' + trashOption);
  const [, drop] = useDrop(() => ({
    accept: 'sound',
    drop: (item, monitor) => {
      //await setLayerAudio(item);
      //console.log(item);

      //Zapisanie czasu trwania audio do mapy
      
      const hue = Math.floor(Math.random() * 360);
      if (multitrackInstance) { // jeśli instancja multitrack jest dostępna, dodajemy ścieżkę
        

        console.log('Dodano ścieżkę: ', item.name, ' o dlugosci ', item.duration );
        
        multitrackInstance.addTrack({
          id: CurrentLayerID,
          url: item.src,
          startPosition: 0,
          draggable: true,
          options: {
            waveColor: `hsl(${hue}, 47%, 69%)`,
            progressColor: `hsl(${hue}, 47%, 40%)`,
          },
          intro: {
            label: item.name,
          },
          envelope: [
            { time: 0, volume: 1 },
            { time: item.duration - 0.001, volume: 1 },
          ],
          //markers: [DeleteMarkerParams]
        });
        multitrackInstance.hideLoadingScreen(CurrentLayerID.toString());

      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [multitrackInstance, CurrentLayerID]);



  useEffect(() => {
    

    if(!multitrackInstance){
      if (initRef.current === true) { return }
      initRef.current = true;
    const temp_containerHTML = document.querySelector('#container-multitrack');
    // Call Multitrack.create to initialize a multitrack mixer
    // Pass a tracks array and WaveSurfer options with a container element
    setMultitrackInstance(Multitrack.create(
    [
      {id: 0,startPosition: 0,},{id: 1,startPosition: 0,},
      {id: 2,startPosition: 0,},{id: 3,startPosition: 0,},
      {id: 4,startPosition: 0,},{id: 5,startPosition: 0,},
      {id: 6,startPosition: 0,},{id: 7,startPosition: 0,},
      {id: 8,startPosition: 0,},{id: 9,startPosition: 0,},
    ],
    {
      container: temp_containerHTML, // required!
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
  ));
  }
  else{


    // Events
    multitrackInstance.on('start-position-change', ({ id, startPosition }) => {
      console.log(`Track ${id} start position updated to ${startPosition}`)
    })

    multitrackInstance.on('start-cue-change', ({ id, startCue }) => {
      console.log(`Track ${id} start cue updated to ${startCue}`)
    })

    multitrackInstance.on('end-cue-change', ({ id, endCue }) => {
      console.log(`Track ${id} end cue updated to ${endCue}`)
    })

    multitrackInstance.on('volume-change', ({ id, volume }) => {
      console.log(`Track ${id} volume updated to ${volume}`)
    })

    multitrackInstance.on('fade-in-change', ({ id, fadeInEnd }) => {
      console.log(`Track ${id} fade-in updated to ${fadeInEnd}`)
    })

    multitrackInstance.on('fade-out-change', ({ id, fadeOutStart }) => {
      console.log(`Track ${id} fade-out updated to ${fadeOutStart}`)
    })

    multitrackInstance.on('intro-end-change', ({ id, endTime }) => {
      console.log(`Track ${id} intro end updated to ${endTime}`)
    })

    multitrackInstance.on('marker-change', ({ id, startMarker, endMarker }) => {
      const newLayerMarkerStart = { ...layerMarkerStart, [id]: startMarker };
      setLayerMarkerStart(newLayerMarkerStart);
      const newLayerMarkerEnd = { ...layerMarkerEnd, [id]: endMarker };
      setLayerMarkerEnd(newLayerMarkerEnd);
      console.log(`Track ${id} marker start and end updated to ${layerMarkerStart[id]} ${layerMarkerEnd[id]}`)
    })
    
    multitrackInstance.on('envelope-points-change', ({ id, points }) => {
      multitrackInstance.tracks[id].envelope = points;
      console.log(`Track ${id} envelope points updated to`, points)
    })
    //setMultitrackInstance(multitrack); // zapisujemy instancję multitrack w stanie

    let intervalTime = setInterval(() => {
      setTimeMultiTrack(multitrackInstance.currentTime);
    }, 10);

    multitrackInstance.on('drop', async ({ id }) => {

      setCurrentLayerID(id);

    })





    // Play/pause button
    const button_start_pause = document.querySelector('#play-music-button')

    multitrackInstance.once('canplay', () => {
      button_start_pause.onclick = async () => {
        if (multitrackInstance.isPlaying()) {
          multitrackInstance.pause();
        } else {
          try {
            await multitrackInstance.play();
          } catch (error) {
            console.error("Error playing audio: ", error);
          }
        }
      }
    })

    // Stop button
    const button_stop = document.querySelector('#stop-music-button')

    multitrackInstance.once('canplay', () => {
      button_stop.onclick = () => {
        multitrackInstance.stop();
      }
    })

    // Repeat button
    //const button_repeat = document.querySelector('#repeat-music-button')

    const slider = document.getElementById('ZoomRange');
    if (slider) {
      slider.oninput = (e) => {
        multitrackInstance.zoom(e.target.valueAsNumber);
      }
    }

    multitrackInstance.once('decode', () => {
      
    })
    // Zoom



    // Destroy all wavesurfer instances on unmount
    // This should be called before calling initMultiTrack again to properly clean up
    window.onbeforeunload = () => {
      clearInterval(intervalTime);
      setTimeMultiTrack(0);
      multitrackInstance.destroy()
    }

    // Set sinkId
    multitrackInstance.once('canplay', async () => {
      await multitrackInstance.setSinkId('')

      console.log('Set sinkId to default')
    })

    console.log('Multitrack instance created', multitrackInstance);
    }

  }, [ multitrackInstance, CurrentLayerID, setTimeMultiTrack, layerMarkerStart, layerMarkerEnd, layerEnvelope]);


  useEffect(() => {

    //console.log('Zmiana stanu w multitracku: ' + multitrackInstance);
    // Pobierz wszystkie elementy ścieżek
    let tracks = document.querySelectorAll('.track');
    if (TrashButtonRef.current) {
      TrashButtonRef.current.onclick = () => {
        console.log('Kliknięto na przycisk usunięcia')
        handleTrashCloseYes(idTempRef.current);
      };
    }
    function selectIndex(event) {

      const id = event.currentTarget.getAttribute('track-id');
      console.log('Kliknięto na track o id: ' + id);
      idTempRef.current = id;
      if (isDelFragOption) {
        handleEditFragOption(id, 'delete');
      }
      if (isMuteFragOption) {
        handleEditFragOption(id, 'mute');
      }
      if (isTrashOption) {
        handleTrashShow();

      }
    }
    function confirmIndex(event) {
      const id = event.currentTarget.getAttribute('track-id');
      console.log('Potwierdzenie na track o id: ' + id);
      event.preventDefault()
      if (isDelFragOption) {
        handleEditFragConfirm(id, 'delete');
      }
      if (isMuteFragOption) {
        handleEditFragConfirm(id, 'mute');
      }
      
    }
    tracks.forEach((track) => {
      track.addEventListener('click', selectIndex);
      track.addEventListener('contextmenu', confirmIndex);
    });
    return () => {
      tracks.forEach((track) => {
        track.removeEventListener('click', selectIndex);
        track.removeEventListener('contextmenu', confirmIndex);
      });
    }

    function handleEditFragOption(id, option) {
      console.log('Wybieram fragment do edycji');
      let colorOption = '';
      let labelOption = '';
      if (option === 'delete') {
        colorOption = 'hsla(345, 50%, 30%, 0.7)'
        labelOption = 'X Region X';
      } else if (option === 'mute') {
        colorOption = 'hsla(125, 30%, 20%, 0.7)'
        labelOption = '_ Region _';
        console.log("dziala")
      }
      multitrackInstance.stop();
      if (multitrackInstance.tracks[id]?.url) {

        const newLayerEnvelope = { ...layerEnvelope, [id]: multitrackInstance.tracks[id].envelope };
        setLayerEnvelope(newLayerEnvelope);
        multitrackInstance.addTrack({
          id: multitrackInstance.tracks[id].id,
          url: multitrackInstance.tracks[id].url,
          startPosition: multitrackInstance.tracks[id]?.startPosition || 0,
          draggable: false,
          options: {
            waveColor: multitrackInstance.tracks[id].options.waveColor,
            progressColor: multitrackInstance.tracks[id].options.progressColor,
          },
          intro: {
            label: multitrackInstance.tracks[id]?.intro?.label || '',
            endTime: 0,
          },
          markers: [{
            time: multitrackInstance.tracks[id]?.markers?.time || layerMarkerStart[id] || 0,
            label: labelOption,
            color: colorOption,
            end: multitrackInstance.tracks[id]?.markers?.end || layerMarkerEnd[id] || 2
          }]
        })

        //console.log("volume automation: ",newLayerEnvelope[id]);
      }

    }



  }, [ isTrashOption,isDelFragOption, showTrashModal, isMuteFragOption, multitrackInstance, layerEnvelope, setLayerEnvelope, layerMarkerStart, layerMarkerEnd]);



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
          <Button ref={TrashButtonRef} variant="primary">
            Tak
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default MultiTrackPlayer;