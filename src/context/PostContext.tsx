import { useIsDialogOpen, useSetDialogOpen } from "@/store/dialogStore";
import { createContext, useContext, useState } from "react";

type PostContextTypes = {
  isDialogOpen: boolean,
  setDialogOpen: (v: boolean) => void,
  screen: "upload" | "caption",
  setScreen: React.Dispatch<React.SetStateAction<"upload" | "caption">>,
  file: File[] | null,
  setFile: React.Dispatch<React.SetStateAction<File[] | null>>,
  fileUrl: string,
  setFileUrl: React.Dispatch<React.SetStateAction<string>>,
  clearPostImagesAndResetScreen: () => void
}

const PostContext = createContext<PostContextTypes | undefined>(undefined)

export function PostContextProvider({ children }: { children: React.ReactNode }) {

  const isDialogOpen = useIsDialogOpen()
  const setDialogOpen = useSetDialogOpen()
  const [screen, setScreen] = useState<"upload" | "caption">("upload")
  const [file, setFile] = useState<File[] | null>([])
  const [fileUrl, setFileUrl] = useState('')

  function clearPostImagesAndResetScreen() {
    setScreen("upload")
    setFile(null)
    setFileUrl("")
    setDialogOpen(false)
  }

  const contextValues = {
    screen, setScreen,
    isDialogOpen, setDialogOpen,
    file, setFile,
    fileUrl, setFileUrl,
    clearPostImagesAndResetScreen
  }

  return <PostContext.Provider value={contextValues}>
    {children}
  </PostContext.Provider>
}

export function usePostContext() {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error("Context Error: Use context properly")
  }
  return context
}