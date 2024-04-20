// store.js
import { create } from 'zustand';

const ToolsStore = create(set => ({
      isSelectOption: true,
      setIsSelectOption: (value) => set({ isSelectOption: value }),
    
      isCopyFragOption: false,
      setIsCopyFragOption: (value) => set({ isCopyFragOption: value }),
    
      isCutFragOption: false,
      setIsCutFragOption: (value) => set({ isCutFragOption: value }),
    
      isDelFragOption: false,
      setIsDelFragOption: (value) => set({ isDelFragOption: value }),
    
      isVolAutoOption: false,
      setIsVolAutoOption: (value) => set({ isVolAutoOption: value }),
    
      isTrashOption: false,
      setIsTrashOption: (value) => set({ isTrashOption: value }),
      turnOnOption: (option) => set(({
        isSelectOption: option === 'select',
        isCopyFragOption: option === 'copy',
        isCutFragOption: option === 'cut',
        isDelFragOption: option === 'delete',
        isVolAutoOption: option === 'volume',
        isTrashOption: option === 'trash',
      })),
}));

export default ToolsStore;