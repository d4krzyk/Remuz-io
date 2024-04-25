// store.js
import { create } from 'zustand';

type State = {
  isSelectOption: boolean,
  isCutFragOption: boolean;
  isDelFragOption: boolean;
  isTrashOption: boolean;
  isMuteFragOption: boolean;
  isPitchOption: boolean;
  isVolumeOption: boolean;
  isSpeedOption: boolean;
  isPanningOption: boolean;
  isReverseOption: boolean;
  isTextFormatOption: boolean;
  setIsSelectOption: (value: boolean) => void;
};

export const ToolsStore = create<State>(set => ({
  isSelectOption: true,
  setIsSelectOption: (value: boolean) => set({ isSelectOption: value }),

  isCutFragOption: false,
  setIsCutFragOption: (value: boolean) => set({ isCutFragOption: value }),

  isDelFragOption: false,
  setIsDelFragOption: (value: boolean) => set({ isDelFragOption: value }),

  isMuteFragOption: false,
  setIsMuteFragOption: (value: boolean) => set({ isMuteFragOption: value }),

  isTrashOption: false,
  setIsTrashOption: (value: boolean) => set({ isTrashOption: value }),

  isPitchOption: false,
  setIsPitchOption: (value: boolean) => set({ isPitchOption: value }),

  isVolumeOption: false,
  setIsVolumeOption: (value: boolean) => set({ isVolumeOption: value }),

  isSpeedOption: false,
  setIsSpeedOption: (value: boolean) => set({ isSpeedOption: value }),

  isPanningOption: false,
  setIsPanningOption: (value: boolean) => set({ isPanningOption: value }),

  isReverseOption: false,
  setIsReverseOption: (value: boolean) => set({ isReverseOption: value }),

  isTextFormatOption: false,
  setIsTextFormatOption: (value: boolean) => set({ isTextFormatOption: value }),

  turnOnOption: (option: string) => set(({
    isSelectOption: option === 'select',
    isCutFragOption: option === 'cut',
    isDelFragOption: option === 'delete',
    isMuteFragOption: option === 'mute',
    isTrashOption: option === 'trash',
    isPitchOption: option === 'pitch',
    isVolumeOption: option === 'volume',
    isSpeedOption: option === 'speed',
    isPanningOption: option === 'panning',
    isReverseOption: option === 'reverse',
    isTextFormatOption: option === 'textFormat',
  })),
}));

