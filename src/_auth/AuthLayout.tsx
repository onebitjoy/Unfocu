import { useUserContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {

  const { isAuthenticated: isUserAuthenticated } = useUserContext()

  return (
    <>
      {isUserAuthenticated ?
        <Navigate to="/" /> :
        <section className="flex flex-col flex-1 justify-start items-center dark:bg-black pt-4">
          {/* Outlet Box */}
          <div className="pt-8">
            <div className="flex justify-center items-center gap-x-2 pt-4 pb-8">
              <img src="/assets/PixagramIcon.png" alt="homepage" className="size-8" />
              <div className="font-bold text-black dark:text-white text-2xl">Pixagram</div>
            </div>

            <div className="">
              <Outlet />
            </div>
          </div>

        </section>}
    </>
  )
}

export default AuthLayout