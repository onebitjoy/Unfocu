import { create } from "zustand"

type SCREENS = "upload" | "caption";

type INITIAL_STATE = {
  isDialogOpen: boolean,
  screen: SCREENS
}

const initialDialogState = <INITIAL_STATE>{
  isDialogOpen: false,
  screen: "upload"
}

type DialogStore = INITIAL_STATE & {
  action: {
    resetStore: () => void,
    setScreen: (screen: SCREENS) => void
    setDialogOpen: (v: boolean) => void,
    toggleDialogOpen: () => void,
    resetScreen: () => void,
  }
}

export const useDialogStore = create<DialogStore>((set) => ({
  isDialogOpen: false,
  screen: "upload",
  action: {
    resetStore: () => set(() => initialDialogState),
    setScreen: (screen) => set(({ screen: screen })),
    resetScreen: () => set((state) => ({ ...state, screen: "upload" })),
    setDialogOpen: (v) => set({ isDialogOpen: v }),
    toggleDialogOpen: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
  },
}))

// Custom Hooks for state and action
export const useIsDialogOpen = () => useDialogStore(state => state.isDialogOpen)
export const useSetDialogOpen = () => useDialogStore(state => state.action.setDialogOpen)
export const useToggleDialogOpen = () => useDialogStore(state => state.action.toggleDialogOpen)

export const useScreen = () => useDialogStore(state => state.screen)
export const useSetScreen = () => useDialogStore(state => state.action.setScreen)
export const useResetScreen = () => useDialogStore(state => state.action.resetScreen)
