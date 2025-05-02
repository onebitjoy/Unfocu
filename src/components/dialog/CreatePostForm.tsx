
import { useScreen } from "@/store/dialogStore"

import ImageUploadTray from "./ImageUploadTray"
import CaptionsTray from "./CaptionsTray"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { newPostStore } from "@/store/postStore"

export default function CreatePostForm() {

  const imagefiles = newPostStore.getState().file
  const screen = useScreen()

  return <div className="relative w-full overflow-hidden transition-all duration-500 ease-in-out">
    {
      screen === "upload" ?
        <ImageUploadTray /> : (
          <CaptionsTray >
            <Carousel className="flex flex-col w-full h-full">
              <CarouselContent className="m-0 p-0 w-full h-full">
                {imagefiles?.map(
                  (imgfile: File, index) => (
                    <CarouselItem key={`${index}`} className="flex justify-center items-center m-0 p-0 h-full">
                      <img
                        src={URL.createObjectURL(imgfile)}
                        alt={`image-${index}`}
                        className="w-full h-full object-contain"
                      />
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <div className='flex justify-end bg-transparent p-2 border'>
                <CarouselPrevious />
                <p
                  className="m-auto px-4 py-1 border border-neutral-400 rounded-xl font-semibold text-neutral-900 dark:text-neutral-200 text-sm">
                  {imagefiles!.length > 1 ? `${imagefiles!.length} Photos` : `1 Photo`}
                </p>
                <CarouselNext />
              </div>
            </Carousel>
          </CaptionsTray>
        )
    }
  </div>
}