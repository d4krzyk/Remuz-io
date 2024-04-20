// store.js
import create from 'zustand';

type State = {
  isSelectOption: boolean,
  isCopyFragOption: boolean;
  isCutFragOption: boolean;
  isDelFragOption: boolean;
  isTrashOption: boolean;
  isVolAutoOption: boolean;
  setIsSelectOption: (value: boolean) => void;
};

export const ToolsStore = create<State>(set => ({
      isSelectOption: true,
      setIsSelectOption: (value: boolean) => set({ isSelectOption: value }),
    
      isCopyFragOption: false,
      setIsCopyFragOption: (value: boolean) => set({ isCopyFragOption: value }),
    
      isCutFragOption: false,
      setIsCutFragOption: (value: boolean) => set({ isCutFragOption: value }),
    
      isDelFragOption: false,
      setIsDelFragOption: (value: boolean) => set({ isDelFragOption: value }),
    
      isVolAutoOption: false,
      setIsVolAutoOption: (value: boolean) => set({ isVolAutoOption: value }),
    
      isTrashOption: false,
      setIsTrashOption: (value: boolean) => set({ isTrashOption: value }),
      turnOnOption: (option: string) => set(({
        isSelectOption: option === 'select',
        isCopyFragOption: option === 'copy',
        isCutFragOption: option === 'cut',
        isDelFragOption: option === 'delete',
        isVolAutoOption: option === 'volume',
        isTrashOption: option === 'trash',
      })),
}));

