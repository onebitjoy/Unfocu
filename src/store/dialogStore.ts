import { create } from "zustand"

type DialogStore = {
  isDialogOpen: boolean,
  action: {
    setDialogOpen: (v: boolean) => void,
    toggleDialogOpen: () => void
  }
}

export const useDialogStore = create<DialogStore>((set) => ({
  isDialogOpen: false,
  action: {
    setDialogOpen: (v: boolean) => set({ isDialogOpen: v }),
    toggleDialogOpen: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
  },
}))

// Custom Hooks for state and action
export const useIsDialogOpen = () => useDialogStore(state => state.isDialogOpen)
export const useToggleDialogOpen = () => useDialogStore(state => state.action.toggleDialogOpen)
export const useSetDialogOpen = () => useDialogStore(state => state.action.setDialogOpen)