// VolumeMeterStore.js
import {create} from 'zustand';

const VolumeMeterStore = create((set) => ({
  audio: null,
  setAudio: (audio) => set((state) => ({ ...state, audio })),
}));

export default VolumeMeterStore;