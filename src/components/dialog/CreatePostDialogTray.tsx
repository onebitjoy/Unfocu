import { useEffect, useRef } from "react"
import { useIsDialogOpen, useResetScreen, useSetDialogOpen } from "@/store/dialogStore"
import CreatePostForm from "./CreatePostForm"
import { resetNewPost } from "@/store/postStore"

export default function CreatePostDialogTray() {
  const isDialogOpen = useIsDialogOpen()
  const setDialogOpen = useSetDialogOpen()
  const resetPost = resetNewPost()
  const resetScreen = useResetScreen()

  const dialogRef = useRef<HTMLDialogElement | null>(null)
  function handleClear() {
    resetPost()
    resetScreen()
  }

  useEffect(() => {
    // this useEffect section is used to show modal whenever there is a change in isDialogOpen variable from the zustand store
    const dialog = dialogRef.current
    if (!dialog) return;
    if (isDialogOpen && !dialog.open) {
      dialog.showModal()
    }
    if (!isDialogOpen && dialog.open) {
      dialog.close()
      handleClear()
    }
  }, [isDialogOpen])

  useEffect(() => {
    // the dialog by default hover over entire webpage
    function handleClickOutsideDialog(e: MouseEvent) {
      const dialog = dialogRef.current
      if (!dialog || !dialog.open) return;

      // since the dialog box encapsulates the entire screen, 
      if (dialog === e.target) {
        const removePost = confirm("Want to undo all changes?")
        if (removePost) {
          setDialogOpen(!removePost)
          handleClear()
        }
      }
    }

    // attaching an eventlistener to the modal when its visible
    const dialog = dialogRef.current
    dialog?.addEventListener("click", handleClickOutsideDialog)

    // cleaning function to prevent memory leak
    return () => {
      dialog?.removeEventListener("click", handleClickOutsideDialog)
    }
  }, [setDialogOpen])

  return (
    <dialog
      ref={dialogRef}
      className="bg-white dark:bg-[#191919] shadow-lg mx-auto my-auto border border-y-neutral-800 rounded-xl dark:text-white"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-between items-center bg-black px-2 py-2 border-b border-b-neutral-400">
          <h2 className="ml-2 font-semibold text-white dark:text-white text-xl">Create Post</h2>
          <button onClick={() => setDialogOpen(false)} className="mr-2 font-bold text-white">&#x2715;</button>
        </div>

        <div>
          <CreatePostForm />
        </div>
      </div>
    </dialog>
  )
}