import { useThemeContext } from "@/context"
import { useToggleDialogOpen } from "@/store/dialogStore"

export default function CreatePostDialog() {
  const { isDark } = useThemeContext()
  const toggleDialogOpen = useToggleDialogOpen()

  return (
    <>
      <div
        onClick={toggleDialogOpen}
        className="flex items-center self-center active:bg-neutral-900 dark:bg-black dark:hover:bg-neutral-800 mb-2 px-2 py-3 lg:ps-4 rounded lg:w-full dark:text-white cursor-pointer">
        <img
          className='size-12 md:size-8 lg:size-6'
          src={isDark ? "/assets/icons/dark_create.png" : "/assets/icons/create.png"}
          alt="Create post" />
        <h2
          className='hidden lg:block ml-3 font-medium text-sm capitalize'>Create post</h2>
      </div>
    </>
  )
}