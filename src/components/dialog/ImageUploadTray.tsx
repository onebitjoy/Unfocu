import { useSetScreen } from "@/store/dialogStore"
import { updatePostFile } from "@/store/postStore"
import { useCallback } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"

export default function ImageUploadTray() {
  const setScreen = useSetScreen()

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    updatePostFile(acceptedFiles)
    setScreen("caption")
  }, [setScreen])

  const { getRootProps, getInputProps, open, isDragReject } = useDropzone({
    onDrop,
    maxFiles: 3,
    minSize: 1024,
    maxSize: 5242880,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    noClick: true,
    noKeyboard: true
  })

  return <div className="flex flex-col justify-center items-center w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[35rem] xl:w-[40rem] h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[40rem]" {...getRootProps()} >
    <input {...getInputProps()} />
    <div className="flex flex-col justify-center items-center w-full h-full">
      <img src="/assets/icons/file-upload.svg" alt="" className="mb-2 size-24 lg:size-36" />
      {
        isDragReject ?
          <p className="mt-4 font-bold text-red-500 dark:text-neutral-100">Some file(s) will be rejected</p> :
          <p className="mt-4 font-bold text-black dark:text-neutral-100">Drag photos here [max:3]</p>
      }
      <p className="font-semibold text-neutral-600">PNG, JPG, JPEG</p>
      <button className="bg-blue-500 mt-4 px-4 py-1 rounded-sm text-white" onClick={open}>Select from device</button>
    </div >
  </div >
}