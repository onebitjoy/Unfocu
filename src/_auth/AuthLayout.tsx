import { useUserContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router"

const AuthLayout = () => {

  const { isAuthenticated: isUserAuthenticated } = useUserContext()

  return (
    <>
      {isUserAuthenticated ?
        <Navigate to="/" /> :
        <section className="flex flex-col flex-1 items-center justify-start">

          {/* Outlet Box */}
          <div className="z-1000 flex flex-col justify-center items-center ">
            <div className="mt-16">
              <img src="/assets/Unfocu.png" alt="Unfocu Logo" className="w-20 h-20 sm:w-30 sm:h-30 md:w-40 md:h-40" />
            </div>
            <div className="z-1000">
              <Outlet />
            </div>
          </div>

        </section>}
    </>
  )
}

export default AuthLayout