import { useThemeContext } from "@/context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import DarkModeSwitcher from "./DarkModeSwitcher"
import { useLogOutUserAccount } from "@/lib/react-query/queryMutation"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const SettingsMenu = () => {
  const { isDark } = useThemeContext()
  const { mutate: logOut, isSuccess } = useLogOutUserAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess, navigate])

  const menuIcon = isDark ? "/assets/icons/dark_menu.png" : "/assets/icons/menu.png"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="flex items-center">
          <img className='pe-2 size-12 md:size-8 lg:size-6' src={menuIcon} alt="settings" />
          <div className="hidden lg:block font-medium dark:text-white text-sm capitalize">Settings</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={isDark ? "w-64 font-medium bg-black text-white border-neutral-800 cursor-pointer" : "w-64 font-medium cursor-pointer"}>
        <DropdownMenuLabel className="font-semibold text-center">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-neutral-800" />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator className="bg-neutral-800" />

        <DropdownMenuItem>
          {<DarkModeSwitcher />}
          <DropdownMenuSeparator />
        </DropdownMenuItem>

        {/* log out button */}
        <DropdownMenuItem className="w-full">
          <button onClick={() => logOut()}
            className="w-full text-red-500 text-start">
            Log out
          </button>
        </DropdownMenuItem>

      </DropdownMenuContent >
    </DropdownMenu >
  )
}

export default SettingsMenu