import {
  updatePostLocation, updatePostTags, updatePostCaption, newPostStore,
  getPostContent
} from '@/store/postStore'

import { useUserContext } from '@/context/AuthContext'
import { JSX } from 'react'
import { useDialogStore } from '@/store/dialogStore'
import { useCreatePost } from '@/lib/react-query/queryMutation'

function CaptionsTray({ children }: { children: JSX.Element }) {

  const { user } = useUserContext()
  const caption = newPostStore(state => state.caption)
  const location = newPostStore(state => state.location)
  const tags = newPostStore(state => state.tags)
  const { mutateAsync: createPost, isPending: isPostCreating } = useCreatePost()

  async function handlePostSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    //TODO: to be used inside post submission
    const { caption, location, tags, file } = getPostContent()
    await createPost({ caption, location, tags, file, userId: user.id })
    useDialogStore.getState().action.setDialogOpen(false)
  }

  return <div className="flex lg:flex-row flex-col justify-center items-stretch w-full max-w-[1200px] max-h-[800px] scroll-auto">
    {/* Carousel */}
    <div className='flex flex-col w-full h-full'>
      {children}
    </div>


    <div className='flex flex-col mx-4 my-4 min-w-80'>
      <div className='flex items-center mb-4'>
        <img src={user.imageUrl} className='mr-2 rounded-full w-8 h-8' />
        <h3 className='flex items-center h-full font-semibold text-neutral-200'>
          <span className='mr-[1px] font-semibold text-neutral-400'>@</span>
          {user.username}
        </h3>
      </div>

      <form className='flex flex-col w-full h-full' onSubmit={(e) => handlePostSubmit(e)}>
        <div className='flex mb-4 w-full'>
          <textarea className='p-2 border-none rounded outline-none focus-visible:ring-1 focus-visible:ring-neutral-300/30 w-full h-40 placeholder:text-sm'
            maxLength={2002}
            value={caption}
            placeholder='Add caption'
            onChange={(e) => updatePostCaption(e.target.value)}
          />
        </div>

        <div className='mb-4 w-full'>
          <label className='flex items-center'>
            <input
              className='mr-2 p-2 border-none rounded outline-none focus-visible:ring-1 focus-visible:ring-neutral-300/30 w-full placeholder:text-sm transition-all duration-500 ease-in-out'
              placeholder='Add location'
              value={location}
              onChange={(e) => updatePostLocation(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </label>
        </div>

        <div className='mb-4 w-full'>
          <label className='flex items-center'>
            <input
              className='mr-2 p-2 border-none rounded outline-none focus-visible:ring-1 focus-visible:ring-neutral-300/30 w-full placeholder:text-sm transition-all duration-500 ease-in-out'
              placeholder='Add tags'
              value={tags}
              onChange={(e) => updatePostTags(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
            </svg>
          </label>
        </div>

        <button className='bg-white ml-auto px-4 py-1 rounded-lg ring-blue-400/60 font-semibold text-black tracking-wide' type="submit">Share</button>
      </form>
    </div>
  </div>
}

export default CaptionsTray
