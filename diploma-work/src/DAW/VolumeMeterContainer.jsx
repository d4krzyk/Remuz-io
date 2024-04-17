

import { useEffect, useRef, useState, useMemo } from "react";
const webAudioPeakMeter = require('web-audio-peak-meter');


export default function VolumeMeterContainer() {
    
  const audioCtx = useMemo(() => new window.AudioContext(), []);
  const [fileUrl, setFileUrl] = useState("");
  const audioElem = useRef();
  const myMeterElement = useRef();
  const sourceNode = useRef();

  useEffect(() => {
    if (audioElem.current && !sourceNode.current) {
      sourceNode.current = audioCtx.createMediaElementSource(audioElem.current);
      sourceNode.current.connect(audioCtx.destination);

      const meter = new webAudioPeakMeter.WebAudioPeakMeter(sourceNode.current, myMeterElement.current, {vertical: true});
    }
  }, [fileUrl, audioCtx]);

  async function handlePlay() {
    if (audioElem.current) {
        audioElem.current.play()
        .catch(error => {
            console.log('Error playing the audio file:', error);
        });
    }
};

  return (
    <>
      <div ref={myMeterElement} style={{ height: '100%'}}  id='volume-peak-meter'/>
      <audio ref={audioElem} src={'mocna fagata.mp3'} preload="auto" ></audio>

    </>
  );
}
