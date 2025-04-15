// import { useThemeContext } from "@/context/ThemeContext";
import { useThemeContext } from "@/context/ThemeContext";
import { NavLink } from "react-router"

type SidebarElementProps = {
  imgURL: string;
  darkImgURL: string;
  route: string;
  label: string;
  isActive: boolean;
};

const SidebarElement = ({ imgURL, darkImgURL, label, route, isActive }: SidebarElementProps) => {
  // TODO: use page navigation data to boldify the current page and the element
  // DONE
  const { isDark } = useThemeContext()
  return (
    <NavLink
      to={route}
      className={`flex items-center self-center lg:gap-x-3 hover:bg-gray-200 lg:m-[8px] md:my-[12px] md:p-2 lg:p-[12px] ps-4 rounded lg:w-full cursor-pointer dark:text-white dark:hover:bg-neutral-950   ${isActive ? "dark:bg-[#191919] dark:text-white" : ""}`}>

      <img className='size-12 md:size-8 lg:size-6' src={!isDark ? imgURL : darkImgURL} alt={label} />
      <h2 className='hidden lg:block font-medium text-sm capitalize' >{label}</h2>
    </NavLink>
  )
}
export default SidebarElement