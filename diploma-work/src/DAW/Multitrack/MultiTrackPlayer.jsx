import { useEffect, useState, useRef } from 'react';
import Multitrack from './multitrack-module/multitrack.tsx';
import './multitrack-module/multitrack.css'
import { ToolsStore } from './ToolsStore.tsx';
import { useDrop } from 'react-dnd';
import NavStore from '../NavigationStore.tsx';
import { Modal, Button, Form } from 'react-bootstrap';


const MultiTrackPlayer = () => {

  const [CurrentLayerID, setCurrentLayerID] = useState([]);
  const [multitrackInstance, setMultitrackInstance] = useState(null); // przechowujemy instancję multitrack
  
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [showTrackNameModal, setShowTrackNameModal] = useState(false);
  const [showSpeedModal, setShowSpeedModal] = useState(false);

  const [trackName, setTrackName] = useState('');
  const [SpeedPerc, setSpeedPerc] = useState(100);

  const [hasTrackBeenSelected, setHasTrackBeenSelected] = useState(false);
  const isSelectOption = ToolsStore(state => state.isSelectOption);
  const isCutFragOption = ToolsStore(state => state.isCutFragOption);
  const isDelFragOption = ToolsStore(state => state.isDelFragOption);
  const isMuteFragOption = ToolsStore(state => state.isMuteFragOption);
  const isTrashOption = ToolsStore(state => state.isTrashOption);
  const isSpeedOption = ToolsStore(state => state.isSpeedOption);
  const isReverseOption = ToolsStore(state => state.isReverseOption);
  const isTextFormatOption = ToolsStore(state => state.isTextFormatOption);

  const [layerMarkerStart, setLayerMarkerStart] = useState({});
  const [layerMarkerEnd, setLayerMarkerEnd] = useState({});

  const [layerEnvelope, setLayerEnvelope] = useState({});

  const {renderAudioWAV, setRenderAudioWAV} = NavStore();
  const {renderAudioMP3, setRenderAudioMP3} = NavStore();
  const {ProjectName, bitrate, setTimeMultiTrack} = NavStore();
  const setIsPlaying = NavStore(state => state.setIsPlaying);

  const initRef = useRef(false);
  const idTempRef = useRef();

  const TrashButtonRef = useRef();

  const trackNameRef = useRef('');
  const SaveTextButtonRef = useRef();

  const AcceptSpeedChangeRef = useRef();


  const handleTrashCloseNo = () => { setShowTrashModal(false) };
  const handleTrashShow = () => { setShowTrashModal(true) };


  const handleSpeedChange = (event) => {
    setSpeedPerc(parseFloat(event.target.value));
  };

  const handleChangeTextTrack = (id) => {

    trackNameRef.current = multitrackInstance.tracks[id].intro.label;
    setTrackName(trackNameRef.current);
    //setTrackName(currentTrackName);
    setShowTrackNameModal(true);
  }
  const handleTrackNameChange = (event) => {
    if(event.target.value.length !== ''){
      setTrackName(event.target.value);
    }
    else{
      setTrackName('Track Name');
    }
    trackNameRef.current = event.target.value;

    //setTrackName(event.target.value);
  };
  const handleTrackNameSubmit = (id) => {
    // Aktualizuj nazwę tracka
    //const name = trackNameRef.current.toString();
    const name = trackName.toString();
    console.log(multitrackInstance.audios[id].duration)
    console.log(name)
    multitrackInstance.addTrack({
      id: multitrackInstance.tracks[id].id,
      url: multitrackInstance.tracks[id].url,
      draggable: true,
      volume: multitrackInstance.tracks[id].volume,
      startPosition: multitrackInstance.tracks[id].startPosition,
      options: {
        waveColor: multitrackInstance.tracks[id].options.waveColor,
        progressColor: multitrackInstance.tracks[id].options.progressColor,
      },
      intro: {
        label: name || '',
        endTime: 0,
      },
      envelope: multitrackInstance.tracks[id].envelope,
    });
    setTimeMultiTrack(0);
    
    multitrackInstance.stop();
    setIsPlaying(multitrackInstance.isPlaying());

    setShowTrackNameModal(false);
  };

  const handleTrackSelect = (id) => {
    // Aktualizuj nazwę tracka
    if (!hasTrackBeenSelected) {
      console.log(hasTrackBeenSelected)
    multitrackInstance.addTrack({
      id: multitrackInstance.tracks[id].id,
      url: multitrackInstance.tracks[id].url,
      draggable: true,
      volume: multitrackInstance.tracks[id].volume,
      startPosition: multitrackInstance.tracks[id].startPosition,
      options: {
        waveColor: multitrackInstance.tracks[id].options.waveColor,
        progressColor: multitrackInstance.tracks[id].options.progressColor,
      },
      intro: {
        label: multitrackInstance.tracks[id].intro.label || '',
        endTime: 0,
      },
      envelope: multitrackInstance.tracks[id].envelope || [
        { time: 0, volume: 1 },
        { time: multitrackInstance.audios[id].duration - 0.001, volume: 1 },
      ],
    });
    setTimeMultiTrack(0);
    //multitrackInstance.stop();
    setIsPlaying(multitrackInstance.isPlaying());
    setHasTrackBeenSelected(true);
    }
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
    } else if (option === 'cut') {
      colorOption = 'hsla(85, 5%, 35%, 0.7)'
      labelOption = '< Region >';
    } else if (option === 'reverse') {
      colorOption = 'hsla(45, 45%, 35%, 0.7)'
      labelOption = '< Reverse <';
    } else if (option === 'speed') {
      colorOption = 'hsla(105, 5%, 65%, 0.7)'
      labelOption = '>> Speed >>';
    }
    if (multitrackInstance.tracks[id]?.url) {
      multitrackInstance.addTrack({
        id: multitrackInstance.tracks[id].id,
        url: multitrackInstance.tracks[id].url,
        volume: multitrackInstance.tracks[id].volume,
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


      
      try {
        if(option === 'speed'){

          console.log(SpeedPerc) 
          const speedFactor = SpeedPerc / 100;
          console.log(speedFactor)
          multitrackInstance.EditSegment(multitrackInstance.tracks[id].id,layerMarkerStart[id], layerMarkerEnd[id], speedFactor, option);


        }else{
          multitrackInstance.EditSegment(multitrackInstance.tracks[id].id,
            layerMarkerStart[id], layerMarkerEnd[id], 1, option);
        }
        
      } catch (error) {
        console.error('Error editing segment:', error);
      }
      
    }
    multitrackInstance.hideLoadingScreen(multitrackInstance.tracks[id].id.toString());

  };

  //console.log('Opcja usuniecia main: ' + trashOption);
  const [, drop] = useDrop(() => ({
    accept: 'sound',
    drop: (item, monitor) => {

      //Zapisanie czasu trwania audio do mapy
      const hue = Math.floor(Math.random() * 360);
      if (multitrackInstance) { // jeśli instancja multitrack jest dostępna, dodajemy ścieżkę
        
        console.log('Dodano ścieżkę: ', item.name, ' o dlugosci ', item.duration );
        
        multitrackInstance.addTrack({
          id: CurrentLayerID,
          url: item.src,
          startPosition: 0,
          volume: 1,
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
        setIsPlaying(multitrackInstance.isPlaying());
        setHasTrackBeenSelected(true);
        
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [multitrackInstance, CurrentLayerID, hasTrackBeenSelected]);

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
      //console.log(`Track ${id} start position updated to ${startPosition}`)
    })

    multitrackInstance.on('start-cue-change', ({ id, startCue }) => {
      //console.log(`Track ${id} start cue updated to ${startCue}`)
    })

    multitrackInstance.on('end-cue-change', ({ id, endCue }) => {
      //console.log(`Track ${id} end cue updated to ${endCue}`)
    })

    multitrackInstance.on('volume-change', ({ id, volume }) => {
      //console.log(`Track ${id} volume updated to ${volume}`)
    })

    multitrackInstance.on('fade-in-change', ({ id, fadeInEnd }) => {
      //console.log(`Track ${id} fade-in updated to ${fadeInEnd}`)
    })

    multitrackInstance.on('fade-out-change', ({ id, fadeOutStart }) => {
      //console.log(`Track ${id} fade-out updated to ${fadeOutStart}`)
    })

    multitrackInstance.on('intro-end-change', ({ id, endTime }) => {
      //console.log(`Track ${id} intro end updated to ${endTime}`)
    })

    multitrackInstance.on('marker-change', ({ id, startMarker, endMarker }) => {
      const newLayerMarkerStart = { ...layerMarkerStart, [id]: startMarker };
      setLayerMarkerStart(newLayerMarkerStart);
      const newLayerMarkerEnd = { ...layerMarkerEnd, [id]: endMarker };
      setLayerMarkerEnd(newLayerMarkerEnd);
      //console.log(`Track ${id} marker start and end updated to ${layerMarkerStart[id]} ${layerMarkerEnd[id]}`)
    })
    
    multitrackInstance.on('envelope-points-change', ({ id, points }) => {
      multitrackInstance.tracks[id].envelope = points;
      //console.log(`Track ${id} envelope points updated to`, points)
    })
    //setMultitrackInstance(multitrack); // zapisujemy instancję multitrack w stanie
    if(renderAudioWAV)
    {
      console.log('Renderowanie audio wav')
      multitrackInstance.renderMultiTrackAudio('wav', ProjectName, bitrate );
      setRenderAudioWAV(false);
      
    }
    if(renderAudioMP3)
    {
      console.log('Renderowanie audio mp3')
      multitrackInstance.renderMultiTrackAudio('mp3', ProjectName, bitrate );
      setRenderAudioMP3(false);
    }



    let intervalTime = setInterval(() => {

      setTimeMultiTrack(multitrackInstance.currentTime);
    }, 10);


    setIsPlaying(multitrackInstance.isPlaying());
    multitrackInstance.on('drop', async ({ id }) => {
      //console.log(`Track ${id} dropped`)
      setCurrentLayerID(id);

    })





    // Play/pause button
    const button_start_pause = document.querySelector('#play-music-button')

    multitrackInstance.once('canplay', () => {
      button_start_pause.onclick = async () => {
        if (multitrackInstance.isPlaying()) {
          setIsPlaying(false);
          multitrackInstance.pause();
        } else {
          try {
            await multitrackInstance.play();
            setIsPlaying(true);

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
        setIsPlaying(false);
      }
    })

    // Repeat button

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

    //console.log('Multitrack instance created', multitrackInstance);
    }

  }, [ multitrackInstance, CurrentLayerID, setCurrentLayerID, renderAudioWAV, renderAudioMP3, 
    setTimeMultiTrack, layerMarkerStart, layerMarkerEnd, layerEnvelope, ProjectName,
  bitrate, setIsPlaying, setRenderAudioWAV, setRenderAudioMP3]);


  useEffect(() => {

    
    //console.log('Zmiana stanu w multitracku: ' + multitrackInstance);
    // Pobierz wszystkie elementy ścieżek
    let tracks = document.querySelectorAll('.track');
    if (TrashButtonRef.current) {
      TrashButtonRef.current.onclick = () => {
        console.log('Kliknięto na przycisk usunięcia')
        setShowTrashModal(false);
        console.log('Usunięto ścieżkę o id: ' + idTempRef.current);
        multitrackInstance.removeTrack(idTempRef.current);
      };
    }
    if (SaveTextButtonRef.current) {
      SaveTextButtonRef.current.onclick = () => {
        console.log('Kliknięto na przycisk zmiany tekstu')
        handleTrackNameSubmit(idTempRef.current);
      };
    }
    if (AcceptSpeedChangeRef.current) {
      AcceptSpeedChangeRef.current.onclick = () => {
        setShowSpeedModal(false)
        console.log('Kliknięto na przycisk zmiany czasu')
        handleEditFragConfirm(idTempRef.current, 'speed');
      };
    }
    function selectIndex(event) {

      const id = event.currentTarget.getAttribute('track-id');
      console.log('Kliknięto na track o id: ' + id);
      idTempRef.current = id;
      setCurrentLayerID(parseInt(id));
      if (multitrackInstance.tracks[id]?.url) {
        if (isSelectOption) {
          handleTrackSelect(id);
        }
        if (isCutFragOption) {
          setHasTrackBeenSelected(false);
          handleEditFragOption(id, 'cut');
        }
        if (isDelFragOption) {
          setHasTrackBeenSelected(false);
          handleEditFragOption(id, 'delete');
        }
        if (isMuteFragOption) {
          setHasTrackBeenSelected(false);
          handleEditFragOption(id, 'mute');
        }
        if (isTrashOption) {
          setHasTrackBeenSelected(false);
          handleTrashShow();
        }
        if (isReverseOption) {
          setHasTrackBeenSelected(false);
          handleEditFragOption(id, 'reverse');
        }
        if (isSpeedOption) {
          setHasTrackBeenSelected(false);
          handleEditFragOption(id, 'speed');
        }
        if (isTextFormatOption) {
          setHasTrackBeenSelected(false);
          handleChangeTextTrack(id);
        }

      }
    }
    function confirmIndex(event) {
      const id = event.currentTarget.getAttribute('track-id');
      setCurrentLayerID(parseInt(id));
      console.log('Potwierdzenie na track o id: ' + id);
      event.preventDefault()
      if (multitrackInstance.tracks[id]?.url) {
        if (isDelFragOption) {
          handleEditFragConfirm(id, 'delete');
        }
        if (isMuteFragOption) {
          handleEditFragConfirm(id, 'mute');
        }
        if (isCutFragOption) {
          handleEditFragConfirm(id, 'cut');
        }
        if (isReverseOption) {
          handleEditFragConfirm(id, 'reverse');
        }
        if (isSpeedOption) {
          setShowSpeedModal(true);

        }
      }
    }
    tracks.forEach((track) => {
      track.addEventListener('drop', dropSetIndex );
      track.addEventListener('click', selectIndex);
      track.addEventListener('contextmenu', confirmIndex);
    });
    return () => {
      tracks.forEach((track) => {
        track.removeEventListener('drop', dropSetIndex );
        track.removeEventListener('click', selectIndex);
        track.removeEventListener('contextmenu', confirmIndex);
      });
    }

    function dropSetIndex(event) {
      const id = event.currentTarget.getAttribute('track-id');
      setCurrentLayerID(parseInt(id));
    }
    function handleEditFragOption(id, option) {
      //console.log('Wybieram fragment do edycji');
      let colorOption = '';
      let labelOption = '';
      if (option === 'delete') {
        colorOption = 'hsla(345, 50%, 30%, 0.7)'
        labelOption = 'X Region X';
      } else if (option === 'mute') {
        colorOption = 'hsla(125, 30%, 20%, 0.7)'
        labelOption = '_ Region _';
      } else if (option === 'cut') {
        colorOption = 'hsla(85, 5%, 35%, 0.7)'
        labelOption = '< Region >';
      } else if (option === 'reverse') {
        colorOption = 'hsla(45, 45%, 35%, 0.7)'
        labelOption = '< Reverse <';
      } else if (option === 'speed') {
        colorOption = 'hsla(105, 5%, 65%, 0.7)'
        labelOption = '>> Speed >>';
      }

      multitrackInstance.stop();
      if (multitrackInstance.tracks[id]?.url) {

        const newLayerEnvelope = { ...layerEnvelope, [id]: multitrackInstance.tracks[id].envelope };
        setLayerEnvelope(newLayerEnvelope);
        multitrackInstance.addTrack({
          id: multitrackInstance.tracks[id].id,
          url: multitrackInstance.tracks[id].url,
          volume: multitrackInstance.tracks[id].volume,
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
      }

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  isSelectOption, isCutFragOption, isMuteFragOption, isDelFragOption, showTrashModal, isTrashOption,  
        showSpeedModal, isReverseOption, isSpeedOption, showTrackNameModal, isTextFormatOption,
        multitrackInstance, hasTrackBeenSelected, layerMarkerStart, layerMarkerEnd, layerEnvelope, 
        setLayerEnvelope, SpeedPerc, setSpeedPerc, handleTrackSelect, CurrentLayerID, setCurrentLayerID ]);



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


      <Modal show={showTrackNameModal} onHide={() => {setShowTrackNameModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Track Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" ref={trackNameRef} value={trackName} onChange={handleTrackNameChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowTrackNameModal(false)}}>
            Close
          </Button>
          <Button ref={SaveTextButtonRef} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSpeedModal} onHide={() => setShowSpeedModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Speed Ratio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Value Ratio: {(SpeedPerc / 100)}x</Form.Label>
              <Form.Control type="range" min="50" max="200"  value={SpeedPerc} onChange={handleSpeedChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSpeedModal(false)}>
            Close
          </Button>
          <Button variant="primary" ref={AcceptSpeedChangeRef}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default MultiTrackPlayer;