import { Link } from "react-router-dom"
import Profile from "./Profile"
import SidebarOptions from "./SidebarOptions"

const Sidebar = () => {

  return (
    <nav
      className="hidden md:flex md:flex-col dark:bg-black px-4 py-10 border-gray-300 dark:border-[#171819] border-r md:w-20 lg:w-72 h-dvh">
      {/* Icon and Label */}
      <div className="flex flex-col gap-10 pb-8">
        <Link to={"/"} className="flex justify-center items-center">
          <img src="/assets/PixagramIcon.png" alt="homepage" className="lg:hidden" />
          <h1 className="hidden lg:block font-bold dark:text-white text-2xl">Pixagram</h1>
        </Link>
      </div>
      <Profile />
      <SidebarOptions />
    </nav >
  )
}

export default Sidebar