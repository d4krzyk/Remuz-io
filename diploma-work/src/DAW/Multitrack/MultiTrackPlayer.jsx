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
      url: 'mocna fagata.mp3',
      draggable: true,
      intro: {
        label: 'test',
      }
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
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

multitrack.on('audioprocess', () => {
  setTimeMultiTrack(multitrack.currentTime);
});


multitrack.on('drop', ({ id }) => {



  multitrack.addTrack({
    id,
    url: 'Enejowy pop.mp3',
    startPosition: 0,
    draggable: true,
    options: {
      waveColor: 'hsl(245, 47%, 69%)',
      progressColor: 'hsl(245, 47%, 40%)',
    },
  })
})
// const [, drop] = useDrop({
//   accept: 'sound',
//   drop: (item, monitor, trackId) => {
//     console.log('Dropped item:', item);
//     multitrack.addTrack({
//       id: item.id,
//       url: item.src,
//       startPosition: 0,
//       draggable: true,
//       options: {
//         waveColor: 'hsl(265, 87%, 49%)',
//         progressColor: 'hsl(265, 87%, 20%)',
//       },
//     });
//   },
// });

//console.log(id)

// Play/pause button
const button_start_pause = document.querySelector('#play-music-button')
//button.disabled = true
multitrack.once('canplay', () => {
  //button.disabled = false
  
  button_start_pause.onclick = () => {
    multitrack.isPlaying() ? multitrack.pause() : multitrack.play()
    setIsPlaying(!isPlaying);
    //button.textContent = multitrack.isPlaying() ? 'Pause' : 'Play'
  }
})

// Play/pause button
const button_stop = document.querySelector('#stop-music-button')
multitrack.once('canplay', () => {
  //button.disabled = false

  button_stop.onclick = () => {
    multitrack.stop();
    setIsPlaying(false)
    //button.textContent = multitrack.isPlaying() ? 'Pause' : 'Play'
  }
})
// Zoom
const slider = document.querySelector('input[type="range"]')
slider.oninput = () => {
  multitrack.zoom(zoomValue)
}


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
  

},[zoomValue]);

    return (
      <div className='w-100'>
        <div id="container-multitrack"/>
      </div>
    );
};

export default MultiTrackPlayer;