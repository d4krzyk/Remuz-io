import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Waveform } from 'react-wavesurfer';

const WavesurferMultiTrackPlayer = ({ tracks }) => {
  const wavesurferRef = useRef(null);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: wavesurferRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      cursorColor: 'navy',
    });

    // Dodaj wszystkie ścieżki
    tracks.forEach((track, index) => {
      wavesurfer.load(track.url);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [tracks]);

  return (
      <div ref={wavesurferRef} />
  );
};

export default WavesurferMultiTrackPlayer;