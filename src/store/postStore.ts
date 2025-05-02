import { PostFormValidation } from "@/lib/validation";
import { z } from "zod";
import { create } from "zustand"
import { devtools } from 'zustand/middleware'

// TYPES: Post Data and Action
type PostData = z.infer<typeof PostFormValidation>;
type PostAction = {
  updateField: <K extends keyof PostData>(
    key: K,
    value: PostData[K]
  ) => void;
  resetPost: () => void
}

//Initial Post State
const initialPostState: PostData = {
  caption: "",
  file: [],
  location: "",
  tags: "",
}

// Zustand Post Store
export const newPostStore = create<PostData & PostAction>()(
  devtools(
    (set) => ({
      ...initialPostState,
      resetPost: () => set((state) => ({ ...state, ...initialPostState })),
      updateField: <K extends keyof PostData>(key: K, value: PostData[K]) => set((state) => ({
        ...state, [key]: value,
      }))
    })
  )
)

function getPostContent() {
  //TODO: to be used inside post submission
  return {
    caption: newPostStore.getState().caption,
    file: newPostStore.getState().file,
    location: newPostStore.getState().location,
    tags: newPostStore.getState().tags,

  }
}

// reset post 
function resetNewPost() {
  return newPostStore(state => state.resetPost)
}

// ===== Custom update function for each field =====
// generic function to take keys and values
function updatePostField<K extends keyof PostData>(key: K, value: PostData[K]) {
  const store = newPostStore.getState()
  // only updates when there is a change in the 
  // field(remove unnecessary rendering of non-focused componenets)
  if (store[key] !== value) {
    store.updateField(key, value);
  }
}

// // function that uses the generic update function
// 1. caption
function updatePostCaption(value: string) {
  updatePostField("caption", value)
}

// 2. file
function updatePostFile(value: File[]) {
  updatePostField("file", value)
}

// 3. location
function updatePostLocation(value: string) {
  updatePostField("location", value)
}

// 4. tags
function updatePostTags(value: string) {
  updatePostField("tags", value)
}

export {
  getPostContent,

  resetNewPost,

  updatePostCaption,
  updatePostFile,
  updatePostLocation,
  updatePostTags,
}