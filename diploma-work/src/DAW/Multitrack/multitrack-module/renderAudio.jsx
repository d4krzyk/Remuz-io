import React, { Component } from 'react';
import AudioEncoder from 'audio-encoder';
import toWav from 'audiobuffer-to-wav';
import lamejs from 'lamejs';

class RenderAudio extends Component {
    constructor(props) {
        super(props);
    }


    renderAsMp3 = async (audioBuffer) => {

        const mp3encoder = new lamejs.Mp3Encoder(2, audioBuffer.sampleRate, 192); // 2 kanały, sampleRate, 192kbps
        const samples = audioBuffer.getChannelData(0); // Dla mono użyj tylko pierwszego kanału
        const samplesRight = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : null;
        
        let mp3Data = [];
        const sampleBlockSize = 1152; // Liczba próbek na ramkę dla LAME
        let buffer = [];
        for (let i = 0; i < samples.length; i += sampleBlockSize) {
            const left = samples.subarray(i, i + sampleBlockSize);
            const right = samplesRight ? samplesRight.subarray(i, i + sampleBlockSize) : left;
            buffer = mp3encoder.encodeBuffer(left, right);
            if (buffer.length > 0) {
                mp3Data.push(new Int8Array(buffer));
            }
            if((i / samples.length * 100).toFixed(2) % 10 === 0)
            {
                console.log(`Processing: ${(i / samples.length * 100).toFixed(2)}%`);
            }
            
        }

        buffer = mp3encoder.flush();
        if (buffer.length > 0) {
            mp3Data.push(new Int8Array(buffer));
        }
        const mp3Blob = new Blob(mp3Data, {type: 'audio/mp3'});
        this.downloadFile(mp3Blob, 'Project_RemuzIO.mp3');
    }

    renderAsWav = async (audioBuffer) => {
        const wav = toWav(audioBuffer);
        const blobWav = new Blob([wav], { type: 'audio/wav' });
        this.downloadFile(blobWav, 'Project_RemuzIO.wav');
    }

    downloadFile = (blob, name) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        document.body.appendChild(anchor);
        anchor.href = url;
        anchor.download = name;
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(anchor);
    }

}

export default RenderAudio;