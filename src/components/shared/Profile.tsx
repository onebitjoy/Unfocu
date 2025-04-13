import { useUserContext } from "@/context/AuthContext"

const Profile = () => {

  const { user } = useUserContext()

  return (
    <div>
      {/* profile div */}
      <div className="hidden lg:flex flex-col bg-gray-100 mb-10 px-4 py-2 border border-gray-200 rounded-sm">
        <div className="flex justify-center gap-x-2 mb-6">
          {/* TODO: Check for status */}
          <div className="border circle gradient">
            <img
              src={user.imageUrl}
              alt={user.name}
              width={48}
              height={48}
              className="bg-white border-transparent circle" />
          </div>
          <div>
            <h2 className="font-medium">{user.name}</h2>
            <h3 className="text-gray-600 text-sm">@{user.username}</h3>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col text-center">
            <div className="font-medium text-sm">1k</div>
            <div className="text-gray-400 text-xs">Followers</div>
          </div>
          <div className="flex flex-col text-center">
            <div className="font-medium text-sm">340</div>
            <div className="text-gray-400 text-xs">Following</div>
          </div>
          <div className="flex flex-col text-center">
            <div className="font-medium text-sm">90</div>
            <div className="text-gray-400 text-xs">Post</div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile