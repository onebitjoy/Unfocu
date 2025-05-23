import { Outlet } from "react-router-dom"

import Topbar from "@/components/shared/Topbar"
import Sidebar from "@/components/shared/Sidebar"
import Bottombar from "@/components/shared/Bottombar"

import CreatePostDialogTray from "@/components/dialog/CreatePostDialogTray"

export const RootLayout = () => {
  return (
    <main className="flex flex-col w-full">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <section className="flex flex-1 h-full overflow-hidden">
          <CreatePostDialogTray />
          <Outlet />
        </section>
      </div>
      <Bottombar />
    </main>
  )
}
