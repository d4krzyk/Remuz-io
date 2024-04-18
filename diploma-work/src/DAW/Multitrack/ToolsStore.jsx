// store.js
import create from 'zustand';

const ToolsStore = create(set => ({
  zoomValue: 10, // Domyślna wartość zoom
  setZoomValue: (zoom) => set({ zoomValue: zoom }),
}));

export default ToolsStore;