import SidebarElement from './SidebarElement'

const SidebarOptions = () => {
  return (
    <div className="flex flex-col items-center grow">
      <SidebarElement
        icon="/assets/icons/home.png"
        label="home" />
      <SidebarElement
        icon="/assets/icons/search.png"
        label="search" />
      <SidebarElement
        icon="/assets/icons/explore.png"
        label="explore" />
      <SidebarElement
        icon="/assets/icons/reels.png"
        label="reels" />
      <SidebarElement
        icon="/assets/icons/message.png"
        label="messages" />
      <SidebarElement
        icon="/assets/icons/notifications.png"
        label="notifications" />
      <SidebarElement
        icon="/assets/icons/create.png"
        label="create" />
      <SidebarElement icon="/assets/icons/menu.png" label="settings" />
    </div>
  )
}

export default SidebarOptions