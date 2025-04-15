import { useLocation } from 'react-router'
import SidebarElement from './SidebarElement'
import { sidebarRoutes } from '@/constants'
import SettingsMenu from './SettingsMenu'

const SidebarOptions = () => {
  const { pathname } = useLocation()
  return (<div className="flex flex-col items-center grow">
    {
      sidebarRoutes.map((e) => {
        return (<SidebarElement darkImgURL={e.darkImgURL} key={e.route} route={e.route} label={e.label} imgURL={e.imgURL} isActive={pathname === e.route} />)
      })
    }
    <div className="flex items-center self-center hover:bg-gray-200 dark:hover:bg-neutral-950 mt-auto md:p-2 lg:p-[12px] rounded w-full cursor-pointer">
      <SettingsMenu />
    </div>
  </div>
  )
}

export default SidebarOptions