import React, { useEffect, useState, useRef } from 'react';
import Multitrack from './multitrack-module/multitrack.tsx';
import './multitrack-module/multitrack.css'
import ToolsStore from './ToolsStore.jsx';
import { useDrop } from 'react-dnd';


const MultiTrackPlayer = () => {
  const zoomValue = ToolsStore(state => state.zoomValue);
  const initRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [TimeMultiTrack,setTimeMultiTrack] = useState(0)
  //const [layerAudio, setLayerAudio] = useState([]);
  const [CurrentLayer, setCurrentLayer] = useState([]);
  const [multitrackInstance, setMultitrackInstance] = useState(null); // przechowujemy instancję multitrack
  const isTrashOption = ToolsStore(state => state.isTrashOption);
  //console.log(isTrashOption);
  // Funkcja, która zostanie wywołana po kliknięciu na track
function handleTrackClick(index,multitrack,isTrashOption) {
  
  console.log('Kliknięto na track o id: ' + index);
  console.log('Opcja usuniecia: ' + isTrashOption);
    if(isTrashOption){
      multitrack.removeTrack(index);
    }
  // Tutaj umieść kod, który ma się wykonać po kliknięciu
}
  //console.log('Opcja usuniecia main: ' + trashOption);
  const [, drop] = useDrop(() => ({
    accept: 'sound',
    drop: async (item, monitor) => {
      //await setLayerAudio(item);
    //console.log(item);

    if (multitrackInstance) { // jeśli instancja multitrack jest dostępna, dodajemy ścieżkę
      multitrackInstance.addTrack({
        id: CurrentLayer,
        url: item.src,
        startPosition: 0,
        draggable: true,
        options: {
          waveColor: 'hsl(245, 47%, 69%)',
          progressColor: 'hsl(245, 47%, 40%)',
        },
        intro: {
          label: item.name,
        }
      });
    }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }),[multitrackInstance,CurrentLayer]);

// Pobierz wszystkie elementy ścieżek
// let tracks = document.querySelectorAll('.track');

// // Nasłuchiwacz zdarzeń do każdej ścieżki
// tracks.forEach((track) => {
//   track.addEventListener('click', function(event) {
//     // Wywołaj funkcję z id klikniętego tracka
//     const index = event.currentTarget.getAttribute('data-index');


//     handleTrackClick(index,multitrackInstance, isTrashOption);
//   });
// });



// Dodaj nasłuchiwacz zdarzeń do elementu nadrzędnego





  useEffect( () => {
    if(initRef.current === true) 
      {return}
    initRef.current = true;
  
// Call Multitrack.create to initialize a multitrack mixer
// Pass a tracks array and WaveSurfer options with a container element
const multitrack = Multitrack.create(
  [
    {
      id: 0,
      startPosition: 0,
      envelope:[
        { time: 0, volume: 1 },
        { time: 60, volume: 1 },
      ],

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
    minPxPerSec: 2, // zoom level
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


setInterval(() => {
  setTimeMultiTrack(multitrack.currentTime);
 }, 100);

multitrack.on('drop', async ({ id }) => {

  setCurrentLayer(id);
  
})





// Play/pause button
const button_start_pause = document.querySelector('#play-music-button')
//button.disabled = true
multitrack.once('canplay', () => {
  //button.disabled = false
  
  button_start_pause.onclick = () => {
    multitrack.isPlaying() ? multitrack.pause() : multitrack.play()
    //setIsPlaying(!isPlaying);
    //button.textContent = multitrack.isPlaying() ? 'Pause' : 'Play'
  }
})

// Play/pause button
const button_stop = document.querySelector('#stop-music-button')
multitrack.once('canplay', () => {
  //button.disabled = false

  button_stop.onclick = () => {
    multitrack.stop();
    
    //button.textContent = multitrack.isPlaying() ? 'Pause' : 'Play'
  }
})
multitrack.once('decode', () => {
  document.querySelector('input[type="range"]').oninput = (e) => {

    multitrack.zoom(Number(zoomValue))
  }
})
// Zoom



// Destroy all wavesurfer instances on unmount
// This should be called before calling initMultiTrack again to properly clean up
window.onbeforeunload = () => {
  multitrack.destroy()
}

// Set sinkId
multitrack.once('canplay', async () => {
  await multitrack.setSinkId('')

  console.log('Set sinkId to default')
})

  console.log(zoomValue)
  multitrack.zoom(zoomValue);
  

},[zoomValue,multitrackInstance]);


useEffect(() => {

      
      // Pobierz wszystkie elementy ścieżek
      let tracks = document.querySelectorAll('.track');

      function selectIndex(event) {
        // Wywołaj funkcję z id klikniętego tracka
        const index = event.currentTarget.getAttribute('data-index');
        handleTrackClick(index, multitrackInstance, isTrashOption);
      }

      tracks.forEach((track) => {
        track.addEventListener('click', selectIndex );
      });
      return () => { tracks.forEach((track) => {
        track.removeEventListener('click', selectIndex );
      }); }

},[isTrashOption])

console.log(TimeMultiTrack);

    return (
      <div className='w-100'>
        <div ref={drop} id="container-multitrack"/>
      </div>
    );
};

export default MultiTrackPlayer;