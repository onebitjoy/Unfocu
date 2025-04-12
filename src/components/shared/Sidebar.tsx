import { Link } from "react-router"
import SidebarElement from "./SidebarElement"
import { useUserContext } from "@/context/AuthContext"

const Sidebar = () => {
  const { user } = useUserContext()
  return (
    <nav
      className="hidden md:flex md:flex-col px-4 py-10 border-gray-300 border-r md:w-20 lg:w-72 h-dvh">
      <div
        className="flex flex-col gap-10 pb-8">
        <Link to={"/"} className="flex justify-center items-center">
          <img src="/assets/PixagramIcon.png" alt="homepage" className="lg:hidden" />
          <h1 className="hidden lg:block font-bold text-2xl">Pixagram</h1>
        </Link>
      </div>


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

      {/* Options */}
      <div className="flex flex-col items-center grow">
        <SidebarElement
          icon="/assets/icons/home.png"
          label="home" />
        <SidebarElement
          icon="/assets/icons/search.png"
          label="search" />
        <SidebarElement
          icon="/assets/icons/explore.png"
          label="explore" />
        <SidebarElement
          icon="/assets/icons/reels.png"
          label="reels" />
        <SidebarElement
          icon="/assets/icons/message.png"
          label="messages" />
        <SidebarElement
          icon="/assets/icons/notifications.png"
          label="notifications" />
        <SidebarElement
          icon="/assets/icons/create.png"
          label="create" />
        <SidebarElement icon="/assets/icons/menu.png" label="settings" />
      </div>
    </nav>
  )
}

export default Sidebar