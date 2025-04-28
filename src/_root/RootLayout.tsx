
import CreatePostDialogTray from "@/components/dialog/CreatePostDialogTray"
import Bottombar from "@/components/shared/Bottombar"
import Sidebar from "@/components/shared/Sidebar"
import Topbar from "@/components/shared/Topbar"
import { PostContextProvider } from "@/context/PostContext"
import { Outlet } from "react-router-dom"

export const RootLayout = () => {
  return (
    <main className="flex flex-col w-full">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <section className="flex flex-1 h-full">
          <PostContextProvider>
            <CreatePostDialogTray />
          </PostContextProvider>
          <Outlet />
        </section>
      </div>
      <Bottombar />
    </main>
  )
}
