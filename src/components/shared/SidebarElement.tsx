import { useThemeContext } from "@/context";
import { Link } from "react-router-dom";

type SidebarElementProps = {
  imgURL: string;
  darkImgURL: string;
  route: string;
  label: string;
  isActive: boolean;
};

function SidebarElement({ imgURL, darkImgURL, label, route, isActive }: SidebarElementProps) {

  const { isDark } = useThemeContext()
  return (
    <Link
      to={route}
      className={`flex items-center hover:bg-gray-200 lg:ps-4 rounded lg:w-full cursor-pointer dark:text-white dark:hover:bg-neutral-800 px-2 mb-2 py-3   ${isActive ? "dark:bg-[#191919] dark:text-white" : ""}`}>
      <img className='size-12 md:size-8 lg:size-6' src={!isDark ? imgURL : darkImgURL} alt={label} />
      <h2 className='hidden lg:block ml-4 font-medium text-sm capitalize' >{label}</h2>
    </Link>
  )
}
export default SidebarElement