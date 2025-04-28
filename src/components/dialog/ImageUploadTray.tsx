import { useCallback, useEffect } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { usePostContext } from "@/context/PostContext"

type ImageUploadTrayProps = {
  fieldChange: (Files: File[]) => void,
  mediaUrl: string,
}

export default function ImageUploadTray({ fieldChange, mediaUrl }: ImageUploadTrayProps) {

  const { setScreen, file, setFile, fileUrl, setFileUrl, isDialogOpen } = usePostContext()

  useEffect(() => {
    setFile(null)
    setFileUrl("")
  }, [isDialogOpen, setFile, setFileUrl])

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    setScreen("caption")
  }, [file])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    noClick: true,
    noKeyboard: true
  })

  function handleOpen() {
    if (file?.length) {
      setFile([])
      setFileUrl('')
    }
    open()
  }

  return <div className="flex flex-col w-full h-full">
    <div {...getRootProps()} className="w-full h-full">
      <input {...getInputProps()} />
      { // show only when there is no file
        !fileUrl ? <div className="flex flex-col justify-center items-center w-80 sm:w-100 md:w-120 lg:w-140 h-80 sm:h-100 md:h-120 lg:h-140">
          <img src="/assets/icons/file-upload.svg" alt="" className="mb-2 size-24 lg:size-36" />
          <p className="mt-4 font-bold text-black dark:text-neutral-100">Drag photos here</p>
          <p className="font-semibold text-neutral-600">PNG, JPG, JPEG</p>
          <button className="bg-blue-500 mt-4 px-4 py-1 rounded-sm text-white" onClick={handleOpen}>Select from device</button>
        </div> : <></>
      }

      {/* { // if there are file that are selected
        fileUrl && (
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-black m-0 p-0 h-full">

              <Carousel className="m-0 p-0">
                <CarouselContent className="w-160">
                  {file?.map((imgfile, index) => (
                    <CarouselItem key={index} className="flex justify-center items-center m-0 p-0 w-full h-full">
                      <img
                        src={URL.createObjectURL(imgfile)}
                        alt={`image-${index}`}
                        className="w-full h-full object-contain" />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <div className='flex justify-end bg-transparent p-2 border'>
                  <CarouselPrevious />
                  <p
                    className="m-auto px-4 py-1 border border-neutral-400 rounded-xl font-semibold text-neutral-900 dark:text-neutral-200 text-sm">
                    {file!.length > 1 ? `${file!.length} Photos` : `1 Photo`}
                  </p>
                  <CarouselNext />
                </div>

              </Carousel>
              <div className="flex w-full h-12">
                <Button variant={"ghost"} onClick={handleOpen} className="flex-1/2 hover:bg-neutral-200 dark:bg-white dark:hover:bg-neutral-200 rounded-none h-full dark:text-black">Change Selected Files</Button>
                <Button variant={"ghost"} onClick={() => setScreen("caption")} className="flex-1/2 rounded-none h-full">Write captions &rarr;</Button>
              </div>
            </div>
          </div>
        )
      } */}
    </div >
  </div>
}
