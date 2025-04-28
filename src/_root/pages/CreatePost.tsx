import PostForm from "@/components/forms/PostForm"
import { useThemeContext } from "@/context"

const CreatePost = () => {
  const { isDark } = useThemeContext()
  const iconSource = isDark ? "/assets/icons/dark_create.png" : "/assets/icons/create.png"
  return (
    <div className="flex flex-col py-4 lr:py-10 sm:py-4 md:py-8 ps-2 lr:ps-10 sm:ps-4 md:ps-8 border w-full dark:text-white">
      {/* Create Post Header */}
      <div className="flex items-center gap-x-2 pb-8">
        <img src={iconSource} alt="Create" width={36} height={36} />
        <h2 className="font-bold text-xl">Create Post</h2>
      </div>

      {/* Create Post Content */}
      <div className="w-100">
        <PostForm />
      </div>
    </div>
  )
}

export default CreatePost