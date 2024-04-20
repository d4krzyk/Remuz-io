// store.js
import { create } from 'zustand';

const NavStore = create(set => ({
  TimeMultiTrack: 0,
  timeHour: 0,
  timeMinute: 0,
  timeSecond: 0,
  timeMilisecond: 0,
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