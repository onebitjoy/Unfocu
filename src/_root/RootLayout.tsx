import Bottombar from "@/components/shared/Bottombar"
import Sidebar from "@/components/shared/Sidebar"
import Topbar from "@/components/shared/Topbar"
import { Outlet } from "react-router"

export const RootLayout = () => {

  return (
    <main className="w-full  flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
      </div>
      <Bottombar />
    </main>
  )
}
