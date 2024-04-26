// store.js
import { create } from 'zustand';

type Store = {

  ProjectName: string;
  progressBar: number,
  bitrate: number;
  isPlaying: boolean;
  renderAudioWAV: boolean;
  renderAudioMP3: boolean;
  TimeMultiTrack: number;
  timeHour: number;
  timeMinute: number;
  timeSecond: number;
  timeMilisecond: number;
  setBitrate: (value: number) => void;
  setProjectName: (value: string) => void;
  setProgressBar: (value: number) => void;
  setIsPlaying: (value: boolean) => void;
  setRenderAudioWAV: (value: boolean) => void;
  setRenderAudioMP3: (value: boolean) => void;
  setTimeMultiTrack: (value: number) => void;
  setTimeConverted: (value: number) => void;
};


export const NavStore = create<Store>(set => ({
  bitrate: 320,
  ProjectName: '',
  progressBar: 0,
  isPlaying: false,
  renderAudioWAV: false,
  renderAudioMP3: false,
  TimeMultiTrack: 0,
  timeHour: 0,
  timeMinute: 0,
  timeSecond: 0,
  timeMilisecond: 0,
  setBitrate: (value) => set({ bitrate: value }),
  setProjectName: (value) => set({ ProjectName: value }),
  setProgressBar: (value) => set({ progressBar: value }),
  setIsPlaying: (value) => set({ isPlaying: value }),
  setRenderAudioWAV: (value) => set({ renderAudioWAV: value }),
  setRenderAudioMP3: (value) => set({ renderAudioMP3: value }),
  setTimeMultiTrack: (value) => set({ TimeMultiTrack: value }),
  setTimeConverted: (value) => {

    const hour = Math.floor(value / 3600);
    const minute = Math.floor((value % 3600) / 60);
    const second = Math.floor(value % 60);
    const milisecond = Math.floor((value % 1) * 1000);
    set({ timeHour: hour, timeMinute: minute, timeSecond: second, timeMilisecond: milisecond });
  },
}));

export default NavStore;