import { Link, useNavigate } from "react-router"
import ProfileMenu from "./ProfileMenu"
import { useLogOutUserAccount } from "@/lib/react-query/queryMutation"
import { useEffect } from "react"
import { useUserContext } from "@/context/AuthContext"

const Topbar = () => {

  const navigate = useNavigate()
  const { mutate: logOut, isSuccess } = useLogOutUserAccount()
  const { user } = useUserContext()

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
      //  navigates to auth pages
    }
  }, [navigate, isSuccess])

  return (
    <section
      className="topbar w-full flex justify-center md:hidden py-6 border border-blue-400">

      <div
        className="flex w-full max-w-[1600px] justify-between items-center">
        {/* left */}
        <Link
          to={"/"}
          className="pl-2">
          <img src="/assets/PixagramIcon.png" alt="logo" width={64} height={64} />
        </Link>

        {/* right */}
        <div
          className="pr-2 flex items-center justify-center">
          {/* notifications icon */}
          <div
            className="pr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>

          {/* messages icon */}
          <div
            className="pr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>

          {/* profile dropdown menu */}
          <ProfileMenu
            logOut={logOut}
            user={user} />
        </div>

      </div>
    </section>
  )
}

export default Topbar