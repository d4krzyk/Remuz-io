import { Component } from 'react';

import toWav from 'audiobuffer-to-wav';
import NavStore from '../../NavigationStore';
import audioEncoder from 'audio-encoder';
class RenderAudio extends Component {

    constructor(props) {
        super(props);
        this.progress = 0;
        this.previousRoundedProgress = 0;
    }

    renderAsMp3 = async (audioBuffer, RenderName, bitrate) => {


        audioEncoder(audioBuffer, bitrate, 
            (progress) => { // funkcja callback do monitorowania postępu
                this.progress = progress;
                let roundedProgress = Math.round(this.progress * 100);
                if(roundedProgress !== this.previousRoundedProgress){
                    //console.log(`Progress: ${roundedProgress}%`); // wyświetlanie postępu w konsoli
                    NavStore.getState().setProgressBar(roundedProgress); // aktualizacja paska postępu
                    this.previousRoundedProgress = roundedProgress;
                }  
            }, (mp3blob) =>{
            if (RenderName === '') {
                RenderName = 'Project_RemuzIO';
            }
            this.downloadFile(mp3blob, RenderName + '.mp3');
        });
        
    }

    renderAsWav = async (audioBuffer, RenderName) => {

        NavStore.getState().setProgressBar(30);
        const wav = toWav(audioBuffer);
        const blobWav = new Blob([wav], { type: 'audio/wav' });
        if (RenderName === '') {
            RenderName = 'Project_RemuzIO'
        }
        NavStore.getState().setProgressBar(100);
        this.downloadFile(blobWav, RenderName + '.wav');
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