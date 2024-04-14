import React, { useEffect, useState, useRef } from 'react';
import Multitrack from './multitrack-module/multitrack.ts'
const MultiTrackPlayer = () => {

  const [initializeOnce, setInitializeOnce] = useState(false);
  const initRef = useRef(false);

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
      url: "mocna fagata.mp3"
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
  ],
  {
    container: document.querySelector('#container-multitrack'), // required!
    minPxPerSec: 10, // zoom level
    rightButtonDrag: false, // set to true to drag with right mouse button
    cursorWidth: 2,
    cursorColor: '#D72F21',
    trackBackground: '#2D2D2D',
    trackBorderColor: '#7C7C7C',
    dragBounds: true,
    envelopeOptions: {
      lineColor: 'rgba(255, 0, 0, 0.7)',
      lineWidth: 4,
      dragPointSize: window.innerWidth < 600 ? 20 : 10,
      dragPointFill: 'rgba(255, 255, 255, 0.8)',
      dragPointStroke: 'rgba(255, 255, 255, 0.3)',
    },
    timelineOptions: {
      height: 70,
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

multitrack.on('drop', ({ id }) => {
  multitrack.addTrack({
    id,
    url: 'flute_melody0.mp3',
    startPosition: 0,
    draggable: true,
    options: {
      waveColor: 'hsl(25, 87%, 49%)',
      progressColor: 'hsl(25, 87%, 20%)',
    },
  })
})

// Play/pause button
const button = document.querySelector('#play-music-button')
//button.disabled = true
multitrack.once('canplay', () => {
  //button.disabled = false
  button.onclick = () => {
    multitrack.isPlaying() ? multitrack.pause() : multitrack.play()
    //button.textContent = multitrack.isPlaying() ? 'Pause' : 'Play'
  }
})


// Zoom
const slider = document.querySelector('input[type="range"]')
slider.oninput = () => {
  multitrack.zoom(slider.valueAsNumber)
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
});

    return (
      <div className='w-100'>
        <div id="container-multitrack"/>
      </div>
    );
};

export default MultiTrackPlayer;