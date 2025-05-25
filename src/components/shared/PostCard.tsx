import { useWriteCommentToPost } from '@/lib/react-query/queryMutation'
import { postTimePassageCalc } from '@/utils/postTimePassageCalc'
import { Models } from 'appwrite'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function PostCard({ post }: { post: Models.Document }) {
  // TODO : remove
  console.log(post)

  const [isCollapsed, setIsCollapsed] = useState(true)
  const { mutateAsync: createComment } = useWriteCommentToPost()

  // TIME : to calculate the time passed since post has been created
  const TimeDiff = postTimePassageCalc(post?.$createdAt)

  // POST : Comment
  async function handleCommentInput(e: React.KeyboardEvent<HTMLInputElement>) {
    const comment = e.currentTarget?.value.trim()
    if (!comment) { return }
    if (comment?.length > 2002) {
      toast.info("Comment can't be longer than 2002 characters!")
      return
    }
    if (e.key === "Enter") {
      try {
        await createComment({
          content: comment,
          postId: post.$id,
          userId: post.creator.$id
        })
      } catch {
        toast.error("Can't comment")
      } finally {
        e.currentTarget.value = ""
      }
    }
  }


  return <div className='w-full'>

    {/* Poster Detail container */}
    <div className='flex items-center px-2 py-2 h-10'>
      <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-x-2'>
        <img src={post.creator.imageUrl} alt={post.creator.name} width="24px" height="24px" className='rounded-full' />
        <p className='font-bold text-xs tracking-wide'>{post.creator.username}</p>
      </Link>
      <div className='flex items-center ml-1 h-full text-neutral-500 text-xs'>
        <div className='bg-neutral-500 mr-1 rounded-full w-[5px] h-[5px]'></div>
        {TimeDiff}
      </div>
      <div className='ml-auto h-full'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
        </svg>
      </div>
    </div>

    {/* Image carousal  */}
    <div className='w-full'>
      <img src={post.imageUrl[0]} alt="" className='border border-neutral-400/20' />
    </div>

    {/* caption  */}
    <div className='flex flex-col py-2'>

      {/* interaction block */}
      <div className='flex justify-between items-center p-2'>
        <div className='flex gap-x-2 *:hover:cursor-pointer'>
          <button>
            {/* LIKE */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>

          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
          </button>

          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>

          </button>
        </div>

        <button className='hover:cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
        </button>
      </div>

      {/* like count */}
      <h4 className='px-2 font-bold text-xs'>{
        post?.likes.length === 0 ?
          ("0 likes") :
          (post?.likes.length === 1 ?
            "1 like" :
            `${post?.likes.length} likes`
          )
      }</h4>

      {/* TODO - implement see more/see less functionality */}
      {/* caption */}
      <p className='mt-2 px-2 text-sm text-balance tracking-wide'>
        <span className={isCollapsed && (post?.caption.length > 250) ? `line-clamp-2` : ""}>
          <Link to={`/profile/${post?.creator.$id}`} className='mr-2 font-bold'>{post?.creator.username}</Link>
          {post?.caption}
        </span>
        {post?.caption.length > 250 && <button
          className='inline text-neutral-500 text-sm'
          onClick={() => setIsCollapsed(c => !c)}>{isCollapsed ? "more" : "show less"}</button>}
      </p>

      {/* comments */}
      <p className='p-2 text-neutral-400 text-sm'>
        {post?.comments.length > 0 ? `View all ${post?.comments.length} comments` : "No comments yet"}
      </p>

      {/* comment text box */}
      <input type="text" className='mx-2 outline-none' placeholder='write a comment' onKeyDown={handleCommentInput} />

    </div>
  </div >
}
