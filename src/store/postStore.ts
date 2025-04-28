import { FileWithPath } from "react-dropzone"
import { create } from "zustand"
import { devtools } from 'zustand/middleware'

type NewPost = {
  imgFiles: FileWithPath[],
  addImagesToPost: (imgArray: FileWithPath[]) => void,
  updateImagesFromPost: (imgArray: FileWithPath[]) => void,
  removeImagesFromPost: () => void
}

const useNewPostStore =
  create<NewPost>()(
    devtools(
      (set) => ({
        imgFiles: [],
        addImagesToPost: (imgArray: FileWithPath[]) => set({ imgFiles: imgArray }),
        updateImagesFromPost: (imgArray: FileWithPath[]) => set({ imgFiles: imgArray }),
        removeImagesFromPost: () => set({ imgFiles: [] }),
      })
    )
  )

export const useGetImgFiles = () => useNewPostStore(state => state.imgFiles)
export const useAddPostImagesAction = () => useNewPostStore(state => state.addImagesToPost)
export const useUpdatePostImagesAction = () => useNewPostStore(state => state.updateImagesFromPost)
export const useRemovePostImagesAction = () => useNewPostStore(state => state.removeImagesFromPost)